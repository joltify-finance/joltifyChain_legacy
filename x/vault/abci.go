package vault

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	abci "github.com/tendermint/tendermint/abci/types"
	"gitlab.com/joltify/joltifychain/x/vault/keeper"
	"gitlab.com/joltify/joltifychain/x/vault/types"
)

func BeginBlock(ctx sdk.Context, keeper keeper.Keeper) {
	keeper.StakingInfo(ctx)
}

func EndBlock(ctx sdk.Context, keeper keeper.Keeper) []abci.ValidatorUpdate {
	//we burn the token after the first churn of the network
	if ctx.BlockHeight() >= types.ChurnMinHeight {
		keeper.ProcessAccountLeft(ctx)
	}
	return keeper.NewUpdate(ctx)
}
