package keeper_test

import (
	"context"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "gitlab.com/joltify/joltifychain/testutil/keeper"
	"gitlab.com/joltify/joltifychain/x/vault/keeper"
	"gitlab.com/joltify/joltifychain/x/vault/types"
)

func setupMsgServer(t testing.TB) (*keeper.Keeper, types.MsgServer, context.Context) {
	k, ctx := keepertest.SetupVaultKeeper(t)
	return k, keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
