package keeper_test

import (
	"context"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "gitlab.com/joltify/joltifychain/testutil/keeper"
	"gitlab.com/joltify/joltifychain/x/invoice/keeper"
	"gitlab.com/joltify/joltifychain/x/invoice/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.SetupKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
