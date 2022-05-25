package keeper

import (
	"fmt"
	"time"

	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"
	"github.com/tendermint/tendermint/libs/log"
	"gitlab.com/joltify/joltifychain/x/incentives/types"
)

type Keeper struct {
	cdc        codec.Codec
	storeKey   sdk.StoreKey
	paramSpace paramtypes.Subspace
	hooks      types.IncentiveHooks
	bk         types.BankKeeper
	lk         types.LockupKeeper
	ek         types.EpochKeeper
	ak         types.AccountKeeper
}

func NewKeeper(cdc codec.Codec, storeKey sdk.StoreKey, paramSpace paramtypes.Subspace, bk types.BankKeeper, lk types.LockupKeeper, ek types.EpochKeeper, ak types.AccountKeeper) *Keeper {
	if !paramSpace.HasKeyTable() {
		paramSpace = paramSpace.WithKeyTable(types.ParamKeyTable())
	}

	return &Keeper{
		cdc:        cdc,
		storeKey:   storeKey,
		paramSpace: paramSpace,
		bk:         bk,
		lk:         lk,
		ek:         ek,
		ak:         ak,
	}
}

// Set the incentives hooks
func (k *Keeper) SetHooks(ih types.IncentiveHooks) *Keeper {
	if k.hooks != nil {
		panic("cannot set incentive hooks twice")
	}

	k.hooks = ih

	return k
}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

func (k Keeper) SetLockableDurations(ctx sdk.Context, lockableDurations []time.Duration) {
	store := ctx.KVStore(k.storeKey)

	info := types.LockableDurationsInfo{LockableDurations: lockableDurations}

	store.Set(types.LockableDurationsKey, k.cdc.MustMarshal(&info))
}

func (k Keeper) GetLockableDurations(ctx sdk.Context) []time.Duration {
	store := ctx.KVStore(k.storeKey)
	info := types.LockableDurationsInfo{}

	bz := store.Get(types.LockableDurationsKey)
	if len(bz) == 0 {
		panic("lockable durations not set")
	}

	k.cdc.MustUnmarshal(bz, &info)

	return info.LockableDurations
}
