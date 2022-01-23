package keeper_test

import (
	"fmt"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"gitlab.com/joltify/joltifychain/x/vault/types"
)

func setupBech32Prefix() {
	config := sdk.GetConfig()
	config.SetBech32PrefixForAccount("jolt", "joltpub")
	config.SetBech32PrefixForValidator("joltval", "joltvpub")
	config.SetBech32PrefixForConsensusNode("joltvalcons", "joltcpub")
}

func TestCreatePoolMsgServerCreate(t *testing.T) {
	setupBech32Prefix()
	k, srv, wctx := setupMsgServer(t)
	ctx := sdk.UnwrapSDKContext(wctx)
	creatorStr := "jolt1f0atl7egduue8a07j42hyklct0sqa68wxem3lg"
	creator, err := sdk.AccAddressFromBech32(creatorStr)
	assert.Nil(t, err)
	pubkey := "joltpub1zcjduepqhxmegjjucngmkkqjhs04u2z034943xslr3je678dxvt77pa5hqjskqd2eh"
	for i := 1; i < 6; i++ {
		blockHeight := fmt.Sprintf("%d", i)
		expected := &types.MsgCreateCreatePool{Creator: creator, BlockHeight: blockHeight, PoolPubKey: pubkey}
		_, err := srv.CreateCreatePool(wctx, expected)
		require.NoError(t, err)

		rst, found := k.GetCreatePool(ctx, expected.BlockHeight)
		require.True(t, found)
		assert.Equal(t, expected.PoolPubKey, rst.Proposal[0].PoolPubKey)
	}
}

func TestCreatePoolMsgServerCreateNotValidator(t *testing.T) {
	setupBech32Prefix()
	k, srv, wctx := setupMsgServer(t)
	ctx := sdk.UnwrapSDKContext(wctx)
	creatorStr := "jolt1xdpg5l3pxpyhxqg4ey4krq2pf9d3sphmmuuugg"
	creator, err := sdk.AccAddressFromBech32(creatorStr)
	assert.Nil(t, err)
	expected := &types.MsgCreateCreatePool{Creator: creator, BlockHeight: "1", PoolPubKey: creatorStr}
	_, err = srv.CreateCreatePool(wctx, expected)
	require.NoError(t, err)
	_, found := k.GetCreatePool(ctx, expected.BlockHeight)
	require.False(t, found)
}
