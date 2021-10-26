package keeper

import (
	"github.com/joltify/joltifyChain/x/vault/types"
)

var _ types.QueryServer = Keeper{}
