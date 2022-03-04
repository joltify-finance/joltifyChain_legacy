package keeper

import (
	"html"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.com/joltify/joltifychain/x/vault/types"
)

func (k Keeper) BurnTokens(ctx sdk.Context, addr sdk.AccAddress) error {
	coinsBalance := k.bankKeeper.GetAllBalances(ctx, addr)
	var coins sdk.Coins
	for _, el := range coinsBalance {
		found := false
		if el.IsZero() {
			continue
		}
		for _, p := range types.Preserve {
			if el.Denom == p {
				found = true
				break
			}
			if !found {
				coins = append(coins, el)
			}
		}
	}

	if coins.Empty(){
		return nil
	}
	err := k.bankKeeper.SendCoinsFromAccountToModule(ctx, addr, types.ModuleName, coins)
	if err != nil {
		k.Logger(ctx).Error("fail to send token to account")
		return err
	}
	defer func() {
		tick := html.UnescapeString("&#" + "128293" + ";")
		msg:=tick+" burn"
		k.Logger(ctx).Info(msg, "coins",coins.String(), "address",addr.String())
	}()
	return k.bankKeeper.BurnCoins(ctx, types.ModuleName, coins)
}

func (k Keeper) ProcessAccountLeft(ctx sdk.Context) {

	req := types.QueryLatestPoolRequest{}
	wctx := sdk.WrapSDKContext(ctx)
	ret, err := k.GetLastPool(wctx, &req)
	if err != nil {
		k.Logger(ctx).Error("fail to get the last pool, skip", "err=", err)
		return
	}
	for _, el := range ret.Pools {
		addr := el.CreatePool.PoolAddr
		if addr == nil {
			continue
		}
		err := k.BurnTokens(ctx, addr)
		if err != nil {
			k.Logger(ctx).Error("fail to burn the token")
		}

	}

}
