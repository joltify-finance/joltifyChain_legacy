package vault_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	keepertest "gitlab.com/joltify/joltifychain/testutil/keeper"
	"gitlab.com/joltify/joltifychain/testutil/nullify"
	"gitlab.com/joltify/joltifychain/x/vault"
	"gitlab.com/joltify/joltifychain/x/vault/types"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		OutboundTxList: []types.OutboundTx{
			{
				Index: "0",
			},
			{
				Index: "1",
			},
		},
		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.SetupVaultKeeper(t)
	vault.InitGenesis(ctx, *k, genesisState)
	got := vault.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	require.ElementsMatch(t, genesisState.OutboundTxList, got.OutboundTxList)
	// this line is used by starport scaffolding # genesis/test/assert
}
