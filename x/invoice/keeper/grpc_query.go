package keeper

import (
	"github.com/joltify/joltifyChain/x/invoice/types"
)

var _ types.QueryServer = Keeper{}
