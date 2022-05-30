package keeper_test

import (
	"fmt"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/assert"
	keepertest "gitlab.com/joltify/joltifychain/testutil/keeper"
	"gitlab.com/joltify/joltifychain/x/vault/keeper"
	"gitlab.com/joltify/joltifychain/x/vault/types"
)

func createNIssueToken(keeper *keeper.Keeper, ctx sdk.Context, n int) ([]types.IssueToken, error) {
	items := make([]types.IssueToken, n)
	creator, err := sdk.AccAddressFromBech32("jolt1xdpg5l3pxpyhxqg4ey4krq2pf9d3sphmmuuugg")
	if err != nil {
		return nil, err
	}
	for i := range items {
		items[i].Creator = creator
		items[i].Index = fmt.Sprintf("%d", i)
		keeper.SetIssueToken(ctx, items[i])
	}
	return items, nil
}

func TestIssueTokenGet(t *testing.T) {
	app, ctx := keepertest.SetupVaultApp(t)
	items, err := createNIssueToken(&app.VaultKeeper, ctx, 10)
	assert.Nil(t, err)
	for _, item := range items {
		rst, found := app.VaultKeeper.GetIssueToken(ctx, item.Index)
		assert.True(t, found)
		assert.Equal(t, item, rst)
	}
}

//fixme how can we remove the issue token
//func TestIssueTokenRemove(t *testing.T) {
//	keeper, ctx := keepertest.SetupVaultApp(t)
//	items := createNIssueToken(keeper, ctx, 10)
//	for _, item := range items {
//		keeper.RemoveIssueToken(ctx, item.Index)
//		_, found := keeper.GetIssueToken(ctx, item.Index)
//		assert.False(t, found)
//	}
//}

func TestIssueTokenGetAll(t *testing.T) {
	app, ctx := keepertest.SetupVaultApp(t)
	items, err := createNIssueToken(&app.VaultKeeper, ctx, 10)
	assert.Nil(t, err)
	assert.Equal(t, items, app.VaultKeeper.GetAllIssueToken(ctx))
}
