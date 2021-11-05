package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.com/joltify/joltifychain/joltifychain/x/invoice/types"
)

// SetPlaceOrder set a specific placeOrder in the store from its index
func (k Keeper) SetPlaceOrder(ctx sdk.Context, placeOrder types.PlaceOrder) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PlaceOrderKey))
	b := k.cdc.MustMarshalBinaryBare(&placeOrder)
	store.Set(types.KeyPrefix(placeOrder.PlaceOrderIndex), b)
}

// GetPlaceOrder returns a placeOrder from its index
func (k Keeper) GetPlaceOrder(ctx sdk.Context, index string) (val types.PlaceOrder, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PlaceOrderKey))

	b := store.Get(types.KeyPrefix(index))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshalBinaryBare(b, &val)
	return val, true
}

// RemovePlaceOrder removes a placeOrder from the store
func (k Keeper) RemovePlaceOrder(ctx sdk.Context, index string) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PlaceOrderKey))
	store.Delete(types.KeyPrefix(index))
}

// GetAllPlaceOrder returns all placeOrder
func (k Keeper) GetAllPlaceOrder(ctx sdk.Context) (list []types.PlaceOrder) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PlaceOrderKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.PlaceOrder
		k.cdc.MustUnmarshalBinaryBare(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}
