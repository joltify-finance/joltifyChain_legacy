package keeper

import (
	"gitlab.com/joltify/joltifychain/x/parammanager/types"
)

var _ types.QueryServer = Keeper{}
