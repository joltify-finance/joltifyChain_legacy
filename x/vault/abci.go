package vault

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	abci "github.com/tendermint/tendermint/abci/types"
	"gitlab.com/joltify/joltifychain/x/vault/keeper"
)

func BeginBlock(ctx sdk.Context, keeper keeper.Keeper) {
	keeper.StakingInfo(ctx)
}

func EndBlock(ctx sdk.Context, keeper keeper.Keeper) []abci.ValidatorUpdate {
	//we burn the token after the first churn of the network
	keeper.ProcessAccountLeft(ctx)

	return keeper.NewUpdate(ctx)
}
