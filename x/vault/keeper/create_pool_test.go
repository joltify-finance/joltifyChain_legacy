package keeper

import (
	"fmt"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/assert"
	"gitlab.com/joltify/joltifychain/x/vault/types"
)

func createNCreatePool(keeper *Keeper, ctx sdk.Context, n int) []types.CreatePool {
	items := make([]types.CreatePool, n)
	for i := range items {
		poolProposal := types.PoolProposal{
			PoolPubKey: fmt.Sprintf("%d", i),
		}
		items[i].Proposal = []*types.PoolProposal{&poolProposal}
		items[i].BlockHeight = fmt.Sprintf("%d", i)
		keeper.SetCreatePool(ctx, items[i])
	}
	return items
}

func TestCreatePoolGet(t *testing.T) {
	keeper, ctx := setupKeeper(t)
	items := createNCreatePool(keeper, ctx, 10)
	for _, item := range items {
		rst, found := keeper.GetCreatePool(ctx, item.BlockHeight)
		assert.True(t, found)
		assert.Equal(t, item, rst)
	}
}

func TestCreatePoolRemove(t *testing.T) {
	keeper, ctx := setupKeeper(t)
	items := createNCreatePool(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveCreatePool(ctx, item.BlockHeight)
		_, found := keeper.GetCreatePool(ctx, item.BlockHeight)
		assert.False(t, found)
	}
}

func TestCreatePoolGetAll(t *testing.T) {
	keeper, ctx := setupKeeper(t)
	items := createNCreatePool(keeper, ctx, 10)
	assert.Equal(t, items, keeper.GetAllCreatePool(ctx))
}
