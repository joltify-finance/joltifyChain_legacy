package keeper

import (
	"testing"
	"time"

	"github.com/cosmos/cosmos-sdk/crypto/keys/ed25519"
	"github.com/cosmos/cosmos-sdk/simapp"
	types2 "github.com/cosmos/cosmos-sdk/x/params/types"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"

	abci "github.com/tendermint/tendermint/abci/types"

	"github.com/cosmos/cosmos-sdk/codec"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	"github.com/cosmos/cosmos-sdk/store"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
	"github.com/tendermint/tendermint/libs/log"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
	tmdb "github.com/tendermint/tm-db"
	"gitlab.com/joltify/joltifychain/joltifychain/x/vault/types"
)

type testVaultStaking struct{}

func (t testVaultStaking) IterateBondedValidatorsByPower(context sdk.Context, f func(index int64, validator stakingtypes.ValidatorI) (stop bool)) {
	panic("implement me")
}

func (t testVaultStaking) IterateLastValidators(context sdk.Context, f func(index int64, validator stakingtypes.ValidatorI) (stop bool)) {
	panic("implement me")
}

func (t testVaultStaking) IterateValidators(context sdk.Context, f func(index int64, validator stakingtypes.ValidatorI) (stop bool)) {
	panic("implement me")
}

func (t testVaultStaking) ValidatorsPowerStoreIterator(ctx sdk.Context) sdk.Iterator {
	panic("implement me")
}

func (t testVaultStaking) SetLastValidatorPower(ctx sdk.Context, operator sdk.ValAddress, power int64) {
	panic("implement me")
}

func (t testVaultStaking) BlockValidatorUpdates(ctx sdk.Context) []abci.ValidatorUpdate {
	panic("implement me")
}

func (t testVaultStaking) UnbondAllMatureValidators(ctx sdk.Context) {
	panic("implement me")
}

func (t testVaultStaking) DequeueAllMatureUBDQueue(ctx sdk.Context, currTime time.Time) (matureUnbonds []stakingtypes.DVPair) {
	panic("implement me")
}

func (t testVaultStaking) CompleteUnbonding(ctx sdk.Context, delAddr sdk.AccAddress, valAddr sdk.ValAddress) (sdk.Coins, error) {
	panic("implement me")
}

func (t testVaultStaking) DequeueAllMatureRedelegationQueue(ctx sdk.Context, currTime time.Time) (matureRedelegations []stakingtypes.DVVTriplet) {
	panic("implement me")
}

func (t testVaultStaking) CompleteRedelegation(ctx sdk.Context, delAddr sdk.AccAddress, valSrcAddr, valDstAddr sdk.ValAddress) (sdk.Coins, error) {
	panic("implement me")
}

func (t testVaultStaking) GetParams(ctx sdk.Context) stakingtypes.Params {
	panic("implement me")
}

func (t testVaultStaking) LastValidatorsIterator(ctx sdk.Context) (iterator sdk.Iterator) {
	panic("implement me")
}

func (t testVaultStaking) DeleteValidatorByPowerIndex(ctx sdk.Context, validator stakingtypes.Validator) {
	panic("implement me")
}

func (t testVaultStaking) SetValidator(ctx sdk.Context, validator stakingtypes.Validator) {
	panic("implement me")
}

func (t testVaultStaking) SetValidatorByPowerIndex(ctx sdk.Context, validator stakingtypes.Validator) {
	panic("implement me")
}

func (t testVaultStaking) DeleteValidatorQueue(ctx sdk.Context, val stakingtypes.Validator) {
	panic("implement me")
}

func (t testVaultStaking) AfterValidatorBonded(ctx sdk.Context, consAddr sdk.ConsAddress, valAddr sdk.ValAddress) {
	panic("implement me")
}

func (t testVaultStaking) GetValidator(ctx sdk.Context, addr sdk.ValAddress) (validator stakingtypes.Validator, found bool) {
	panic("implement me")
}

func (t testVaultStaking) InsertUnbondingValidatorQueue(ctx sdk.Context, val stakingtypes.Validator) {
	panic("implement me")
}

func (t testVaultStaking) DeleteLastValidatorPower(ctx sdk.Context, operator sdk.ValAddress) {
	panic("implement me")
}

func (t testVaultStaking) SetLastTotalPower(ctx sdk.Context, power sdk.Int) {
	panic("implement me")
}

func (t testVaultStaking) BondDenom(ctx sdk.Context) (res string) {
	panic("implement me")
}

func (t testVaultStaking) GetHistoricalInfo(ctx sdk.Context, height int64) (stakingtypes.HistoricalInfo, bool) {
	operatorStr := "invvaloper12k0nzax6dr3d9tssxne7ygmhdpj79rpxhnrk0u"
	operator, err := sdk.ValAddressFromBech32(operatorStr)
	if err != nil {
		return stakingtypes.HistoricalInfo{}, false
	}

	sk := ed25519.GenPrivKey()
	desc := stakingtypes.NewDescription("tester", "testId", "www.test.com", "aaa", "aaa")
	testValidator, err := stakingtypes.NewValidator(operator, sk.PubKey(), desc)
	if err != nil {
		return stakingtypes.HistoricalInfo{}, false
	}
	historicalInfo := stakingtypes.HistoricalInfo{
		Valset: []stakingtypes.Validator{testValidator},
	}
	return historicalInfo, true
}

func setupKeeper(t testing.TB) (*Keeper, sdk.Context) {
	app := simapp.Setup(false)
	storeKey := sdk.NewKVStoreKey(types.StoreKey)
	memStoreKey := storetypes.NewMemoryStoreKey(types.MemStoreKey)

	db := tmdb.NewMemDB()
	stateStore := store.NewCommitMultiStore(db)
	stateStore.MountStoreWithDB(storeKey, sdk.StoreTypeIAVL, db)
	stateStore.MountStoreWithDB(memStoreKey, sdk.StoreTypeMemory, nil)
	require.NoError(t, stateStore.LoadLatestVersion())

	testVaultStaking := testVaultStaking{}

	registry := codectypes.NewInterfaceRegistry()
	keeper := NewKeeper(
		codec.NewProtoCodec(registry),
		storeKey,
		memStoreKey,
		testVaultStaking,
		app.BankKeeper,
		types2.NewSubspace(app.AppCodec(), app.LegacyAmino(), storeKey, memStoreKey, types.ModuleName),
	)

	ctx := sdk.NewContext(stateStore, tmproto.Header{}, false, log.NewNopLogger())
	return keeper, ctx
}
