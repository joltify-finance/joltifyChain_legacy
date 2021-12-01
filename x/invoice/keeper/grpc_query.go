package keeper

import (
	"gitlab.com/joltify/joltifychain/x/invoice/types"
)

var _ types.QueryServer = Keeper{}
