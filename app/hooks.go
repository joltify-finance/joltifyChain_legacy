package app

import (
	epochtypes "gitlab.com/joltify/joltifychain/x/epochs/types"
	lockuptypes "gitlab.com/joltify/joltifychain/x/lockup/types"
	swaptypes "gitlab.com/joltify/joltifychain/x/swap/types"
)

func (app *App) setupHooks() {
	app.SwapKeeper.SetHooks(
		swaptypes.NewMultiSwapHooks(),
	)

	app.EpochsKeeper.SetHooks(
		epochtypes.NewMultiEpochHooks(),
	)
	app.LockupKeeper.SetHooks(
		lockuptypes.NewMultiLockupHooks())
}
