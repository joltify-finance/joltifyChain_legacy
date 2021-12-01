package keeper

import (
	"bytes"
	"fmt"
	"sort"

	sdk "github.com/cosmos/cosmos-sdk/types"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
	vaultmoduletypes "gitlab.com/joltify/joltifychain/x/vault/types"
)

func (k Keeper) unbondedToBonded(ctx sdk.Context, validator stakingtypes.Validator) (stakingtypes.Validator, error) {
	if !validator.IsUnbonded() {
		panic(fmt.Sprintf("bad state transition unbondedToBonded, validator: %v\n", validator))
	}

	return k.bondValidator(ctx, validator)
}

// perform all the store operations for when a validator status becomes bonded
func (k Keeper) bondValidator(ctx sdk.Context, validator stakingtypes.Validator) (stakingtypes.Validator, error) {
	// delete the validator by power index, as the key will change
	k.vaultStaking.DeleteValidatorByPowerIndex(ctx, validator)

	validator = validator.UpdateStatus(stakingtypes.Bonded)

	// save the now bonded validator record to the two referenced stores
	k.vaultStaking.SetValidator(ctx, validator)
	k.vaultStaking.SetValidatorByPowerIndex(ctx, validator)

	// delete from queue if present
	k.vaultStaking.DeleteValidatorQueue(ctx, validator)

	// trigger hook
	consAddr, err := validator.GetConsAddr()
	if err != nil {
		return validator, err
	}
	k.vaultStaking.AfterValidatorBonded(ctx, consAddr, validator.GetOperator())

	return validator, err
}

func (k Keeper) unbondingToBonded(ctx sdk.Context, validator stakingtypes.Validator) (stakingtypes.Validator, error) {
	if !validator.IsUnbonding() {
		panic(fmt.Sprintf("bad state transition unbondingToBonded, validator: %v\n", validator))
	}

	return k.bondValidator(ctx, validator)
}

// given a map of remaining validators to previous bonded power
// returns the list of validators to be unbonded, sorted by operator address
func sortNoLongerBonded(last vaultmoduletypes.ValidatorsByAddr) ([][]byte, error) {
	// sort the map keys for determinism
	noLongerBonded := make([][]byte, len(last))
	index := 0

	for valAddrStr := range last {
		valAddrBytes, err := sdk.ValAddressFromBech32(valAddrStr)
		if err != nil {
			return nil, err
		}
		noLongerBonded[index] = valAddrBytes
		index++
	}
	// sorted by address - order doesn't matter
	sort.SliceStable(noLongerBonded, func(i, j int) bool {
		// -1 means strictly less than
		return bytes.Compare(noLongerBonded[i], noLongerBonded[j]) == -1
	})

	return noLongerBonded, nil
}

func (k Keeper) mustGetValidator(ctx sdk.Context, addr sdk.ValAddress) stakingtypes.Validator {
	validator, found := k.vaultStaking.GetValidator(ctx, addr)
	if !found {
		panic(fmt.Sprintf("validator record not found for address: %X\n", addr))
	}

	return validator
}

// AfterValidatorBeginUnbonding - call hook if registered
func (k Keeper) AfterValidatorBeginUnbonding(ctx sdk.Context, consAddr sdk.ConsAddress, valAddr sdk.ValAddress) error {
	//fixme we will add hooks later on
	//if k.hooks != nil {
	//	return k.hooks.AfterValidatorBeginUnbonding(ctx, consAddr, valAddr)
	//}
	return nil
}

// perform all the store operations for when a validator begins unbonding
func (k Keeper) beginUnbondingValidator(ctx sdk.Context, validator stakingtypes.Validator) (stakingtypes.Validator, error) {
	params := k.vaultStaking.GetParams(ctx)

	// delete the validator by power index, as the key will change
	k.vaultStaking.DeleteValidatorByPowerIndex(ctx, validator)

	// sanity check
	if validator.Status != stakingtypes.Bonded {
		panic(fmt.Sprintf("should not already be unbonded or unbonding, validator: %v\n", validator))
	}

	validator = validator.UpdateStatus(stakingtypes.Unbonding)

	// set the unbonding completion time and completion height appropriately
	validator.UnbondingTime = ctx.BlockHeader().Time.Add(params.UnbondingTime)
	validator.UnbondingHeight = ctx.BlockHeader().Height

	// save the now unbonded validator record and power index
	k.vaultStaking.SetValidator(ctx, validator)
	k.vaultStaking.SetValidatorByPowerIndex(ctx, validator)

	// Adds to unbonding validator queue
	k.vaultStaking.InsertUnbondingValidatorQueue(ctx, validator)

	// trigger hook
	consAddr, err := validator.GetConsAddr()
	if err != nil {
		return validator, err
	}
	k.AfterValidatorBeginUnbonding(ctx, consAddr, validator.GetOperator())

	return validator, nil
}

func (k Keeper) bondedToUnbonding(ctx sdk.Context, validator stakingtypes.Validator) (stakingtypes.Validator, error) {
	if !validator.IsBonded() {
		panic(fmt.Sprintf("bad state transition bondedToUnbonding, validator: %v\n", validator))
	}

	return k.beginUnbondingValidator(ctx, validator)
}

// notBondedTokensToBonded transfers coins from the not bonded to the bonded pool within staking
func (k Keeper) notBondedTokensToBonded(ctx sdk.Context, tokens sdk.Int) {
	coins := sdk.NewCoins(sdk.NewCoin(k.vaultStaking.BondDenom(ctx), tokens))
	if err := k.bankKeeper.SendCoinsFromModuleToModule(ctx, stakingtypes.NotBondedPoolName, stakingtypes.BondedPoolName, coins); err != nil {
		panic(err)
	}
}

// bondedTokensToNotBonded transfers coins from the bonded to the not bonded pool within staking
func (k Keeper) bondedTokensToNotBonded(ctx sdk.Context, tokens sdk.Int) {
	coins := sdk.NewCoins(sdk.NewCoin(k.vaultStaking.BondDenom(ctx), tokens))
	if err := k.bankKeeper.SendCoinsFromModuleToModule(ctx, stakingtypes.BondedPoolName, stakingtypes.NotBondedPoolName, coins); err != nil {
		panic(err)
	}
}
