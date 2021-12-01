package keeper

import (
	"gitlab.com/joltify/joltifychain/x/vault/types"
)

var _ types.QueryServer = Keeper{}
