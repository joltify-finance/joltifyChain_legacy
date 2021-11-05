package keeper

import (
	"gitlab.com/joltify/joltifychain/joltifychain/x/parammanager/types"
)

var _ types.QueryServer = Keeper{}
