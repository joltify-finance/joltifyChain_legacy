package keeper_test

import (
	"fmt"
	"testing"
	"time"

	"github.com/stretchr/testify/require"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/assert"

	keepertest "gitlab.com/joltify/joltifychain/testutil/keeper"
	"gitlab.com/joltify/joltifychain/x/invoice/keeper"
	"gitlab.com/joltify/joltifychain/x/invoice/types"
)

func createNSellOrder(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.SellOrder {
	creatorStr := "inv12k0nzax6dr3d9tssxne7ygmhdpj79rpx797a4k"
	creator, _ := sdk.AccAddressFromBech32(creatorStr)
	items := make([]types.SellOrder, n)
	for i := range items {
		items[i].Creator = creator
		items[i].SellOrderID = fmt.Sprintf("%d", i)
		items[i].Amount = sdk.NewInt(0)
		items[i].Price = sdk.NewInt(0)
		items[i].LeftAmount = sdk.NewInt(0)
		items[i].SellDuration = time.Second * 50
		items[i].CreatedTime = time.Now().UTC()
		keeper.SetSellOrder(ctx, items[i])
	}
	return items
}

func TestSellOrderGet(t *testing.T) {
	keeper, ctx := keepertest.SetupKeeper(t)
	items := createNSellOrder(keeper, ctx, 10)
	for _, item := range items {
		rst, found := keeper.GetSellOrder(ctx, item.SellOrderID)
		assert.True(t, found)
		assert.Equal(t, item, rst)
	}
}

func TestSellOrderRemove(t *testing.T) {
	keeper, ctx := keepertest.SetupKeeper(t)
	items := createNSellOrder(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveSellOrder(ctx, item.SellOrderID)
		_, found := keeper.GetSellOrder(ctx, item.SellOrderID)
		assert.False(t, found)
	}
}

func TestSellOrderGetAll(t *testing.T) {
	keeper, ctx := keepertest.SetupKeeper(t)
	items := createNSellOrder(keeper, ctx, 10)
	assert.Equal(t, items, keeper.GetAllSellOrder(ctx))
}

func TestRemoveExpireInvoice(t *testing.T) {
	keeper, ctx := keepertest.SetupKeeper(t)
	creatorStr := "inv12k0nzax6dr3d9tssxne7ygmhdpj79rpx797a4k"
	creator, _ := sdk.AccAddressFromBech32(creatorStr)
	items := make([]types.SellOrder, 10)
	invs := createNInvoice(keeper, ctx, 1)
	invs[0].InvoiceID = "2"
	invs[0].InvoiceFinance = &types.InvoiceFinance{Amount: sdk.NewInt(100), AmountLocked: sdk.NewInt(100)}
	keeper.SetInvoice(ctx, invs[0])
	for i := range items {
		items[i].Creator = creator
		items[i].InvoiceID = fmt.Sprintf("%d", i)
		items[i].SellOrderID = fmt.Sprintf("%d", i)
		items[i].Amount = sdk.NewInt(0)
		items[i].Price = sdk.NewInt(0)
		items[i].LeftAmount = sdk.NewInt(0)
		if i == 2 {
			items[i].SellDuration = time.Millisecond * 50
		} else {
			items[i].SellDuration = time.Second * 50
		}
		items[i].CreatedTime = time.Now().UTC()
		keeper.SetSellOrder(ctx, items[i])
		keeper.SetAddedSellOrder(ctx, items[i])
	}
	require.Equal(t, items, keeper.GetAllSellOrder(ctx))
	time.Sleep(time.Second)
	err := keeper.RemoveExpireInvoice(ctx)
	require.Nil(t, err)
	newItems := keeper.GetAllSellOrder(ctx)
	allSellOrders := keeper.GetAllAddedSellOrder(ctx)
	require.Equal(t, len(items), len(newItems))
	require.Equal(t, len(items)-1, len(allSellOrders))
}
