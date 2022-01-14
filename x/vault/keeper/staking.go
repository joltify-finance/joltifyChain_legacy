package keeper

import (
	"bytes"
	"fmt"
	"sort"
	"time"

	"github.com/cosmos/cosmos-sdk/telemetry"
	costypes "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/distribution/types"
	vaultmoduletypes "gitlab.com/joltify/joltifychain/x/vault/types"

	gogotypes "github.com/gogo/protobuf/types"

	abci "github.com/tendermint/tendermint/abci/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
)

func (k Keeper) StakingInfo(ctx sdk.Context) {
	stakingKeeper := k.vaultStaking
	params := k.GetParams(ctx)

	stakingKeeper.IterateLastValidators(ctx, func(index int64, validator stakingtypes.ValidatorI) (stop bool) {
		consAddr, err := validator.GetConsAddr()
		if err != nil {
			panic("get cons should never fail")
		}
		_, ok := k.validatorStandbyPowerInfo[consAddr.String()]
		if !ok {
			k.validatorStandbyPowerInfo[consAddr.String()] = params.Power
			return false
		}
		k.validatorStandbyPowerInfo[consAddr.String()] -= params.Step
		return false
	})
}

func (k Keeper) getLastValidatorByAddr(ctx sdk.Context) (vaultmoduletypes.ValidatorsByAddr, error) {
	last := make(vaultmoduletypes.ValidatorsByAddr)

	iterator := k.vaultStaking.LastValidatorsIterator(ctx)
	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		// extract the validator address from the key (prefix is 1-byte, addrLen is 1-byte)
		valAddr := stakingtypes.AddressFromLastValidatorPowerKey(iterator.Key())
		valAddrStr, err := sdk.Bech32ifyAddressBytes(sdk.GetConfig().GetBech32ValidatorAddrPrefix(), valAddr)
		if err != nil {
			return nil, err
		}

		powerBytes := iterator.Value()
		last[valAddrStr] = make([]byte, len(powerBytes))
		copy(last[valAddrStr], powerBytes)
	}

	return last, nil
}

func (k Keeper) GetEligibleValidators(ctx sdk.Context) (stakingtypes.Validators, error) {
	params := k.GetParams(ctx)

	maxValidators := k.vaultStaking.GetParams(ctx).MaxValidators
	var candidates []vaultmoduletypes.ValidatorPowerInfo
	iterator := k.vaultStaking.ValidatorsPowerStoreIterator(ctx)

	candidateDec := sdk.NewDecWithPrec(int64(maxValidators), 0)
	candidateNumDec := candidateDec.QuoRoundUp(params.CandidateRatio)

	candidateNum := int32(candidateNumDec.RoundInt64())

	totalPower := int64(0)
	for count := int32(0); iterator.Valid() && count < candidateNum; iterator.Next() {
		valAddr := sdk.ValAddress(iterator.Value())
		validator, found := k.vaultStaking.GetValidator(ctx, valAddr)
		if !found {
			panic(fmt.Sprintf("validator record not found for address: %X\n", valAddr))
		}
		validatorWithPower := vaultmoduletypes.ValidatorPowerInfo{
			Validator: validator,
			Power:     validator.PotentialConsensusPower(sdk.DefaultPowerReduction),
		}
		candidates = append(candidates, validatorWithPower)
		power := validator.PotentialConsensusPower(sdk.DefaultPowerReduction)
		totalPower += power
		count += 1
	}
	// we get rotate the nodes
	for i := 0; i < len(candidates); i++ {
		consAddr, err := candidates[i].Validator.GetConsAddr()
		if err != nil {
			panic("it should never fail to get the cons addr")
		}
		standbyPower, ok := k.validatorStandbyPowerInfo[consAddr.String()]
		if !ok {
			k.validatorStandbyPowerInfo[consAddr.String()] = params.GetPower()
			standbyPower = params.GetPower()
		}
		candidates[i].Power = candidates[i].Power + standbyPower
	}
	sort.Slice(candidates, func(i, j int) bool {
		return candidates[i].Power > candidates[j].Power
	})

	retValidators := make([]stakingtypes.Validator, maxValidators)
	for i := 0; i < len(retValidators); i++ {
		retValidators[i] = candidates[i].Validator
	}

	return retValidators, nil
}

