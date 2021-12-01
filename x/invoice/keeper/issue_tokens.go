package keeper

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"

	"gitlab.com/joltify/joltifychain/x/invoice/types"
)

func (k Keeper) issueTokens(ctx sdk.Context, denom string, amount sdk.Int, receiver sdk.AccAddress) error {
	coin := sdk.NewCoin(denom, amount)
	err := k.bankKeeper.MintCoins(ctx, types.ModuleName, sdk.NewCoins(coin))
	if err != nil {
		return err
	}
	err = k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, receiver, sdk.NewCoins(coin))

	params := k.bankKeeper.GetParams(ctx)
	disableTokenSend := banktypes.SendEnabled{
		Denom:   denom,
		Enabled: false,
	}
	params.SendEnabled = append(params.SendEnabled, &disableTokenSend)
	k.bankKeeper.SetParams(ctx, params)
	return err
}

func (k Keeper) burnTokens(ctx sdk.Context, denom string, amount sdk.Int, sender sdk.AccAddress) error {
	coin := sdk.NewCoin(denom, amount)
	params := k.bankKeeper.GetParams(ctx)
	location := 0
	for i, el := range params.SendEnabled {
		if el.Denom == denom {
			el.Enabled = true
			location = i
			break
		}
	}
	k.bankKeeper.SetParams(ctx, params)

	defer func() {
		// we now delete this token
		params.SendEnabled[location] = params.SendEnabled[len(params.SendEnabled)-1]
		params.SendEnabled = params.SendEnabled[:len(params.SendEnabled)-1]
		k.bankKeeper.SetParams(ctx, params)
	}()

	err := k.bankKeeper.SendCoinsFromAccountToModule(ctx, sender, types.ModuleName, sdk.NewCoins(coin))
	if err != nil {
		return err
	}

	if err := k.bankKeeper.BurnCoins(
		ctx, types.ModuleName, sdk.NewCoins(coin),
	); err != nil {
		// NOTE: should not happen as the module account was
		// retrieved on the step above and it has enough balace
		// to burn.
		panic(fmt.Sprintf("cannot burn coins after a successful send to a module account: %v", err))
	}

	return err
}
