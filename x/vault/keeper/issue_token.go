package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.com/joltify/joltifychain/x/vault/types"
)

// SetIssueToken set a specific issueToken in the store from its index
func (k Keeper) SetIssueToken(ctx sdk.Context, issueToken types.IssueToken) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.IssueTokenKey))
	b := k.cdc.MustMarshalBinaryBare(&issueToken)
	store.Set(types.KeyPrefix(issueToken.Index), b)
}

// GetIssueToken returns a issueToken from its index
func (k Keeper) GetIssueToken(ctx sdk.Context, index string) (val types.IssueToken, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.IssueTokenKey))

	b := store.Get(types.KeyPrefix(index))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshalBinaryBare(b, &val)
	return val, true
}

// GetAllIssueToken returns all issueToken
func (k Keeper) GetAllIssueToken(ctx sdk.Context) (list []types.IssueToken) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.IssueTokenKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.IssueToken
		k.cdc.MustUnmarshalBinaryBare(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}
