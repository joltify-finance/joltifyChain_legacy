package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	vaultmoduletypes "gitlab.com/joltify/joltifychain/joltifychain/x/vault/types"
)

func (k Keeper) BlockChurnInterval(ctx sdk.Context) (res int64) {
	k.paramstore.Get(ctx, vaultmoduletypes.KeyBlockChurnInterval, &res)
	return
}

func (k Keeper) Power(ctx sdk.Context) (res int64) {
	k.paramstore.Get(ctx, vaultmoduletypes.KeyPower, &res)
	return
}

func (k Keeper) Step(ctx sdk.Context) (res int64) {
	k.paramstore.Get(ctx, vaultmoduletypes.KeyStep, &res)
	return
}

func (k Keeper) CandidateRatio(ctx sdk.Context) (res sdk.Dec) {
	k.paramstore.Get(ctx, vaultmoduletypes.KeyRatio, &res)
	return
}

// Get all parameteras as types.Params
func (k Keeper) GetParams(ctx sdk.Context) vaultmoduletypes.Params {
	return vaultmoduletypes.NewParams(
		k.BlockChurnInterval(ctx),
		k.Power(ctx),
		k.Step(ctx),
		k.CandidateRatio(ctx),
	)
}

// set the params
func (k Keeper) SetParams(ctx sdk.Context, params vaultmoduletypes.Params) {
	k.paramstore.SetParamSet(ctx, &params)
}