func (k Keeper) ApplyAndReturnValidatorSetUpdates(ctx sdk.Context) (updates []abci.ValidatorUpdate, err error) {
	maxValidators := k.vaultStaking.GetParams(ctx).MaxValidators
	_ = maxValidators
	totalPower := sdk.ZeroInt()
	amtFromBondedToNotBonded, amtFromNotBondedToBonded := sdk.ZeroInt(), sdk.ZeroInt()

	// Retrieve the last validator set.
	// The persistent set is updated later in this function.
	// (see LastValidatorPowerKey).
	last, err := k.getLastValidatorByAddr(ctx)
	if err != nil {
		return nil, err
	}

	// Iterate over validators, and get the power of the nodes.
	allValidators, err := k.GetEligibleValidators(ctx)
	if err != nil {
		return nil, err
	}

	for _, validator := range allValidators {
		// everything that is iterated in this loop is becoming or already a
		// part of the bonded validator set

		if validator.Jailed {
			panic("should never retrieve a jailed validator from the power store")
		}

		// if we get to a zero-power validator (which we don't bond),
		// there are no more possible bonded validators
		if validator.PotentialConsensusPower(sdk.DefaultPowerReduction) == 0 {
			break
		}

		// apply the appropriate state change if necessary
		switch {
		case validator.IsUnbonded():
			validator, err = k.unbondedToBonded(ctx, validator)
			if err != nil {
				return
			}
			amtFromNotBondedToBonded = amtFromNotBondedToBonded.Add(validator.GetTokens())
		case validator.IsUnbonding():
			validator, err = k.unbondingToBonded(ctx, validator)
			if err != nil {
				return
			}
			amtFromNotBondedToBonded = amtFromNotBondedToBonded.Add(validator.GetTokens())
		case validator.IsBonded():
			// no state change
		default:
			panic("unexpected validator status")
		}

		// fetch the old power bytes
		valAddr, err := sdk.ValAddressFromBech32(validator.OperatorAddress)
		if err != nil {
			panic("the validator Operator address should never fail")
		}

		oldPowerBytes, found := last[validator.OperatorAddress]
		newPower := validator.ConsensusPower(sdk.DefaultPowerReduction)
		newPowerBytes := k.cdc.MustMarshal(&gogotypes.Int64Value{Value: newPower})

		// update the validator set if power has changed
		if !found || !bytes.Equal(oldPowerBytes, newPowerBytes) {
			updates = append(updates, validator.ABCIValidatorUpdate(sdk.DefaultPowerReduction))
			k.vaultStaking.SetLastValidatorPower(ctx, valAddr, newPower)
		}

		delete(last, validator.OperatorAddress)

		totalPower = totalPower.Add(sdk.NewInt(newPower))
	}

	noLongerBonded, err := sortNoLongerBonded(last)
	if err != nil {
		return nil, err
	}
	for _, valAddrBytes := range noLongerBonded {
		validator := k.mustGetValidator(ctx, sdk.ValAddress(valAddrBytes))
		consAddr, errCons := validator.GetConsAddr()
		if errCons != nil {
			panic("should not fail to get the cons address")
		}
		delete(k.validatorStandbyPowerInfo, consAddr.String())
		validator, err = k.bondedToUnbonding(ctx, validator)
		if err != nil {
			return
		}
		amtFromBondedToNotBonded = amtFromBondedToNotBonded.Add(validator.GetTokens())
		k.vaultStaking.DeleteLastValidatorPower(ctx, validator.GetOperator())
		updates = append(updates, validator.ABCIValidatorUpdateZero())
	}

	// Update the pools based on the recent updates in the validator set:
	// - The tokens from the non-bonded candidates that enter the new validator set need to be transferred
	// to the Bonded pool.
	// - The tokens from the bonded validators that are being kicked out from the validator set
	// need to be transferred to the NotBonded pool.
	switch {
	// Compare and subtract the respective amounts to only perform one transfer.
	// This is done in order to avoid doing multiple updates inside each iterator/loop.
	case amtFromNotBondedToBonded.GT(amtFromBondedToNotBonded):
		k.notBondedTokensToBonded(ctx, amtFromNotBondedToBonded.Sub(amtFromBondedToNotBonded))
	case amtFromNotBondedToBonded.LT(amtFromBondedToNotBonded):
		k.bondedTokensToNotBonded(ctx, amtFromBondedToNotBonded.Sub(amtFromNotBondedToBonded))
	default: // equal amounts of tokens; no update required
	}

	// set total power on lookup index if there are any updates
	if len(updates) > 0 {
		k.vaultStaking.SetLastTotalPower(ctx, totalPower)
	}

	return updates, err
}

