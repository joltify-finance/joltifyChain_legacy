package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/joltify/joltifyChain/x/invoice/types"
)

// SetAddedSellOrder set a specific sellOrder in the store from its index
func (k Keeper) SetAddedSellOrder(ctx sdk.Context, sellOrder types.SellOrder) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.AddedSellOrderKey))
	b := k.cdc.MustMarshalBinaryBare(&sellOrder)
	store.Set(types.KeyPrefix(sellOrder.SellOrderID), b)
}

// GetAddedSellOrder returns a sellOrder from its index
func (k Keeper) GetAddedSellOrder(ctx sdk.Context, index string) (val types.SellOrder, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.AddedSellOrderKey))

	b := store.Get(types.KeyPrefix(index))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshalBinaryBare(b, &val)
	return val, true
}

// RemoveAddedSellOrder removes a sellOrder from the store
func (k Keeper) RemoveAddedSellOrder(ctx sdk.Context, index string) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.AddedSellOrderKey))
	store.Delete(types.KeyPrefix(index))
}

// GetAllAddedSellOrder returns all sellOrder
func (k Keeper) GetAllAddedSellOrder(ctx sdk.Context) (list []types.SellOrder) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.AddedSellOrderKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.SellOrder
		k.cdc.MustUnmarshalBinaryBare(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}
