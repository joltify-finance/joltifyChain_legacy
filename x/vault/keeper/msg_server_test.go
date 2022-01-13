package keeper

import (
	"context"
	"testing"

	keepertest "github.com/cosmonaut/mars/testutil/keeper"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.com/joltify/joltifychain/x/vault/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.MarsKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
