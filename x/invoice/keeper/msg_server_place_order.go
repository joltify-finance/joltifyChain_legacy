package keeper

import (
	"context"
	"encoding/hex"
	"fmt"
	"gitlab.com/joltify/joltifychain/joltifychain/x/invoice/tools"
	"math/big"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"gitlab.com/joltify/joltifychain/joltifychain/x/invoice/types"
)

func (k msgServer) CreatePlaceOrder(goCtx context.Context, msg *types.MsgCreatePlaceOrder) (*types.MsgCreatePlaceOrderResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	// Check if the value already exists

	sellOrder, ok := k.GetSellOrder(ctx, msg.SellOrderID)
	if !ok {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("the requested sellID %s not found", msg.SellOrderID))
	}

	if sellOrder.IsDeleted {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "the order has already been deleted")
	}
	priceRatio, ok := new(big.Float).SetString(sellOrder.PriceRatio)
	if !ok {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid price ratio from sell order")
	}
	totalNeeded := new(big.Float).Mul(priceRatio, new(big.Float).SetInt(msg.Amount.BigInt()))

	iTotalNeeded := big.NewInt(0)
	totalNeeded.Int(iTotalNeeded)
	sdkTotalNeeded := sdk.NewIntFromBigInt(iTotalNeeded)
	// check whether you have enough balance to purchase the invoice
	balance := k.bankKeeper.GetBalance(ctx, msg.Creator, types.STABLECOIN)
	if balance.Amount.LT(sdkTotalNeeded) || sellOrder.LeftAmount.LT(msg.Amount) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "insufficent fund or left amount)")
	}

	err := k.FulfillTheOrder(ctx, msg.Creator, sdkTotalNeeded, msg.Amount, &sellOrder)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("fail to lock the coin with %v", err))
	}

	b, err := tools.GenRandomBytes(128)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "fail to get the random bytes")
	}

	placeOrderID, err := tools.GenHash([]string{msg.SellOrderID, hex.EncodeToString(b)})
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "fail to get the random bytes")
	}
	placeOrderIDHex := hex.EncodeToString(placeOrderID)
	_, found := k.Keeper.GetPlaceOrder(ctx, placeOrderIDHex)
	if found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "fail to get the random bytes")
	}

	placeOrder := types.PlaceOrder{
		PlaceOrderIndex: placeOrderIDHex,
		Creator:         msg.Creator,
		SellOrderID:     msg.SellOrderID,
		Amount:          msg.Amount,
		OrderStatus:     types.Success,
	}

	k.SetPlaceOrder(
		ctx,
		placeOrder,
	)
	return &types.MsgCreatePlaceOrderResponse{
		PlaceOrderID: placeOrderIDHex,
	}, nil
}
