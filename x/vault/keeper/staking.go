package keeper

import (
	"fmt"
	"sort"
	"strconv"
	"time"

	"github.com/cosmos/cosmos-sdk/telemetry"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
	abci "github.com/tendermint/tendermint/abci/types"

	vaulttypes "gitlab.com/joltify/joltifychain/x/vault/types"
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
		current := k.validatorStandbyPowerInfo[consAddr.String()]
		if current < 0 {
			delete(k.validatorStandbyPowerInfo, consAddr.String())
			return false
		}
		k.validatorStandbyPowerInfo[consAddr.String()] = current - params.Step
		return false
	})
}

func (k Keeper) getEligibleValidators(ctx sdk.Context) ([]vaulttypes.ValidatorPowerInfo, error) {
	params := k.GetParams(ctx)

	maxValidators := k.vaultStaking.GetParams(ctx).MaxValidators
	var candidates []vaulttypes.ValidatorPowerInfo
	iterator := k.vaultStaking.ValidatorsPowerStoreIterator(ctx)

	candidateDec := sdk.NewDecWithPrec(int64(maxValidators), 0)
	candidateNumDec := candidateDec.QuoRoundUp(params.CandidateRatio)

	candidateNum := int32(candidateNumDec.RoundInt64())

	for count := int32(0); iterator.Valid() && count < candidateNum; iterator.Next() {
		valAddr := sdk.ValAddress(iterator.Value())
		validator, found := k.vaultStaking.GetValidator(ctx, valAddr)
		if !found {
			panic(fmt.Sprintf("validator record not found for address: %X\n", valAddr))
		}
		// if it is not the bonded node, we skip it.
		if validator.Jailed || validator.GetStatus() != stakingtypes.Bonded {
			continue
		}
		validatorWithPower := vaulttypes.ValidatorPowerInfo{
			Validator: validator,
			Power:     validator.PotentialConsensusPower(sdk.DefaultPowerReduction),
		}
		candidates = append(candidates, validatorWithPower)
		count++
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
		candidates[i].Power += standbyPower
	}
	sort.Slice(candidates, func(i, j int) bool {
		return candidates[i].Power > candidates[j].Power
	})
	return candidates, nil
}

func (k Keeper) updateValidators(ctx sdk.Context) error {
	vs, err := k.getEligibleValidators(ctx)
	if err != nil {
		return sdkerrors.Wrap(vaulttypes.ErrFormat, "fail to convert the format")
	}

	stakingValidators := make([]*vaulttypes.Validator, len(vs))

	for i, el := range vs {
		key, err := el.Validator.ConsPubKey()
		if err != nil {
			return sdkerrors.Wrap(vaulttypes.ErrFormat, "fail to convert the format")
		}
		v := vaulttypes.Validator{
			Pubkey: key.Bytes(),
			Power:  el.Power,
		}
		stakingValidators[i] = &v
	}

	v := vaulttypes.Validators{
		AllValidators: stakingValidators,
		Height:        ctx.BlockHeight(),
	}
	k.SetValidators(ctx, strconv.FormatInt(ctx.BlockHeight(), 10), v)
	return nil
}

func (k Keeper) NewUpdate(ctx sdk.Context) []abci.ValidatorUpdate {
	defer telemetry.ModuleMeasureSince(vaulttypes.ModuleName, time.Now(), telemetry.MetricKeyEndBlocker)

	// blockHeight := k.GetParams(ctx).BlockChurnInterval
	// if ctx.BlockHeight() > 10 && ctx.BlockHeight()%blockHeight == 0 {
	if ctx.BlockHeight() == 20 || ctx.BlockHeight() == 40 || ctx.BlockHeight() == 60 {
		ctx.EventManager().EmitEvents(sdk.Events{
			sdk.NewEvent(
				vaulttypes.EventTypeCompleteChurn,
				sdk.NewAttribute(vaulttypes.AttributeValidators, "joltify_churn"),
			),
		})
		err := k.updateValidators(ctx)
		if err != nil {
			ctx.Logger().Error("error in update the validator with err %v", err)
		}
	}
	return []abci.ValidatorUpdate{}
}
