package keeper

import (
	"testing"

	"github.com/cosmos/cosmos-sdk/codec"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	"github.com/cosmos/cosmos-sdk/store"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	"github.com/stretchr/testify/require"
	"github.com/tendermint/tendermint/libs/log"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
	tmdb "github.com/tendermint/tm-db"
	"gitlab.com/joltify/joltifychain/x/invoice/keeper"
	"gitlab.com/joltify/joltifychain/x/invoice/types"
)

type testBank struct {
	params *banktypes.Params
}

func (tb testBank) SendCoins(ctx sdk.Context, fromAddr sdk.AccAddress, toAddr sdk.AccAddress, amt sdk.Coins) error {
	return nil
}

func (tb testBank) MintCoins(ctx sdk.Context, moduleName string, amt sdk.Coins) error {
	return nil
}

func (tb testBank) GetBalance(ctx sdk.Context, addr sdk.AccAddress, denom string) sdk.Coin {
	return sdk.NewCoin("test", sdk.NewInt(1000))
}

func (tb testBank) BurnCoins(ctx sdk.Context, moduleName string, amt sdk.Coins) error {
	return nil
}

func (tb testBank) SendCoinsFromModuleToAccount(ctx sdk.Context, senderModule string, recipientAddr sdk.AccAddress, amt sdk.Coins) error {
	return nil
}

func (tb testBank) SendCoinsFromAccountToModule(ctx sdk.Context, senderAddr sdk.AccAddress, recipientModule string, amt sdk.Coins) error {
	return nil
}

func (tb testBank) GetParams(ctx sdk.Context) banktypes.Params {
	return *tb.params
}

func (tb testBank) SetParams(ctx sdk.Context, params banktypes.Params) {
	tb.params.DefaultSendEnabled = params.DefaultSendEnabled
	tb.params.SendEnabled = params.SendEnabled
}

func (tb testBank) SendEnabledCoin(ctx sdk.Context, coin sdk.Coin) bool {
	return true
}

func (tb testBank) SendEnabledCoins(ctx sdk.Context, coins ...sdk.Coin) error {
	return nil
}

func SetupKeeper(t testing.TB) (*keeper.Keeper, sdk.Context) {
	storeKey := sdk.NewKVStoreKey(types.StoreKey)
	memStoreKey := storetypes.NewMemoryStoreKey(types.MemStoreKey)

	db := tmdb.NewMemDB()
	stateStore := store.NewCommitMultiStore(db)
	stateStore.MountStoreWithDB(storeKey, sdk.StoreTypeIAVL, db)
	stateStore.MountStoreWithDB(memStoreKey, sdk.StoreTypeMemory, nil)
	require.NoError(t, stateStore.LoadLatestVersion())

	registry := codectypes.NewInterfaceRegistry()
	params := banktypes.Params{
		DefaultSendEnabled: true,
		SendEnabled:        []*banktypes.SendEnabled{},
	}
	testBank := testBank{params: &params}
	keeper := keeper.NewKeeper(
		codec.NewProtoCodec(registry),
		storeKey,
		memStoreKey,
		testBank,
	)

	ctx := sdk.NewContext(stateStore, tmproto.Header{}, false, log.NewNopLogger())
	return keeper, ctx
}
