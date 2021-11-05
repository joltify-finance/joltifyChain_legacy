package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.com/joltify/joltifychain/joltifychain/x/invoice/types"
)

// SetInvoice set a specific invoice in the store from its index
func (k Keeper) SetInvoice(ctx sdk.Context, invoice types.Invoice) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.InvoiceKey))
	b := k.cdc.MustMarshalBinaryBare(&invoice)
	store.Set(types.KeyPrefix(invoice.InvoiceID), b)
}

// GetInvoice returns a invoice from its index
func (k Keeper) GetInvoice(ctx sdk.Context, index string) (val types.Invoice, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.InvoiceKey))

	b := store.Get(types.KeyPrefix(index))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshalBinaryBare(b, &val)
	return val, true
}

// RemoveInvoice removes an invoice from the store
func (k Keeper) RemoveInvoice(ctx sdk.Context, index string) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.InvoiceKey))
	store.Delete(types.KeyPrefix(index))
}

// GetAllInvoice returns all invoice
func (k Keeper) GetAllInvoice(ctx sdk.Context) (list []types.Invoice) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.InvoiceKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Invoice
		k.cdc.MustUnmarshalBinaryBare(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}
