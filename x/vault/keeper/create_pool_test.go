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

func createNCreatePool(keeper *keeper.Keeper, ctx sdk.Context, n int, addresses []sdk.AccAddress) []types.CreatePool {
	items := make([]types.CreatePool, n)
	for i := range items {
		poolProposal := types.PoolProposal{
			PoolPubKey: fmt.Sprintf("%d", i),
		}
		poolProposal.Nodes = addresses
		items[i].Proposal = []*types.PoolProposal{&poolProposal}
		items[i].BlockHeight = fmt.Sprintf("%d", i)
		keeper.SetCreatePool(ctx, items[i])
	}
	return items
}

func TestCreatePoolGet(t *testing.T) {
	setupBech32Prefix()
	addressesStr := []string{"jolt1rfmwldwrm3652shx3a7say0v4vvtglast0l05d", "jolt1xdpg5l3pxpyhxqg4ey4krq2pf9d3sphmmuuugg", "jolt17fczazdur0g04jtedlwp837r0vzktvwc0gx0fg"}
	addresses := make([]sdk.AccAddress, 3)
	var err error
	for i := 0; i < 3; i++ {
		addresses[i], err = sdk.AccAddressFromBech32(addressesStr[i])
		assert.Nil(t, err)
	}

	app, ctx := keepertest.SetupVaultApp(t)
	items := createNCreatePool(&app.VaultKeeper, ctx, 10, addresses)
	for _, item := range items {
		rst, found := app.VaultKeeper.GetCreatePool(ctx, item.BlockHeight)
		assert.True(t, found)
		assert.Equal(t, item, rst)
	}
}

func TestCreatePoolRemove(t *testing.T) {
	setupBech32Prefix()
	addressesStr := []string{"jolt1rfmwldwrm3652shx3a7say0v4vvtglast0l05d", "jolt1xdpg5l3pxpyhxqg4ey4krq2pf9d3sphmmuuugg", "jolt17fczazdur0g04jtedlwp837r0vzktvwc0gx0fg"}
	addresses := make([]sdk.AccAddress, 3)
	var err error
	for i := 0; i < 3; i++ {
		addresses[i], err = sdk.AccAddressFromBech32(addressesStr[i])
		assert.Nil(t, err)
	}
	app, ctx := keepertest.SetupVaultApp(t)

	items := createNCreatePool(&app.VaultKeeper, ctx, 10, addresses)
	for _, item := range items {
		app.VaultKeeper.RemoveCreatePool(ctx, item.BlockHeight)
		_, found := app.VaultKeeper.GetCreatePool(ctx, item.BlockHeight)
		assert.False(t, found)
	}
}

func TestCreatePoolGetAll(t *testing.T) {
	setupBech32Prefix()
	addressesStr := []string{"jolt1rfmwldwrm3652shx3a7say0v4vvtglast0l05d", "jolt1xdpg5l3pxpyhxqg4ey4krq2pf9d3sphmmuuugg", "jolt17fczazdur0g04jtedlwp837r0vzktvwc0gx0fg"}
	addresses := make([]sdk.AccAddress, 3)
	var err error
	for i := 0; i < 3; i++ {
		addresses[i], err = sdk.AccAddressFromBech32(addressesStr[i])
		assert.Nil(t, err)
	}
	app, ctx := keepertest.SetupVaultApp(t)
	items := createNCreatePool(&app.VaultKeeper, ctx, 10, addresses)
	assert.Equal(t, items, app.VaultKeeper.GetAllCreatePool(ctx))
}
