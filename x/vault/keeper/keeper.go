package keeper

import (
	"fmt"
	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"

	"github.com/tendermint/tendermint/libs/log"

	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.com/joltify/joltifychain/joltifychain/x/vault/types"
	// this line is used by starport scaffolding # ibc/keeper/import
)

type (
	Keeper struct {
		cdc                       codec.Marshaler
		storeKey                  sdk.StoreKey
		memKey                    sdk.StoreKey
		vaultStaking              types.VaultStaking
		validatorStandbyPowerInfo map[string]int64
		bankKeeper                types.BankKeeper
		paramstore                paramtypes.Subspace
		// this line is used by starport scaffolding # ibc/keeper/attribute
	}
)

func NewKeeper(
	cdc codec.Marshaler,
	storeKey,
	memKey sdk.StoreKey,
	vaultStaking types.VaultStaking,
	bankKeeper types.BankKeeper,
	ps paramtypes.Subspace,
	// this line is used by starport scaffolding # ibc/keeper/parameter

) *Keeper {

	// set KeyTable if it has not already been set
	if !ps.HasKeyTable() {
		ps = ps.WithKeyTable(types.ParamKeyTable())
	}

	return &Keeper{
		cdc:                       cdc,
		storeKey:                  storeKey,
		memKey:                    memKey,
		vaultStaking:              vaultStaking,
		validatorStandbyPowerInfo: make(map[string]int64),
		bankKeeper:                bankKeeper,
		paramstore:                ps,
		// this line is used by starport scaffolding # ibc/keeper/return

	}
}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}
