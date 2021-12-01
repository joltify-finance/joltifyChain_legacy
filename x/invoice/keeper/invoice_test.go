package keeper

import (
	"fmt"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/assert"

	"gitlab.com/joltify/joltifychain/x/invoice/types"
)

func createNInvoice(keeper *Keeper, ctx sdk.Context, n int) []types.Invoice {
	items := make([]types.Invoice, n)
	for i := range items {
		items[i].InvoiceID = fmt.Sprintf("%d", i)
		keeper.SetInvoice(ctx, items[i])
	}
	return items
}

func TestInvoiceGet(t *testing.T) {
	keeper, ctx := setupKeeper(t)
	items := createNInvoice(keeper, ctx, 10)
	for _, item := range items {
		rst, found := keeper.GetInvoice(ctx, item.InvoiceID)
		assert.True(t, found)
		assert.Equal(t, item, rst)
	}
}

func TestInvoiceRemove(t *testing.T) {
	keeper, ctx := setupKeeper(t)
	items := createNInvoice(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveInvoice(ctx, item.InvoiceID)
		_, found := keeper.GetInvoice(ctx, item.InvoiceID)
		assert.False(t, found)
	}
}

func TestInvoiceGetAll(t *testing.T) {
	keeper, ctx := setupKeeper(t)
	items := createNInvoice(keeper, ctx, 10)
	assert.Equal(t, items, keeper.GetAllInvoice(ctx))
}
