package keeper

import (
	"github.com/joltify/joltifyChain/x/parammanager/types"
)

var _ types.QueryServer = Keeper{}
