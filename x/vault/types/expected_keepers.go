package types

import (
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
	abci "github.com/tendermint/tendermint/abci/types"
)

type VaultStaking interface {
	IterateBondedValidatorsByPower(sdk.Context, func(index int64, validator stakingtypes.ValidatorI) (stop bool))

	// IterateLastValidators iterate through the consensus validator set of the last block by operator address, execute func for each validator
	IterateLastValidators(sdk.Context, func(index int64, validator stakingtypes.ValidatorI) (stop bool))

	// IterateValidators iterate through validators by operator address, execute func for each validator
	IterateValidators(sdk.Context, func(index int64, validator stakingtypes.ValidatorI) (stop bool))

	ValidatorsPowerStoreIterator(ctx sdk.Context) sdk.Iterator

	SetLastValidatorPower(ctx sdk.Context, operator sdk.ValAddress, power int64)

	// update the block updates
	BlockValidatorUpdates(ctx sdk.Context) []abci.ValidatorUpdate

	// UnbondAllMatureValidators unbonds all the mature unbonding validators that
	// have finished their unbonding period.
	UnbondAllMatureValidators(ctx sdk.Context)

	DequeueAllMatureUBDQueue(ctx sdk.Context, currTime time.Time) (matureUnbonds []stakingtypes.DVPair)

	CompleteUnbonding(ctx sdk.Context, delAddr sdk.AccAddress, valAddr sdk.ValAddress) (sdk.Coins, error)

	DequeueAllMatureRedelegationQueue(ctx sdk.Context, currTime time.Time) (matureRedelegations []stakingtypes.DVVTriplet)

	CompleteRedelegation(ctx sdk.Context, delAddr sdk.AccAddress, valSrcAddr, valDstAddr sdk.ValAddress) (sdk.Coins, error)

	GetParams(ctx sdk.Context) stakingtypes.Params
	LastValidatorsIterator(ctx sdk.Context) (iterator sdk.Iterator)

	DeleteValidatorByPowerIndex(ctx sdk.Context, validator stakingtypes.Validator)

	SetValidator(ctx sdk.Context, validator stakingtypes.Validator)
	SetValidatorByPowerIndex(ctx sdk.Context, validator stakingtypes.Validator)
	DeleteValidatorQueue(ctx sdk.Context, val stakingtypes.Validator)
	AfterValidatorBonded(ctx sdk.Context, consAddr sdk.ConsAddress, valAddr sdk.ValAddress)
	GetValidator(ctx sdk.Context, addr sdk.ValAddress) (validator stakingtypes.Validator, found bool)
	InsertUnbondingValidatorQueue(ctx sdk.Context, val stakingtypes.Validator)
	DeleteLastValidatorPower(ctx sdk.Context, operator sdk.ValAddress)

	SetLastTotalPower(ctx sdk.Context, power sdk.Int)

	BondDenom(ctx sdk.Context) (res string)

	GetHistoricalInfo(ctx sdk.Context, height int64) (stakingtypes.HistoricalInfo, bool)
}

// BankKeeper Methods imported from bank should be defined here
type BankKeeper interface {
	SendCoinsFromModuleToModule(
		ctx sdk.Context, senderModule, recipientModule string, amt sdk.Coins,
	) error

	MintCoins(ctx sdk.Context, moduleName string, amt sdk.Coins) error

	SendCoinsFromModuleToAccount(ctx sdk.Context, senderModule string, recipientAddr sdk.AccAddress, amt sdk.Coins) error
}
