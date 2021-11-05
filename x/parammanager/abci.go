package parammanager

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	minttypes "github.com/cosmos/cosmos-sdk/x/mint/types"
	"gitlab.com/joltify/joltifychain/joltifychain/x/parammanager/types"
	"strconv"
)

// BeginBlocker all the invoice module related begin block should be here
func updateMintParams(ctx sdk.Context, k types.MintKeeper, newMintParams types.MintParams) error {

	currentParams := k.GetParams(ctx)
	inflationRateChange, err := sdk.NewDecFromStr(newMintParams.Params.InflationRateChange)
	if err != nil {
		return err
	}

	inflationMax, err := sdk.NewDecFromStr(newMintParams.Params.InflationMax)
	if err != nil {
		return err
	}

	inflationMin, err := sdk.NewDecFromStr(newMintParams.Params.InflationMin)
	if err != nil {
		return err
	}

	goalBounded, err := sdk.NewDecFromStr(newMintParams.Params.GoalBonded)
	if err != nil {
		return err
	}
	blocksPerYear, err := strconv.ParseUint(newMintParams.Params.BlocksPerYear, 10, 64)
	if err != nil {
		return err
	}
	newParams := minttypes.NewParams(currentParams.MintDenom, inflationRateChange, inflationMax, inflationMin, goalBounded, blocksPerYear)
	k.SetParams(ctx, newParams)
	return nil
}
