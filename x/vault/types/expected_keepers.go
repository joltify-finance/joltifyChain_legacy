package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
)

type VaultStaking interface {
	IterateLastValidators(sdk.Context, func(index int64, validator stakingtypes.ValidatorI) (stop bool))

	ValidatorsPowerStoreIterator(ctx sdk.Context) sdk.Iterator

	GetParams(ctx sdk.Context) stakingtypes.Params

	LastValidatorsIterator(ctx sdk.Context) (iterator sdk.Iterator)

	GetValidator(ctx sdk.Context, addr sdk.ValAddress) (validator stakingtypes.Validator, found bool)
}
