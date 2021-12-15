package keeper

import (
	"context"
	"encoding/hex"
	"errors"
	"fmt"
	"strconv"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"gitlab.com/joltify/joltifychain/x/invoice/tools"
	"gitlab.com/joltify/joltifychain/x/invoice/types"
)

func (k msgServer) createInvoiceBase(invoiceCrater, invoiceOwner sdk.AccAddress, name, url, denom string, amount sdk.Int, apyStr string) (types.InvoiceBase, types.InvoiceFinance, error) {
	base := types.InvoiceBase{
		Creator:   invoiceCrater,
		Name:      name,
		Url:       url,
		Data:      "PRESERVED",
		OrigOwner: invoiceOwner,
	}
	apy, err := strconv.ParseFloat(apyStr, 32)
	if err != nil {
		return types.InvoiceBase{}, types.InvoiceFinance{}, err
	}

	if apy < 0 {
		return types.InvoiceBase{}, types.InvoiceFinance{}, errors.New("apy should not small than 0")
	}

	finance := types.InvoiceFinance{
		Denom:        denom,
		Amount:       amount,
		AmountLocked: sdk.NewInt(0),
		Apy:          float32(apy),
	}
	return base, finance, nil
}

func (k msgServer) doCreateInvoice(ctx sdk.Context, creator, origOwner sdk.AccAddress, name string, amount sdk.Int, url, apy string, isRootOwner bool) (*types.MsgCreateInvoiceResponse, error) {
	invoiceIDByte, err := tools.GenHash([]string{creator.String(), origOwner.String(), name})
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("fail to hash the invoice data %v", err))
	}
	invoiceID := hex.EncodeToString(invoiceIDByte)
	nameHash, err := tools.GenHash([]string{name})
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid input for hash")
	}
	denom := fmt.Sprintf("PAY%s/%s", hex.EncodeToString(nameHash)[:8], invoiceID[:16])
	// maximum demon size is 128
	if len(denom) > 128 {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "denom size to large")
	}

	_, isFound := k.GetInvoice(ctx, invoiceID)
	if isFound {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("index %v already set", invoiceID))
	}

	err = k.issueTokens(ctx, denom, amount, creator)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "cannot mint the token")
	}

	invoiceBase, invoiceFinance, err := k.createInvoiceBase(creator, origOwner, name, url, denom, amount, apy)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("fail to construct the invoice basic"))
	}
	currentMember := types.InvoiceMember{
		InvoiceID:     invoiceID,
		Share:         amount,
		InvoiceHolder: origOwner,
	}
	invoice := types.Invoice{
		InvoiceID:       invoiceID,
		InvoiceBase:     &invoiceBase,
		InvoiceFinance:  &invoiceFinance,
		InvoiceMembers:  []types.InvoiceMember{currentMember},
		RootOwner:       isRootOwner,
		Deleted:         false,
		CurrentOwner:    origOwner,
		IsListedForSell: false,
	}
	k.SetInvoice(
		ctx,
		invoice,
	)
	return &types.MsgCreateInvoiceResponse{InvoiceID: invoiceID}, nil
}

func (k msgServer) CreateInvoice(goCtx context.Context, msg *types.MsgCreateInvoice) (*types.MsgCreateInvoiceResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return nil, err
	}
	owner, err := sdk.AccAddressFromBech32(msg.OrigOwner)
	if err != nil {
		return nil, err
	}

	amountDec, err := sdk.NewDecFromStr(msg.Amount)
	if err != nil {
		return nil, err
	}
	return k.doCreateInvoice(ctx, creator, owner, msg.Name, amountDec.RoundInt(), msg.Url, msg.Apy, msg.IsRootOwner)
}

func (k msgServer) DeleteInvoice(goCtx context.Context, msg *types.MsgDeleteInvoice) (*types.MsgDeleteInvoiceResponse, error) {
	// fixme in furture we only allow the creater to delte if
	// the invoice is all paied amount=0.
	// the invoice has no members except itself.
	ctx := sdk.UnwrapSDKContext(goCtx)

	invoiceIDByte, err := tools.GenHash([]string{msg.Creator.String(), msg.OrigOwner.String(), msg.Name})
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("fail to hash the invoice data %v", err))
	}

	invoiceID := hex.EncodeToString(invoiceIDByte)

	// Check if the value exists
	invFound, isFound := k.GetInvoice(ctx, invoiceID)
	if !isFound {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("the given invoice can not be found with ID:%v", invoiceID))
	}

	// Checks if the the msg sender is the same as the curre2t owner
	if !msg.Creator.Equals(invFound.InvoiceBase.Creator) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}
	// burn the tokens

	err = k.burnTokens(ctx, invFound.GetInvoiceFinance().Denom, invFound.GetInvoiceFinance().Amount, msg.Creator)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidCoins, fmt.Sprintf("fail to  burn the coins with error %v", err))
	}

	invFound.GetInvoiceFinance().Amount = sdk.NewInt(0)
	invFound.Deleted = true
	k.SetInvoice(ctx, invFound)

	return &types.MsgDeleteInvoiceResponse{}, nil
}
