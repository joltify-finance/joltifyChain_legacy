package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.com/joltify/joltifychain/x/vault/types"
)

// SetValidators set a specific validator in the store from its index
func (k Keeper) SetValidators(ctx sdk.Context, index string, validators types.Validators) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ValidatorsStoreKey))
	b := k.cdc.MustMarshal(&validators)
	store.Set(types.KeyPrefix(index), b)
}

// GetValidatorsByHeight returns a validators group from its index
func (k Keeper) GetValidatorsByHeight(ctx sdk.Context, index string) (val types.Validators, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ValidatorsStoreKey))

	b := store.Get(types.KeyPrefix(index))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// DoGetAllValidators returns all issueToken
func (k Keeper) DoGetAllValidators(ctx sdk.Context) (list []types.Validators) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ValidatorsStoreKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Validators
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}
