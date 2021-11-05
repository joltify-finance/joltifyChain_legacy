package keeper

import (
	"gitlab.com/joltify/joltifychain/joltifychain/x/vault/types"
)

var _ types.QueryServer = Keeper{}
