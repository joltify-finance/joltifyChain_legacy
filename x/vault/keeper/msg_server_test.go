package keeper_test

import (
	"context"
	joltifyapp "gitlab.com/joltify/joltifychain/app"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "gitlab.com/joltify/joltifychain/testutil/keeper"
	"gitlab.com/joltify/joltifychain/x/vault/keeper"
	"gitlab.com/joltify/joltifychain/x/vault/types"
)

func setupMsgServer(t testing.TB) (*joltifyapp.App, types.MsgServer, context.Context) {
	app, ctx := keepertest.SetupVaultApp(t)
	return app, keeper.NewMsgServerImpl(app.VaultKeeper), sdk.WrapSDKContext(ctx)
}
