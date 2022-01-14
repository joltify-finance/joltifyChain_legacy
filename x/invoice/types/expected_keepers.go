package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"

	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
)

// BankKeeper Methods imported from bank should be defined here
type BankKeeper interface {
	SendCoins(ctx sdk.Context, fromAddr sdk.AccAddress, toAddr sdk.AccAddress, amt sdk.Coins) error
	MintCoins(ctx sdk.Context, moduleName string, amt sdk.Coins) error
	BurnCoins(ctx sdk.Context, moduleName string, amt sdk.Coins) error
	SendCoinsFromModuleToAccount(ctx sdk.Context, senderModule string, recipientAddr sdk.AccAddress, amt sdk.Coins) error
	SendCoinsFromAccountToModule(ctx sdk.Context, senderAddr sdk.AccAddress, recipientModule string, amt sdk.Coins) error

	GetParams(ctx sdk.Context) banktypes.Params
	SetParams(ctx sdk.Context, params banktypes.Params)
	// SendEnabledCoin(ctx sdk.Context, coin sdk.Coin) bool
	// SendEnabledCoins(ctx sdk.Context, coins ...sdk.Coin) error

	GetBalance(ctx sdk.Context, addr sdk.AccAddress, denom string) sdk.Coin
}
