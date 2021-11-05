package keeper

import (
	"encoding/hex"
	"errors"
	"fmt"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"gitlab.com/joltify/joltifychain/joltifychain/x/invoice/tools"
	"gitlab.com/joltify/joltifychain/joltifychain/x/invoice/types"
)

func createChildInvoice(newOwner sdk.AccAddress, share sdk.Int, invoice *types.Invoice) (types.Invoice, error) {
	randomB, err := tools.GenRandomBytes(128)
	if err != nil {
		return types.Invoice{}, nil
	}
	invoiceID, err := tools.GenHash([]string{invoice.InvoiceID, newOwner.String(), hex.EncodeToString(randomB)})
	if err != nil {
		return types.Invoice{}, err
	}
	hexInvID := hex.EncodeToString(invoiceID)
	myInvoice := types.Invoice{
		InvoiceID:       hexInvID,
		InvoiceBase:     invoice.GetInvoiceBase(),
		RootOwner:       false,
		Deleted:         false,
		CurrentOwner:    newOwner,
		InvoiceMembers:  []types.InvoiceMember{{InvoiceID: hexInvID, Share: share, InvoiceHolder: newOwner}},
		IsListedForSell: false,
	}
	if invoice.InvoiceFinance.AmountLocked.LT(share) {
		return types.Invoice{}, errors.New("not enough balance to create the sub-invoice")
	}
	invoice.InvoiceFinance.Amount = invoice.InvoiceFinance.Amount.Sub(share)
	invoice.InvoiceFinance.AmountLocked = invoice.InvoiceFinance.AmountLocked.Sub(share)

	// now we update the parent invoice share
	invoice.InvoiceMembers[0].Share = invoice.InvoiceFinance.Amount
	invoice.InvoiceMembers = append(invoice.InvoiceMembers, myInvoice.InvoiceMembers[0])

	// the owner may set the apy later, so for creation, we set it as the parent invoice
	parentDemo := invoice.InvoiceFinance.Denom
	myDemo := fmt.Sprintf("%s/%s", parentDemo, myInvoice.InvoiceID[:16])
	myFinance := types.InvoiceFinance{Denom: myDemo, Amount: share, Apy: invoice.InvoiceFinance.Apy}
	myInvoice.InvoiceFinance = &myFinance
	return myInvoice, nil
}

func (k Keeper) TransferInvoice(ctx sdk.Context, claimedOwner sdk.AccAddress, sharesAllocation map[string]sdk.Int, parentInvoice *types.Invoice) error {
	// invoice can "sell" their invoice to others
	// we need to 1. verify
	invoiceOwner := parentInvoice.GetCurrentOwner()
	if !claimedOwner.Equals(invoiceOwner) {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, fmt.Sprintf("not the invoice holder %s", claimedOwner))
	}
	// we run the sanity check to ensure the total amount>= sum of  shares
	var allNewInvoices []types.Invoice
	totalShares := sdk.NewInt(0)
	for newOwner, share := range sharesAllocation {
		newOwnerAcc, err := sdk.AccAddressFromBech32(newOwner)
		if err != nil {
			return err
		}
		myInvoice, err := createChildInvoice(newOwnerAcc, share, parentInvoice)
		if err != nil {
			return err
		}
		allNewInvoices = append(allNewInvoices, myInvoice)
		totalShares = totalShares.Add(share)
	}
	// now we mint new tokens for the child invoice and burn the extra tokens for the parent invoice
	for _, childInvoice := range allNewInvoices {
		err := k.issueTokens(ctx, childInvoice.InvoiceFinance.Denom, childInvoice.InvoiceFinance.Amount, childInvoice.CurrentOwner)
		if err != nil {
			return sdkerrors.Wrap(sdkerrors.ErrInvalidCoins, fmt.Sprintf("cannot mint token for new invoice"))
		}
		k.SetInvoice(ctx, childInvoice)
	}
	// now we burn the amount that deducted from the original owner
	err := k.burnTokens(ctx, parentInvoice.InvoiceFinance.Denom, totalShares, parentInvoice.CurrentOwner)
	if err != nil {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidCoins, fmt.Sprintf("cannot burn token for parent invoice"))
	}
	//now the locked coin is deducted from the parent invoice
	k.SetInvoice(ctx, *parentInvoice)
	return nil
}

func (k Keeper) FulfillTheOrder(ctx sdk.Context, sender sdk.AccAddress, costPaid, amount sdk.Int, sellOrder *types.SellOrder) error {
	coin := sdk.NewCoin(types.STABLECOIN, costPaid)
	err := k.bankKeeper.SendCoins(ctx, sender, sellOrder.Creator, sdk.NewCoins(coin))
	if err != nil {
		return err
	}

	parentInvoice, ok := k.GetInvoice(ctx, sellOrder.InvoiceID)
	if !ok {
		return sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, "fail to get the parent invoice")
	}

	sharesAllocation := make(map[string]sdk.Int)
	sharesAllocation[sender.String()] = amount
	err = k.TransferInvoice(ctx, sellOrder.Creator, sharesAllocation, &parentInvoice)
	if err != nil {
		if err != nil {
			return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("error in transfer the invoice %v", err))
		}
	}
	sellOrder.LeftAmount = sellOrder.LeftAmount.Sub(amount)
	k.SetSellOrder(ctx, *sellOrder)
	return nil
}
