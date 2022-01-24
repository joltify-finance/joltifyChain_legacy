package keeper_test

import (
	"fmt"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/assert"
	keepertest "gitlab.com/joltify/joltifychain/testutil/keeper"

	"gitlab.com/joltify/joltifychain/x/invoice/keeper"
	"gitlab.com/joltify/joltifychain/x/invoice/types"
)

func createNPlaceOrder(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.PlaceOrder {
	creatorStr := "inv12k0nzax6dr3d9tssxne7ygmhdpj79rpx797a4k"
	creator, _ := sdk.AccAddressFromBech32(creatorStr)
	items := make([]types.PlaceOrder, n)
	for i := range items {
		items[i].Creator = creator
		items[i].PlaceOrderIndex = fmt.Sprintf("%d", i)
		items[i].Amount = sdk.NewInt(0)
		keeper.SetPlaceOrder(ctx, items[i])
	}
	return items
}

func TestPlaceOrderGet(t *testing.T) {
	keeper, ctx := keepertest.SetupKeeper(t)
	items := createNPlaceOrder(keeper, ctx, 10)
	for _, item := range items {
		rst, found := keeper.GetPlaceOrder(ctx, item.PlaceOrderIndex)
		assert.True(t, found)
		assert.Equal(t, item, rst)
	}
}

func TestPlaceOrderRemove(t *testing.T) {
	keeper, ctx := keepertest.SetupKeeper(t)
	items := createNPlaceOrder(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemovePlaceOrder(ctx, item.PlaceOrderIndex)
		_, found := keeper.GetPlaceOrder(ctx, item.PlaceOrderIndex)
		assert.False(t, found)
	}
}

func TestPlaceOrderGetAll(t *testing.T) {
	keeper, ctx := keepertest.SetupKeeper(t)
	items := createNPlaceOrder(keeper, ctx, 10)
	assert.Equal(t, items, keeper.GetAllPlaceOrder(ctx))
}
