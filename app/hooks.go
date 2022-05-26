package app

import (
	epochtypes "gitlab.com/joltify/joltifychain/x/epochs/types"
	lockuptypes "gitlab.com/joltify/joltifychain/x/lockup/types"
	minttypes "gitlab.com/joltify/joltifychain/x/mint/types"
	swaptypes "gitlab.com/joltify/joltifychain/x/swap/types"
)

func (app *App) setupHooks() {
	app.SwapKeeper.SetHooks(
		swaptypes.NewMultiSwapHooks(
			app.PoolIncentivesKeeper.Hooks(),
		),
	)

	app.LockupKeeper.SetHooks(
		lockuptypes.NewMultiLockupHooks())
	app.MintKeeper.SetHooks(
		minttypes.NewMultiMintHooks(
			app.PoolIncentivesKeeper.Hooks(),
		),
	)

	app.EpochsKeeper.SetHooks(
		epochtypes.NewMultiEpochHooks(
			// insert epoch hooks receivers here
			app.IncentivesKeeper.Hooks(),
			app.MintKeeper.Hooks(),
		),
	)
}