func (k Keeper) BlockValidatorUpdates(ctx sdk.Context) []abci.ValidatorUpdate {
	validatorUpdates, err := k.ApplyAndReturnValidatorSetUpdates(ctx)
	if err != nil {
		panic(err)
	}

	// unbond all mature validators from the unbonding queue
	k.vaultStaking.UnbondAllMatureValidators(ctx)

	// Remove all mature unbonding delegations from the ubd queue.
	matureUnbonds := k.vaultStaking.DequeueAllMatureUBDQueue(ctx, ctx.BlockHeader().Time)
	for _, dvPair := range matureUnbonds {
		addr, err := sdk.ValAddressFromBech32(dvPair.ValidatorAddress)
		if err != nil {
			panic(err)
		}
		delegatorAddress, err := sdk.AccAddressFromBech32(dvPair.DelegatorAddress)
		if err != nil {
			panic(err)
		}
		balances, err := k.vaultStaking.CompleteUnbonding(ctx, delegatorAddress, addr)
		if err != nil {
			continue
		}

		newEvent := sdk.NewEvent(
			stakingtypes.EventTypeCompleteUnbonding,
			sdk.NewAttribute(sdk.AttributeKeyAmount, balances.String()),
			sdk.NewAttribute(types.AttributeKeyValidator, dvPair.ValidatorAddress),
			sdk.NewAttribute(stakingtypes.AttributeKeyDelegator, dvPair.DelegatorAddress),
		)

		typedEvent, err := costypes.ParseTypedEvent(abci.Event(newEvent))
		if err != nil {
			k.Logger(ctx).Error("fail to parse the event")
		}
		ctx.EventManager().EmitTypedEvent(typedEvent)
	}

	// Remove all mature redelegations from the red queue.
	matureRedelegations := k.vaultStaking.DequeueAllMatureRedelegationQueue(ctx, ctx.BlockHeader().Time)
	for _, dvvTriplet := range matureRedelegations {
		valSrcAddr, err := sdk.ValAddressFromBech32(dvvTriplet.ValidatorSrcAddress)
		if err != nil {
			panic(err)
		}
		valDstAddr, err := sdk.ValAddressFromBech32(dvvTriplet.ValidatorDstAddress)
		if err != nil {
			panic(err)
		}
		delegatorAddress, err := sdk.AccAddressFromBech32(dvvTriplet.DelegatorAddress)
		if err != nil {
			panic(err)
		}
		balances, err := k.vaultStaking.CompleteRedelegation(
			ctx,
			delegatorAddress,
			valSrcAddr,
			valDstAddr,
		)
		if err != nil {
			continue
		}

		newEvent := sdk.NewEvent(
			stakingtypes.EventTypeCompleteRedelegation,
			sdk.NewAttribute(sdk.AttributeKeyAmount, balances.String()),
			sdk.NewAttribute(stakingtypes.AttributeKeyDelegator, dvvTriplet.DelegatorAddress),
			sdk.NewAttribute(stakingtypes.AttributeKeySrcValidator, dvvTriplet.ValidatorSrcAddress),
			sdk.NewAttribute(stakingtypes.AttributeKeyDstValidator, dvvTriplet.ValidatorDstAddress),
		)

		typedEvent, err := costypes.ParseTypedEvent(abci.Event(newEvent))
		if err != nil {
			k.Logger(ctx).Error("fail to parse the event")
		}
		ctx.EventManager().EmitTypedEvent(typedEvent)
	}

	return validatorUpdates
}

func (k Keeper) NewUpdate(ctx sdk.Context) []abci.ValidatorUpdate {
	defer telemetry.ModuleMeasureSince(vaultmoduletypes.ModuleName, time.Now(), telemetry.MetricKeyEndBlocker)

	// blockHeight := k.GetParams(ctx).BlockChurnInterval
	// if ctx.BlockHeight() > 1 && ctx.BlockHeight()%blockHeight == 0 {
	if ctx.BlockHeight() == 10 || ctx.BlockHeight() == 20 {
		return k.BlockValidatorUpdates(ctx)
	}
	return []abci.ValidatorUpdate{}
}
