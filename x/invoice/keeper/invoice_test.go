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

func createNInvoice(k *keeper.Keeper, ctx sdk.Context, n int) []types.Invoice {
	items := make([]types.Invoice, n)
	for i := range items {
		items[i].InvoiceID = fmt.Sprintf("%d", i)
		k.SetInvoice(ctx, items[i])
	}
	return items
}

func TestInvoiceGet(t *testing.T) {
	k, ctx := keepertest.SetupKeeper(t)
	items := createNInvoice(k, ctx, 10)
	for _, item := range items {
		rst, found := k.GetInvoice(ctx, item.InvoiceID)
		assert.True(t, found)
		assert.Equal(t, item, rst)
	}
}

func TestInvoiceRemove(t *testing.T) {
	k, ctx := keepertest.SetupKeeper(t)
	items := createNInvoice(k, ctx, 10)
	for _, item := range items {
		k.RemoveInvoice(ctx, item.InvoiceID)
		_, found := k.GetInvoice(ctx, item.InvoiceID)
		assert.False(t, found)
	}
}

func TestInvoiceGetAll(t *testing.T) {
	k, ctx := keepertest.SetupKeeper(t)
	items := createNInvoice(k, ctx, 10)
	assert.Equal(t, items, k.GetAllInvoice(ctx))
}
