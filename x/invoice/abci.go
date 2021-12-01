package invoice

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.com/joltify/joltifychain/x/invoice/keeper"
)

// BeginBlocker all the invoice module related begin block should be here
func BeginBlocker(ctx sdk.Context, k keeper.Keeper) {
	// at the beginning of the block, we check whether we have any sell order to remove
	err := k.RemoveExpireInvoice(ctx)
	if err != nil {
		panic(err)
	}
}
