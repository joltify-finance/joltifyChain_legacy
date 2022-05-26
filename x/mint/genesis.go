package mint

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.com/joltify/joltifychain/x/mint/keeper"
	"gitlab.com/joltify/joltifychain/x/mint/types"
)

// InitGenesis new mint genesis
func InitGenesis(ctx sdk.Context, keeper keeper.Keeper, ak types.AccountKeeper, bk types.BankKeeper, data *types.GenesisState) {
	data.Minter.EpochProvisions = data.Params.GenesisEpochProvisions
	keeper.SetMinter(ctx, data.Minter)
	keeper.SetParams(ctx, data.Params)

	//it will create the module account if not exist
	if !ak.HasAccount(ctx, ak.GetModuleAddress(types.ModuleName)) {
		ak.GetModuleAccount(ctx, types.ModuleName)
	}

	keeper.SetLastHalvenEpochNum(ctx, data.HalvenStartedEpoch)
}

// ExportGenesis returns a GenesisState for a given context and keeper.
func ExportGenesis(ctx sdk.Context, keeper keeper.Keeper) *types.GenesisState {
	minter := keeper.GetMinter(ctx)
	params := keeper.GetParams(ctx)
	lastHalvenEpoch := keeper.GetLastHalvenEpochNum(ctx)
	return types.NewGenesisState(minter, params, lastHalvenEpoch)
}
