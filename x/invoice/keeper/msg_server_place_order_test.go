package keeper_test

import (
	"testing"

	"github.com/tendermint/tendermint/crypto/ed25519"
	"gitlab.com/joltify/joltifychain/x/invoice/keeper"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"gitlab.com/joltify/joltifychain/x/invoice/types"
)

func TestPlaceOrderMsgServerCreate(t *testing.T) {
	setupBech32Prefix()
	sk := ed25519.GenPrivKey()
	creator, err := sdk.AccAddressFromHex(sk.PubKey().Address().String())
	assert.Nil(t, err)

	sk = ed25519.GenPrivKey()
	buyer, err := sdk.AccAddressFromHex(sk.PubKey().Address().String())
	assert.Nil(t, err)

	invoiceName := "two invoice test"
	rootInvoice, ctx, k := NewRootInvoice(t, creator, invoiceName)
	srv := keeper.NewMsgServerImpl(*k)
	wctx := sdk.WrapSDKContext(ctx)
	expected := &types.MsgCreateSellOrder{Creator: creator, SellInvoiceID: rootInvoice.InvoiceID, Amount: sdk.NewInt(20), Price: sdk.NewInt(20)}
	createdSellOrder, err := srv.CreateSellOrder(wctx, expected)
	require.NoError(t, err)
	sellOrder, ok := k.GetSellOrder(ctx, createdSellOrder.OrderID)
	require.True(t, ok)
	require.Nil(t, err)

	placeOrder := &types.MsgCreatePlaceOrder{
		Creator:     buyer,
		SellOrderID: sellOrder.GetSellOrderID(),
		Amount:      sdk.NewInt(5),
	}

	placeOrderResp, err := srv.CreatePlaceOrder(wctx, placeOrder)
	require.Nil(t, err)
	placedOrder, ok := k.GetPlaceOrder(ctx, placeOrderResp.PlaceOrderID)
	assert.True(t, ok)
	sellOrder, ok = k.GetSellOrder(ctx, createdSellOrder.OrderID)
	require.True(t, ok)
	require.True(t, sellOrder.LeftAmount.Equal(sdk.NewInt(15)))
	require.Equal(t, types.Success, placedOrder.OrderStatus)
}
