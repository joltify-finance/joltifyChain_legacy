package keeper

import (
	"context"
	"encoding/hex"
	"fmt"
	"math/big"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"gitlab.com/joltify/joltifychain/joltifychain/x/invoice/tools"
	"gitlab.com/joltify/joltifychain/joltifychain/x/invoice/types"
)

func (k msgServer) CreateSellOrder(goCtx context.Context, msg *types.MsgCreateSellOrder) (*types.MsgCreateSellOrderResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if msg.Amount.IsNegative() || msg.Price.IsNegative() {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "the amount or the price is negative")
	}

	invoiceToSell, ok := k.GetInvoice(ctx, msg.SellInvoiceID)
	if !ok {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, "invalid invoice ID")
	}
	// we need to check
	// 1. the seller is the invoice current holder
	if !invoiceToSell.CurrentOwner.Equals(msg.Creator) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "the seller is not the current owner")
	}
	// 2. it has enough balance to create this sell
	allSell := msg.Amount.Add(invoiceToSell.InvoiceFinance.AmountLocked)
	if invoiceToSell.InvoiceFinance.Amount.LT(allSell) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "not enough balance to create sell order")
	}
	defer func() {
		invoiceToSell.InvoiceFinance.AmountLocked = invoiceToSell.InvoiceFinance.AmountLocked.Add(msg.Amount)
		k.SetInvoice(ctx, invoiceToSell)
	}()

	createTime := time.Now().UTC()
	randBytes, err := tools.GenRandomBytes(128)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("error to get random bytes %v", err))
	}
	sellID, err := tools.GenHash([]string{invoiceToSell.InvoiceID, hex.EncodeToString(randBytes)})
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "fail to convert the hash of the invoiceID wit time")
	}
	sellIDHex := hex.EncodeToString(sellID)
	// Check if the value already exists
	_, isFound := k.GetSellOrder(ctx, sellIDHex)
	if isFound {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("index %v already set", sellID))
	}

	priceRatio := new(big.Float).SetPrec(32)
	priceRatio = priceRatio.Quo(new(big.Float).SetInt(msg.Price.BigInt()), new(big.Float).SetInt(msg.Amount.BigInt()))
	sellOrder := types.SellOrder{
		SellOrderID:  sellIDHex,
		Creator:      msg.Creator,
		InvoiceID:    invoiceToSell.InvoiceID,
		Amount:       msg.Amount,
		LeftAmount:   msg.Amount,
		Price:        msg.Price,
		PriceRatio:   priceRatio.String(),
		SellDuration: msg.SellDuration,
		CreatedTime:  createTime,
	}

	k.SetSellOrder(
		ctx,
		sellOrder,
	)
	k.SetAddedSellOrder(ctx, sellOrder)
	return &types.MsgCreateSellOrderResponse{OrderID: sellIDHex}, nil
}

func (k msgServer) DeleteSellOrder(goCtx context.Context, msg *types.MsgDeleteSellOrder) (*types.MsgDeleteSellOrderResponse, error) {
	// fixme need to have all the order transfered
	// fixme we need to allow
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Check if the value exists
	sellOrder, isFound := k.GetSellOrder(ctx, msg.SellOrderID)
	if !isFound {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf(" sell orderID %v not set", msg.GetSellOrderID()))
	}

	// Checks if the the msg sender is the same as the current owner
	if !msg.Creator.Equals(sellOrder.Creator) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	// if we withdraw the sell order, we need to unlock the locked money
	invoiceToSell, ok := k.GetInvoice(ctx, sellOrder.InvoiceID)
	if !ok {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, "invalid invoice ID")
	}

	invoiceToSell.InvoiceFinance.AmountLocked = invoiceToSell.InvoiceFinance.AmountLocked.Sub(sellOrder.LeftAmount)
	k.SetInvoice(ctx, invoiceToSell)
	sellOrder.IsDeleted = true
	k.SetSellOrder(ctx, sellOrder)
	k.RemoveAddedSellOrder(ctx, sellOrder.SellOrderID)
	return &types.MsgDeleteSellOrderResponse{}, nil
}
