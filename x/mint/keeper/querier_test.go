package keeper_test

import (
	"fmt"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
	joltifyapp "gitlab.com/joltify/joltifychain/app"
	"os"
	path2 "path"
	"runtime"
	"testing"

	"github.com/cosmos/cosmos-sdk/codec"

	"github.com/stretchr/testify/require"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keep "gitlab.com/joltify/joltifychain/x/mint/keeper"
	"gitlab.com/joltify/joltifychain/x/mint/types"

	"gitlab.com/joltify/joltifychain/testutil/simapp"

	abci "github.com/tendermint/tendermint/abci/types"
)

func TestNewQuerier(t *testing.T) {
	dir := os.TempDir()
	pc, _, _, _ := runtime.Caller(1)
	tempPath := path2.Join(dir, fmt.Sprintf("%s", runtime.FuncForPC(pc).Name()))
	defer func(tempPath string) {
		err := os.RemoveAll(tempPath)
		require.NoError(t, err)
	}(tempPath)
	app := simapp.New(tempPath).(*joltifyapp.App)
	ctx := app.BaseApp.NewContext(false, tmproto.Header{})

	app.MintKeeper.SetParams(ctx, types.DefaultParams())
	app.MintKeeper.SetMinter(ctx, types.DefaultInitialMinter())

	legacyQuerierCdc := codec.NewAminoCodec(app.LegacyAmino())
	querier := keep.NewQuerier(app.MintKeeper, legacyQuerierCdc.LegacyAmino)

	query := abci.RequestQuery{
		Path: "",
		Data: []byte{},
	}

	_, err := querier(ctx, []string{types.QueryParameters}, query)
	require.NoError(t, err)

	_, err = querier(ctx, []string{types.QueryEpochProvisions}, query)
	require.NoError(t, err)

	_, err = querier(ctx, []string{"foo"}, query)
	require.Error(t, err)
}

func TestQueryParams(t *testing.T) {
	dir := os.TempDir()
	pc, _, _, _ := runtime.Caller(1)
	tempPath := path2.Join(dir, fmt.Sprintf("%s", runtime.FuncForPC(pc).Name()))
	defer func(tempPath string) {
		err := os.RemoveAll(tempPath)
		require.NoError(t, err)
	}(tempPath)
	app := simapp.New(tempPath).(*joltifyapp.App)
	ctx := app.BaseApp.NewContext(false, tmproto.Header{})

	legacyQuerierCdc := codec.NewAminoCodec(app.LegacyAmino())
	querier := keep.NewQuerier(app.MintKeeper, legacyQuerierCdc.LegacyAmino)

	var params types.Params

	res, sdkErr := querier(ctx, []string{types.QueryParameters}, abci.RequestQuery{})
	require.NoError(t, sdkErr)

	err := app.LegacyAmino().UnmarshalJSON(res, &params)
	require.NoError(t, err)
}

func TestQueryEpochProvisions(t *testing.T) {
	dir := os.TempDir()
	pc, _, _, _ := runtime.Caller(1)
	tempPath := path2.Join(dir, fmt.Sprintf("%s", runtime.FuncForPC(pc).Name()))
	defer func(tempPath string) {
		err := os.RemoveAll(tempPath)
		require.NoError(t, err)
	}(tempPath)
	app := simapp.New(tempPath).(*joltifyapp.App)
	ctx := app.BaseApp.NewContext(false, tmproto.Header{})

	legacyQuerierCdc := codec.NewAminoCodec(app.LegacyAmino())
	querier := keep.NewQuerier(app.MintKeeper, legacyQuerierCdc.LegacyAmino)

	var epochProvisions sdk.Dec

	res, sdkErr := querier(ctx, []string{types.QueryEpochProvisions}, abci.RequestQuery{})
	require.NoError(t, sdkErr)

	err := app.LegacyAmino().UnmarshalJSON(res, &epochProvisions)
	require.NoError(t, err)

	require.Equal(t, app.MintKeeper.GetMinter(ctx).EpochProvisions, epochProvisions)
}
