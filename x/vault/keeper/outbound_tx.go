package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.com/joltify/joltifychain/x/vault/types"
)

// SetOutboundTx set a specific outboundTx in the store from its index
func (k Keeper) SetOutboundTx(ctx sdk.Context, outboundTx types.OutboundTx) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.OutboundTxKeyPrefix))
	b := k.cdc.MustMarshal(&outboundTx)
	store.Set(types.OutboundTxKey(
		outboundTx.Index,
	), b)
}

// GetOutboundTx returns a outboundTx from its index
func (k Keeper) GetOutboundTx(
	ctx sdk.Context,
	requestID string,

) (val types.OutboundTx, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.OutboundTxKeyPrefix))

	b := store.Get(types.OutboundTxKey(
		requestID,
	))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveOutboundTx removes a outboundTx from the store
func (k Keeper) RemoveOutboundTx(
	ctx sdk.Context,
	requestID string,

) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.OutboundTxKeyPrefix))
	store.Delete(types.OutboundTxKey(
		requestID,
	))
}

// GetAllOutboundTx returns all outboundTx
func (k Keeper) GetAllOutboundTx(ctx sdk.Context) (list []types.OutboundTx) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.OutboundTxKeyPrefix))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.OutboundTx
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}
