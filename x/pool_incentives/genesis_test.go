package pool_incentives_test

import (
	"github.com/tendermint/spm/cosmoscmd"
	joltifyapp "gitlab.com/joltify/joltifychain/app"
	"os"
	path2 "path"
	"runtime"
	"testing"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"

	"gitlab.com/joltify/joltifychain/testutil/simapp"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
	poolincentives "gitlab.com/joltify/joltifychain/x/pool_incentives"
	"gitlab.com/joltify/joltifychain/x/pool_incentives/types"
)

var now = time.Now().UTC()
var testGenesis = types.GenesisState{
	Params: types.Params{
		MintedDenom: "uoppy",
	},
	LockableDurations: []time.Duration{
		time.Second,
		time.Minute,
		time.Hour,
	},
	DistrInfo: &types.DistrInfo{
		TotalWeight: sdk.NewInt(1),
		Records: []types.DistrRecord{
			{
				GaugeId: 1,
				Weight:  sdk.NewInt(1),
			},
		},
	},
}

func TestMarshalUnmarshalGenesis(t *testing.T) {
	dir := os.TempDir()
	pc, _, _, _ := runtime.Caller(1)
	tempPath := path2.Join(dir, "%s", runtime.FuncForPC(pc).Name())
	defer func(tempPath string) {
		err := os.RemoveAll(tempPath)
		require.NoError(t, err)
	}(tempPath)
	app := simapp.New(tempPath).(*joltifyapp.App)
	ctx := app.BaseApp.NewContext(false, tmproto.Header{})

	encodingConfig := cosmoscmd.MakeEncodingConfig(joltifyapp.ModuleBasics)
	appCodec := encodingConfig.Marshaler

	am := poolincentives.NewAppModule(appCodec, app.PoolIncentivesKeeper)

	genesis := testGenesis
	poolincentives.InitGenesis(ctx, app.PoolIncentivesKeeper, &genesis)
	assert.Equal(t, app.PoolIncentivesKeeper.GetDistrInfo(ctx), *testGenesis.DistrInfo)

	genesisExported := am.ExportGenesis(ctx, appCodec)
	assert.NotPanics(t, func() {
		dir := os.TempDir()
		pc, _, _, _ := runtime.Caller(1)
		tempPath := path2.Join(dir, "%s", runtime.FuncForPC(pc).Name())
		defer func(tempPath string) {
			err := os.RemoveAll(tempPath)
			require.NoError(t, err)
		}(tempPath)
		app := simapp.New(tempPath).(*joltifyapp.App)
		ctx := app.BaseApp.NewContext(false, tmproto.Header{})
		ctx = ctx.WithBlockTime(now.Add(time.Second))
		am := poolincentives.NewAppModule(appCodec, app.PoolIncentivesKeeper)
		am.InitGenesis(ctx, appCodec, genesisExported)

	})
}

func TestInitGenesis(t *testing.T) {
	dir := os.TempDir()
	pc, _, _, _ := runtime.Caller(1)
	tempPath := path2.Join(dir, "%s", runtime.FuncForPC(pc).Name())
	defer func(tempPath string) {
		err := os.RemoveAll(tempPath)
		require.NoError(t, err)
	}(tempPath)
	app := simapp.New(tempPath).(*joltifyapp.App)
	ctx := app.BaseApp.NewContext(false, tmproto.Header{})
	ctx = ctx.WithBlockTime(now.Add(time.Second))

	genesis := testGenesis
	poolincentives.InitGenesis(ctx, app.PoolIncentivesKeeper, &genesis)

	params := app.PoolIncentivesKeeper.GetParams(ctx)
	require.Equal(t, params, genesis.Params)

	durations := app.PoolIncentivesKeeper.GetLockableDurations(ctx)
	require.Equal(t, durations, genesis.LockableDurations)

	distrInfo := app.PoolIncentivesKeeper.GetDistrInfo(ctx)
	require.Equal(t, distrInfo, *genesis.DistrInfo)
}

func TestExportGenesis(t *testing.T) {
	dir := os.TempDir()
	pc, _, _, _ := runtime.Caller(1)
	tempPath := path2.Join(dir, "%s", runtime.FuncForPC(pc).Name())
	defer func(tempPath string) {
		err := os.RemoveAll(tempPath)
		require.NoError(t, err)
	}(tempPath)
	app := simapp.New(tempPath).(*joltifyapp.App)
	ctx := app.BaseApp.NewContext(false, tmproto.Header{})

	ctx = ctx.WithBlockTime(now.Add(time.Second))
	genesis := testGenesis
	poolincentives.InitGenesis(ctx, app.PoolIncentivesKeeper, &genesis)

	durations := []time.Duration{
		time.Second,
		time.Minute,
		time.Hour,
		time.Hour * 5,
	}
	app.PoolIncentivesKeeper.SetLockableDurations(ctx, durations)
	savedDurations := app.PoolIncentivesKeeper.GetLockableDurations(ctx)
	require.Equal(t, savedDurations, durations)

	genesisExported := poolincentives.ExportGenesis(ctx, app.PoolIncentivesKeeper)
	require.Equal(t, genesisExported.Params, genesis.Params)
	require.Equal(t, genesisExported.LockableDurations, durations)
	require.Equal(t, genesisExported.DistrInfo, genesis.DistrInfo)
}
