package vault

import (
	"math/rand"

	"github.com/cosmos/cosmos-sdk/baseapp"
	simappparams "github.com/cosmos/cosmos-sdk/simapp/params"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/cosmos/cosmos-sdk/x/simulation"
	"gitlab.com/joltify/joltifychain/testutil/sample"
	vaultsimulation "gitlab.com/joltify/joltifychain/x/vault/simulation"
	"gitlab.com/joltify/joltifychain/x/vault/types"
)

// avoid unused import issue
var (
	_ = sample.AccAddress
	_ = vaultsimulation.FindAccount
	_ = simappparams.StakePerAccount
	_ = simulation.MsgEntryKind
	_ = baseapp.Paramspace
)

const (
	opWeightMsgCreateOutboundTx = "op_weight_msg_create_chain"
	// TODO: Determine the simulation weight value
	defaultWeightMsgCreateOutboundTx int = 100

	opWeightMsgUpdateOutboundTx = "op_weight_msg_create_chain"
	// TODO: Determine the simulation weight value
	defaultWeightMsgUpdateOutboundTx int = 100

	opWeightMsgDeleteOutboundTx = "op_weight_msg_create_chain"
	// TODO: Determine the simulation weight value
	defaultWeightMsgDeleteOutboundTx int = 100

	// this line is used by starport scaffolding # simapp/module/const
)

// GenerateGenesisState creates a randomized GenState of the module
func (AppModule) GenerateGenesisState(simState *module.SimulationState) {
	accs := make([]string, len(simState.Accounts))
	for i, acc := range simState.Accounts {
		accs[i] = acc.Address.String()
	}

	s1, err := sdk.AccAddressFromBech32(sample.AccAddress())
	if err != nil {
		panic(err)
	}

	s2, err := sdk.AccAddressFromBech32(sample.AccAddress())
	if err != nil {
		panic(err)
	}

	ss1 := make(map[string]types.Address)
	a1 := types.Address{Address: []sdk.AccAddress{s1}}
	ss1["00"] = a1

	ss2 := make(map[string]types.Address)
	a2 := types.Address{Address: []sdk.AccAddress{s2}}
	ss2["11"] = a2

	vaultGenesis := types.GenesisState{
		OutboundTxList: []types.OutboundTx{
			{
				Index: "0",
				Items: ss1,
			},
			{
				Index: "1",
				Items: ss2,
			},
		},
		// this line is used by starport scaffolding # simapp/module/genesisState
	}
	simState.GenState[types.ModuleName] = simState.Cdc.MustMarshalJSON(&vaultGenesis)
}

// ProposalContents doesn't return any content functions for governance proposals
func (AppModule) ProposalContents(_ module.SimulationState) []simtypes.WeightedProposalContent {
	return nil
}

// RandomizedParams creates randomized  param changes for the simulator
func (am AppModule) RandomizedParams(_ *rand.Rand) []simtypes.ParamChange {

	return []simtypes.ParamChange{}
}

// RegisterStoreDecoder registers a decoder
func (am AppModule) RegisterStoreDecoder(_ sdk.StoreDecoderRegistry) {}

// WeightedOperations returns the all the gov module operations with their respective weights.
func (am AppModule) WeightedOperations(simState module.SimulationState) []simtypes.WeightedOperation {
	operations := make([]simtypes.WeightedOperation, 0)

	var weightMsgCreateOutboundTx int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgCreateOutboundTx, &weightMsgCreateOutboundTx, nil,
		func(_ *rand.Rand) {
			weightMsgCreateOutboundTx = defaultWeightMsgCreateOutboundTx
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgCreateOutboundTx,
		vaultsimulation.SimulateMsgCreateOutboundTx(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgUpdateOutboundTx int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgUpdateOutboundTx, &weightMsgUpdateOutboundTx, nil,
		func(_ *rand.Rand) {
			weightMsgUpdateOutboundTx = defaultWeightMsgUpdateOutboundTx
		},
	)

	var weightMsgDeleteOutboundTx int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgDeleteOutboundTx, &weightMsgDeleteOutboundTx, nil,
		func(_ *rand.Rand) {
			weightMsgDeleteOutboundTx = defaultWeightMsgDeleteOutboundTx
		},
	)

	// this line is used by starport scaffolding # simapp/module/operation

	return operations
}
