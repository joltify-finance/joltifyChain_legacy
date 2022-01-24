package keeper_test

import (
	"encoding/hex"
	"fmt"
	"testing"

	"github.com/tendermint/tendermint/crypto/ed25519"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"gitlab.com/joltify/joltifychain/x/invoice/tools"

	keepertest "gitlab.com/joltify/joltifychain/testutil/keeper"
	"gitlab.com/joltify/joltifychain/x/invoice/keeper"
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
	k, ctx := keepertest.SetupKeeper(t)
	srv := keeper.NewMsgServerImpl(*k)
	wctx := sdk.WrapSDKContext(ctx)
	sk := ed25519.GenPrivKey()
	creator, err := sdk.AccAddressFromHex(sk.PubKey().Address().String())
	assert.Nil(t, err)
	for i := 0; i < 5; i++ {
		idx := fmt.Sprintf("%d", i)
		expected := &types.MsgCreateInvoice{Creator: creator.String(), OrigOwner: creator.String(), Name: idx, Amount: "1000", Apy: "12", Url: "testURL"}
		_, err := srv.CreateInvoice(wctx, expected)
		require.NoError(t, err)
		invoiceIDByte, err := tools.GenHash([]string{creator.String(), expected.OrigOwner, expected.Name})
		require.NoError(t, err)
		invoiceID := hex.EncodeToString(invoiceIDByte)
		rst, found := k.GetInvoice(ctx, invoiceID)
		require.True(t, found)
		assert.Equal(t, expected.Creator, rst.InvoiceBase.Creator.String())
		assert.Equal(t, expected.Creator, rst.InvoiceBase.OrigOwner.String())
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
			request: &types.MsgDeleteInvoice{Creator: creator.String(), OrigOwner: creator.String(), Name: invoiceName},
		},
		{
			desc:    "KeyNotFound",
			request: &types.MsgDeleteInvoice{Creator: invalidUser.String(), OrigOwner: creator.String(), Name: invoiceName},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "KeyNotFound",
			request: &types.MsgDeleteInvoice{Creator: creator.String(), OrigOwner: creator.String(), Name: "missing"},
			err:     sdkerrors.ErrKeyNotFound,
		},
	} {
		tc := tc
		t.Run(tc.desc, func(t *testing.T) {
			k, ctx := keepertest.SetupKeeper(t)
			srv := keeper.NewMsgServerImpl(*k)
			wctx := sdk.WrapSDKContext(ctx)

			_, err := srv.CreateInvoice(wctx, &types.MsgCreateInvoice{Creator: creator.String(), OrigOwner: creator.String(), Name: invoiceName, Apy: "123", Amount: "10000", Url: "testURL"})
			require.NoError(t, err)
			_, err = srv.DeleteInvoice(wctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
				_, found := k.GetInvoice(ctx, tc.request.String())
				require.False(t, found)
			}
		})
	}
}
