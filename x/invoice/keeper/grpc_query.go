package keeper

import (
	"gitlab.com/joltify/joltifychain/joltifychain/x/invoice/types"
)

var _ types.QueryServer = Keeper{}
