package keeper

import (
	"fmt"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/assert"
    
	"github.com/joltify/joltifyChain/x/vault/types"
)

func createNIssueToken(keeper *Keeper, ctx sdk.Context, n int) []types.IssueToken {
	items := make([]types.IssueToken, n)
	for i := range items {
		items[i].Creator = "any"
		items[i].Index = fmt.Sprintf("%d", i)
		keeper.SetIssueToken(ctx, items[i])
	}
	return items
}

func TestIssueTokenGet(t *testing.T) {
	keeper, ctx := setupKeeper(t)
	items := createNIssueToken(keeper, ctx, 10)
	for _, item := range items {
		rst, found := keeper.GetIssueToken(ctx, item.Index)
		assert.True(t, found)
		assert.Equal(t, item, rst)
	}
}
func TestIssueTokenRemove(t *testing.T) {
	keeper, ctx := setupKeeper(t)
	items := createNIssueToken(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveIssueToken(ctx, item.Index)
		_, found := keeper.GetIssueToken(ctx, item.Index)
		assert.False(t, found)
	}
}

func TestIssueTokenGetAll(t *testing.T) {
	keeper, ctx := setupKeeper(t)
	items := createNIssueToken(keeper, ctx, 10)
	assert.Equal(t, items, keeper.GetAllIssueToken(ctx))
}
