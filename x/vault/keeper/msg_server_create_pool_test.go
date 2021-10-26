package keeper

import (
	"fmt"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/joltify/joltifyChain/x/vault/types"
)

func setupBech32Prefix() {
	config := sdk.GetConfig()
	config.SetBech32PrefixForAccount("inv", "invpub")
	config.SetBech32PrefixForValidator("invvaloper", "invvpub")
	config.SetBech32PrefixForConsensusNode("invc", "invcpub")
}

func TestCreatePoolMsgServerCreate(t *testing.T) {
	setupBech32Prefix()
	keeper, ctx := setupKeeper(t)
	srv := NewMsgServerImpl(*keeper)
	wctx := sdk.WrapSDKContext(ctx)

	creatorStr := "inv12k0nzax6dr3d9tssxne7ygmhdpj79rpx797a4k"
	creator, err := sdk.AccAddressFromBech32(creatorStr)
	assert.Nil(t, err)
	for i := 0; i < 5; i++ {
		blockHeight := fmt.Sprintf("%d", i)
		expected := &types.MsgCreateCreatePool{Creator: creator, BlockHeight: blockHeight, PoolPubKey: creatorStr}
		_, err := srv.CreateCreatePool(wctx, expected)
		require.NoError(t, err)
		rst, found := keeper.GetCreatePool(ctx, expected.BlockHeight)
		require.True(t, found)
		assert.Equal(t, expected.PoolPubKey, rst.Proposal[0].PoolPubKey)
	}
}

func TestCreatePoolMsgServerCreateNotValidator(t *testing.T) {
	setupBech32Prefix()
	keeper, ctx := setupKeeper(t)
	srv := NewMsgServerImpl(*keeper)
	wctx := sdk.WrapSDKContext(ctx)

	creatorStr := "inv1tese9f53eatrggvmg0nrex3820k7t22ktd7yw4"
	creator, err := sdk.AccAddressFromBech32(creatorStr)
	assert.Nil(t, err)
	expected := &types.MsgCreateCreatePool{Creator: creator, BlockHeight: "1", PoolPubKey: creatorStr}
	_, err = srv.CreateCreatePool(wctx, expected)
	require.NoError(t, err)
	_, found := keeper.GetCreatePool(ctx, expected.BlockHeight)
	require.False(t, found)
}
