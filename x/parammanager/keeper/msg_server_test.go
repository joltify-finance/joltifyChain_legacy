package keeper_test

import (
	"context"
	"testing"

	keepertest "gitlab.com/joltify/joltifychain/testutil/keeper"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.com/joltify/joltifychain/x/parammanager/keeper"
	"gitlab.com/joltify/joltifychain/x/parammanager/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.SetupParamManagerKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
