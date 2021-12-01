package vault

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.com/joltify/joltifychain/x/vault/keeper"
	"gitlab.com/joltify/joltifychain/x/vault/types"
)

// InitGenesis initializes the capability module's state from a provided genesis
// state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	// this line is used by starport scaffolding # genesis/module/init
	// Set all the issueToken
	for _, elem := range genState.IssueTokenList {
		k.SetIssueToken(ctx, *elem)
	}

	// Set all the createPool
	for _, elem := range genState.CreatePoolList {
		k.SetCreatePool(ctx, *elem)
	}

	k.SetParams(ctx, genState.Params)

	// this line is used by starport scaffolding # ibc/genesis/init
}

// ExportGenesis returns the capability module's exported genesis.
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()

	// this line is used by starport scaffolding # genesis/module/export
	// Get all issueToken
	issueTokenList := k.GetAllIssueToken(ctx)
	for _, elem := range issueTokenList {
		elem := elem
		genesis.IssueTokenList = append(genesis.IssueTokenList, &elem)
	}

	// Get all createPool
	createPoolList := k.GetAllCreatePool(ctx)
	for _, elem := range createPoolList {
		elem := elem
		genesis.CreatePoolList = append(genesis.CreatePoolList, &elem)
	}

	// this line is used by starport scaffolding # ibc/genesis/export

	return genesis
}
