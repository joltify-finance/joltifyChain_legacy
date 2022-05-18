package v3

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	upgradetypes "github.com/cosmos/cosmos-sdk/x/upgrade/types"
	vaultkeeper "gitlab.com/joltify/joltifychain/x/vault/keeper"
)

func CreateUpgradeHandler(
	mm *module.Manager,
	configurator module.Configurator,
	vault *vaultkeeper.Keeper,
) upgradetypes.UpgradeHandler {
	return func(ctx sdk.Context, _plan upgradetypes.Plan, vm module.VersionMap) (module.VersionMap, error) {
		// configure upgrade for x/gamm module pool creation fee param
		fmt.Printf("done upgrade!!!!!!!!!!!1\n")
		return vm, nil
	}
}
