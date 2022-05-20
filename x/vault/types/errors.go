package types

// DONTCOVER

import (
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// x/vault module sentinel errors
var (
	ErrFormat = sdkerrors.Register(ModuleName, 1, "format convert error")
	ErrUpdate = sdkerrors.Register(ModuleName, 2, "error in update the validtor")
	// this line is used by starport scaffolding # ibc/errors
)
