package keeper

import (
	"github.com/tendermint/tendermint/crypto/ed25519"
	"testing"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/joltify/joltifyChain/x/invoice/types"
)

func TestSellOrderMsgServerCreate(t *testing.T) {
	setupBech32Prefix()

	sk := ed25519.GenPrivKey()
	creator, err := sdk.AccAddressFromHex(sk.PubKey().Address().String())
	assert.Nil(t, err)

	invoiceName := "two invoice test"
	rootInvoice, ctx, keeper := newRootInvoice(t, creator, invoiceName)
	srv := NewMsgServerImpl(*keeper)
	wctx := sdk.WrapSDKContext(ctx)
	expected := &types.MsgCreateSellOrder{Creator: creator, SellInvoiceID: rootInvoice.InvoiceID, Amount: sdk.NewInt(20), Price: sdk.NewInt(0)}
	_, err = srv.CreateSellOrder(wctx, expected)
	require.NoError(t, err)
	sellOrders := keeper.GetAllSellOrder(ctx)
	require.Len(t, sellOrders, 1)
	assert.Equal(t, expected.Creator, sellOrders[0].Creator)
}

func TestSellOrderMsgServerCreateFail(t *testing.T) {
	setupBech32Prefix()

	sk := ed25519.GenPrivKey()
	creator, err := sdk.AccAddressFromHex(sk.PubKey().Address().String())
	assert.Nil(t, err)

	invoiceName := "two invoice test"
	rootInvoice, ctx, keeper := newRootInvoice(t, creator, invoiceName)
	srv := NewMsgServerImpl(*keeper)
	wctx := sdk.WrapSDKContext(ctx)
	expected := &types.MsgCreateSellOrder{Creator: creator, SellInvoiceID: rootInvoice.InvoiceID, Amount: sdk.NewInt(-20)}
	_, err = srv.CreateSellOrder(wctx, expected)
	require.Error(t, err)
	expected2 := &types.MsgCreateSellOrder{Creator: creator, SellInvoiceID: rootInvoice.InvoiceID, Amount: sdk.NewInt(20), Price: sdk.NewInt(-1)}
	_, err = srv.CreateSellOrder(wctx, expected2)
	require.Error(t, err)

}

func TestSellOrderMsgServerDelete(t *testing.T) {
	setupBech32Prefix()

	sk := ed25519.GenPrivKey()
	creator, err := sdk.AccAddressFromHex(sk.PubKey().Address().String())
	assert.Nil(t, err)

	sk = ed25519.GenPrivKey()
	user2, err := sdk.AccAddressFromHex(sk.PubKey().Address().String())
	assert.Nil(t, err)

	invoiceName := "two invoice test"
	rootInvoice, ctx, keeper := newRootInvoice(t, creator, invoiceName)
	srv := NewMsgServerImpl(*keeper)
	wctx := sdk.WrapSDKContext(ctx)

	for i, tc := range []struct {
		desc    string
		request *types.MsgDeleteSellOrder
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgDeleteSellOrder{Creator: creator},
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgDeleteSellOrder{Creator: user2},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "KeyNotFound",
			request: &types.MsgDeleteSellOrder{Creator: creator},
			err:     sdkerrors.ErrKeyNotFound,
		},
	} {
		tc := tc
		t.Run(tc.desc, func(t *testing.T) {
			expected := &types.MsgCreateSellOrder{Creator: creator, SellInvoiceID: rootInvoice.InvoiceID, Amount: sdk.NewInt(int64(i)), Price: sdk.NewInt(20)}
			ret, err := srv.CreateSellOrder(wctx, expected)
			require.NoError(t, err)

			tc.request.SellOrderID = ret.OrderID
			if tc.desc == "KeyNotFound" {
				tc.request.SellOrderID = "random"
			}
			_, err = srv.DeleteSellOrder(wctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
				order, found := keeper.GetSellOrder(ctx, tc.request.SellOrderID)
				require.True(t, found)
				require.True(t, order.IsDeleted)
			}
			time.Sleep(time.Second * 1)
		})
	}
}
