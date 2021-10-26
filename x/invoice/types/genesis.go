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
		// this line is used by starport scaffolding # genesis/types/default
		PlaceOrderList: []*PlaceOrder{},
		SellOrderList:  []*SellOrder{},
		InvoiceList:    []*Invoice{},
	}
}

// Validate performs basic genesis state validation returning an error upon any
// failure.
func (gs GenesisState) Validate() error {
	// this line is used by starport scaffolding # ibc/genesistype/validate

	// this line is used by starport scaffolding # genesis/types/validate
	// Check for duplicated index in placeOrder
	placeOrderIndexMap := make(map[string]bool)

	for _, elem := range gs.PlaceOrderList {
		if _, ok := placeOrderIndexMap[elem.PlaceOrderIndex]; ok {
			return fmt.Errorf("duplicated index for placeOrder")
		}
		placeOrderIndexMap[elem.PlaceOrderIndex] = true
	}
	// Check for duplicated index in sellOrder
	sellOrderIndexMap := make(map[string]bool)

	for _, elem := range gs.SellOrderList {
		if _, ok := sellOrderIndexMap[elem.SellOrderID]; ok {
			return fmt.Errorf("duplicated index for sellOrder")
		}
		sellOrderIndexMap[elem.SellOrderID] = true
	}
	// Check for duplicated index in invoice
	invoiceIndexMap := make(map[string]bool)

	for _, elem := range gs.InvoiceList {
		if _, ok := invoiceIndexMap[elem.InvoiceID]; ok {
			return fmt.Errorf("duplicated index for invoice")
		}
		invoiceIndexMap[elem.InvoiceID] = true
	}

	return nil
}
