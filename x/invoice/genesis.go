package invoice

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.com/joltify/joltifychain/x/invoice/keeper"
	"gitlab.com/joltify/joltifychain/x/invoice/types"
)

// InitGenesis initializes the capability module's state from a provided genesis
// state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	// this line is used by starport scaffolding # genesis/module/init
	// Set all the placeOrder
	for _, elem := range genState.PlaceOrderList {
		k.SetPlaceOrder(ctx, *elem)
	}

	// Set all the sellOrder
	for _, elem := range genState.SellOrderList {
		k.SetSellOrder(ctx, *elem)
	}

	// Set all the invoice
	for _, elem := range genState.InvoiceList {
		k.SetInvoice(ctx, *elem)
	}

	// this line is used by starport scaffolding # ibc/genesis/init
}

// ExportGenesis returns the capability module's exported genesis.
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()

	// this line is used by starport scaffolding # genesis/module/export
	// Get all placeOrder
	placeOrderList := k.GetAllPlaceOrder(ctx)
	for _, elem := range placeOrderList {
		elem := elem
		genesis.PlaceOrderList = append(genesis.PlaceOrderList, &elem)
	}

	// Get all sellOrder
	sellOrderList := k.GetAllSellOrder(ctx)
	for _, elem := range sellOrderList {
		elem := elem
		genesis.SellOrderList = append(genesis.SellOrderList, &elem)
	}

	// Get all invoice
	invoiceList := k.GetAllInvoice(ctx)
	for _, elem := range invoiceList {
		elem := elem
		genesis.InvoiceList = append(genesis.InvoiceList, &elem)
	}

	// this line is used by starport scaffolding # ibc/genesis/export

	return genesis
}
