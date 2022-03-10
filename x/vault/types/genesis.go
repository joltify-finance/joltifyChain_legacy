package types

import (
	"fmt"
	// this line is used by starport scaffolding # ibc/genesistype/import
)

// DefaultIndex is the default capability global index
const DefaultIndex uint64 = 1

// DefaultGenesis returns the default Capability genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		// this line is used by starport scaffolding # ibc/genesistype/default
		OutboundTxList: []OutboundTx{},
		// this line is used by starport scaffolding # genesis/types/default
		IssueTokenList: []*IssueToken{},
		CreatePoolList: []*CreatePool{},
		Params:         DefaultParams(),
	}
}

// Validate performs basic genesis state validation returning an error upon any
// failure.
func (gs GenesisState) Validate() error {
	// this line is used by starport scaffolding # ibc/genesistype/validate

	// Check for duplicated index in outboundTx
	outboundTxIndexMap := make(map[string]struct{})

	for _, elem := range gs.OutboundTxList {
		index := string(OutboundTxKey(elem.Index))
		if _, ok := outboundTxIndexMap[index]; ok {
			return fmt.Errorf("duplicated index for outboundTx")
		}
		outboundTxIndexMap[index] = struct{}{}
	}
	// this line is used by starport scaffolding # genesis/types/validate
	// Check for duplicated index in issueToken
	issueTokenIndexMap := make(map[string]bool)

	for _, elem := range gs.IssueTokenList {
		if _, ok := issueTokenIndexMap[elem.Index]; ok {
			return fmt.Errorf("duplicated index for issueToken")
		}
		issueTokenIndexMap[elem.Index] = true
	}
	// Check for duplicated index in createPool
	createPoolIndexMap := make(map[string]bool)

	for _, elem := range gs.CreatePoolList {
		if _, ok := createPoolIndexMap[elem.BlockHeight]; ok {
			return fmt.Errorf("duplicated index for createPool")
		}
		createPoolIndexMap[elem.BlockHeight] = true
	}

	return nil
}
