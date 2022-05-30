package keeper_test

import (
	"encoding/hex"
	"github.com/cosmos/cosmos-sdk/crypto/keys/ed25519"
	types2 "github.com/cosmos/cosmos-sdk/x/staking/types"
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
	app, srv, wctx := setupMsgServer(t)
	k := &app.VaultKeeper

	sk := ed25519.GenPrivKey()
	desc := types2.NewDescription("tester", "testId", "www.test.com", "aaa", "aaa")
	creatorStr := "jolt1f0atl7egduue8a07j42hyklct0sqa68wxem3lg"
	creator, err := sdk.AccAddressFromBech32(creatorStr)
	assert.Nil(t, err)
	valAddr, err := sdk.ValAddressFromHex(hex.EncodeToString(creator.Bytes()))
	assert.Nil(t, err)
	testValidator, err := types2.NewValidator(valAddr, sk.PubKey(), desc)
	require.NoError(t, err)

	pubkey := "joltpub1zcjduepqhxmegjjucngmkkqjhs04u2z034943xslr3je678dxvt77pa5hqjskqd2eh"

	ctx := sdk.UnwrapSDKContext(wctx)
	historyInfo := types2.HistoricalInfo{
		Valset: types2.Validators{testValidator},
	}
	app.StakingKeeper.SetHistoricalInfo(ctx, int64(1), &historyInfo)

	expected := &types.MsgCreateCreatePool{Creator: creator, BlockHeight: "1", PoolPubKey: pubkey}
	_, err = srv.CreateCreatePool(wctx, expected)
	require.NoError(t, err)

	rst, found := k.GetCreatePool(ctx, expected.BlockHeight)
	require.True(t, found)
	assert.Equal(t, expected.PoolPubKey, rst.Proposal[0].PoolPubKey)
}

func TestCreatePoolMsgServerCreateNotValidator(t *testing.T) {
	setupBech32Prefix()
	app, srv, wctx := setupMsgServer(t)
	k := &app.VaultKeeper
	ctx := sdk.UnwrapSDKContext(wctx)

	sk := ed25519.GenPrivKey()
	desc := types2.NewDescription("tester", "testId", "www.test.com", "aaa", "aaa")
	operatorStr := "jolt1f0atl7egduue8a07j42hyklct0sqa68wxem3lg"
	operator, err := sdk.AccAddressFromBech32(operatorStr)
	assert.Nil(t, err)
	valAddr, err := sdk.ValAddressFromHex(hex.EncodeToString(operator.Bytes()))
	assert.Nil(t, err)
	testValidator, err := types2.NewValidator(valAddr, sk.PubKey(), desc)
	require.NoError(t, err)
	historyInfo := types2.HistoricalInfo{
		Valset: types2.Validators{testValidator},
	}
	app.StakingKeeper.SetHistoricalInfo(ctx, int64(1), &historyInfo)

	creatorStr := "jolt1xdpg5l3pxpyhxqg4ey4krq2pf9d3sphmmuuugg"
	creator, err := sdk.AccAddressFromBech32(creatorStr)
	assert.Nil(t, err)
	expected := &types.MsgCreateCreatePool{Creator: creator, BlockHeight: "1", PoolPubKey: creatorStr}
	_, err = srv.CreateCreatePool(wctx, expected)
	require.NoError(t, err)
	_, found := k.GetCreatePool(ctx, expected.BlockHeight)
	require.False(t, found)
}
