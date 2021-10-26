package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/joltify/joltifyChain/x/vault/types"
)

// SetCreatePool set a specific createPool in the store from its index
func (k Keeper) SetCreatePool(ctx sdk.Context, createPool types.CreatePool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CreatePoolKey))
	b := k.cdc.MustMarshalBinaryBare(&createPool)
	store.Set(types.KeyPrefix(createPool.BlockHeight), b)
}

// GetCreatePool returns a createPool from its index
func (k Keeper) GetCreatePool(ctx sdk.Context, index string) (val types.CreatePool, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CreatePoolKey))

	b := store.Get(types.KeyPrefix(index))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshalBinaryBare(b, &val)
	return val, true
}

// RemoveCreatePool removes a createPool from the store
func (k Keeper) RemoveCreatePool(ctx sdk.Context, index string) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CreatePoolKey))
	store.Delete(types.KeyPrefix(index))
}

// GetAllCreatePool returns all createPool
func (k Keeper) GetAllCreatePool(ctx sdk.Context) (list []types.CreatePool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CreatePoolKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.CreatePool
		k.cdc.MustUnmarshalBinaryBare(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}
