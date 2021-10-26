package vault

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/joltify/joltifyChain/x/vault/keeper"
	abci "github.com/tendermint/tendermint/abci/types"
)

func BeginBlock(ctx sdk.Context, keeper keeper.Keeper) {
	keeper.StakingInfo(ctx)
}

func EndBlock(ctx sdk.Context, keeper keeper.Keeper) []abci.ValidatorUpdate {
	return keeper.NewUpdate(ctx)
}
