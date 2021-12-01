package keeper

import (
	"encoding/hex"
	"fmt"
	"github.com/tendermint/tendermint/crypto/ed25519"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"gitlab.com/joltify/joltifychain/x/invoice/tools"

	"gitlab.com/joltify/joltifychain/x/invoice/types"
)

func setupBech32Prefix() {
	config := sdk.GetConfig()

	config.SetBech32PrefixForAccount("jolt", "joltpub")
	config.SetBech32PrefixForValidator("joltval", "joltvpub")
	config.SetBech32PrefixForConsensusNode("joltvalcons", "joltcpub")
}

func TestInvoiceMsgServerCreate(t *testing.T) {
	setupBech32Prefix()
	keeper, ctx := setupKeeper(t)
	srv := NewMsgServerImpl(*keeper)
	wctx := sdk.WrapSDKContext(ctx)
	sk := ed25519.GenPrivKey()
	creator, err := sdk.AccAddressFromHex(sk.PubKey().Address().String())
	assert.Nil(t, err)
	for i := 0; i < 5; i++ {
		idx := fmt.Sprintf("%d", i)
		expected := &types.MsgCreateInvoice{Creator: creator, OrigOwner: creator, Name: idx, Amount: sdk.NewInt(1000), Apy: "12", Url: "testURL"}
		_, err := srv.CreateInvoice(wctx, expected)
		require.NoError(t, err)
		invoiceIDByte, err := tools.GenHash([]string{creator.String(), expected.OrigOwner.String(), expected.Name})
		require.NoError(t, err)
		invoiceID := hex.EncodeToString(invoiceIDByte)
		rst, found := keeper.GetInvoice(ctx, invoiceID)
		require.True(t, found)
		assert.Equal(t, expected.Creator, rst.InvoiceBase.Creator)
		assert.Equal(t, expected.Creator, rst.InvoiceBase.OrigOwner)
	}
}

func TestInvoiceMsgServerDelete(t *testing.T) {
	invoiceName := "any"
	setupBech32Prefix()

	sk := ed25519.GenPrivKey()
	creator, err := sdk.AccAddressFromHex(sk.PubKey().Address().String())
	assert.Nil(t, err)
	sk = ed25519.GenPrivKey()
	invalidUser, err := sdk.AccAddressFromHex(sk.PubKey().Address().String())
	assert.Nil(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgDeleteInvoice
		err     error
	}{
		{
			desc:    invoiceName,
			request: &types.MsgDeleteInvoice{Creator: creator, OrigOwner: creator, Name: invoiceName},
		},
		{
			desc:    "KeyNotFound",
			request: &types.MsgDeleteInvoice{Creator: invalidUser, OrigOwner: creator, Name: invoiceName},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "KeyNotFound",
			request: &types.MsgDeleteInvoice{Creator: creator, OrigOwner: creator, Name: "missing"},
			err:     sdkerrors.ErrKeyNotFound,
		},
	} {
		tc := tc
		t.Run(tc.desc, func(t *testing.T) {
			keeper, ctx := setupKeeper(t)
			srv := NewMsgServerImpl(*keeper)
			wctx := sdk.WrapSDKContext(ctx)

			_, err := srv.CreateInvoice(wctx, &types.MsgCreateInvoice{Creator: creator, OrigOwner: creator, Name: invoiceName, Apy: "123", Amount: sdk.NewInt(10000), Url: "testURL"})
			require.NoError(t, err)
			_, err = srv.DeleteInvoice(wctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
				_, found := keeper.GetInvoice(ctx, tc.request.String())
				require.False(t, found)
			}
		})
	}
}
