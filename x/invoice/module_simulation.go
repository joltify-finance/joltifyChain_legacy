package invoice

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	"github.com/cosmos/cosmos-sdk/types/simulation"
	"math/rand"
)

func (am AppModule) GenerateGenesisState(input *module.SimulationState) {
	//TODO implement me
	panic("implement me")
}

func (am AppModule) ProposalContents(simState module.SimulationState) []simulation.WeightedProposalContent {
	return nil
}

func (am AppModule) RandomizedParams(_ *rand.Rand) []simulation.ParamChange {
	return []simulation.ParamChange{}
}

func (am AppModule) RegisterStoreDecoder(registry sdk.StoreDecoderRegistry) {
	//TODO implement me
	panic("implement me")
}

func (am AppModule) WeightedOperations(simState module.SimulationState) []simulation.WeightedOperation {
	//TODO implement me
	panic("implement me")
}
