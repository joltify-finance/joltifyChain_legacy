package epochs_test

import (
	joltifyapp "gitlab.com/joltify/joltifychain/app"
	"os"
	path2 "path"
	"testing"
	"time"

	"github.com/stretchr/testify/require"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
	"gitlab.com/joltify/joltifychain/testutil/simapp"
	"gitlab.com/joltify/joltifychain/x/epochs"
	"gitlab.com/joltify/joltifychain/x/epochs/types"
)

func TestEpochsExportGenesis(t *testing.T) {
	dir := os.TempDir()
	tempPath := path2.Join(dir, "testgen")
	defer func(tempPath string) {
		err := os.RemoveAll(tempPath)
		require.NoError(t, err)
	}(tempPath)
	app := simapp.New(tempPath).(*joltifyapp.App)
	ctx := app.BaseApp.NewContext(false, tmproto.Header{})

	chainStartTime := ctx.BlockTime()
	chainStartHeight := ctx.BlockHeight()

	genesis := epochs.ExportGenesis(ctx, app.EpochsKeeper)
	require.Len(t, genesis.Epochs, 3)

	require.Equal(t, genesis.Epochs[0].Identifier, "day")
	require.Equal(t, genesis.Epochs[0].StartTime, chainStartTime)
	require.Equal(t, genesis.Epochs[0].Duration, time.Hour*24)
	require.Equal(t, genesis.Epochs[0].CurrentEpoch, int64(0))
	require.Equal(t, genesis.Epochs[0].CurrentEpochStartHeight, chainStartHeight)
	require.Equal(t, genesis.Epochs[0].CurrentEpochStartTime, chainStartTime)
	require.Equal(t, genesis.Epochs[0].EpochCountingStarted, false)
	require.Equal(t, genesis.Epochs[2].Identifier, "week")
	require.Equal(t, genesis.Epochs[2].StartTime, chainStartTime)
	require.Equal(t, genesis.Epochs[2].Duration, time.Hour*24*7)
	require.Equal(t, genesis.Epochs[2].CurrentEpoch, int64(0))
	require.Equal(t, genesis.Epochs[2].CurrentEpochStartHeight, chainStartHeight)
	require.Equal(t, genesis.Epochs[2].CurrentEpochStartTime, chainStartTime)
	require.Equal(t, genesis.Epochs[2].EpochCountingStarted, false)
}

func TestEpochsInitGenesis(t *testing.T) {
	p := path2.Join(os.TempDir(), "init")
	defer func(p string) {
		os.RemoveAll(p)
	}(p)
	app := simapp.New(p).(*joltifyapp.App)
	ctx := app.BaseApp.NewContext(false, tmproto.Header{})

	// On init genesis, default epochs information is set
	// To check init genesis again, should make it fresh status
	epochInfos := app.EpochsKeeper.AllEpochInfos(ctx)
	for _, epochInfo := range epochInfos {
		app.EpochsKeeper.DeleteEpochInfo(ctx, epochInfo.Identifier)
	}

	now := time.Now()
	ctx = ctx.WithBlockHeight(1)
	ctx = ctx.WithBlockTime(now)

	// test genesisState validation
	genesisState := types.GenesisState{
		Epochs: []types.EpochInfo{
			{
				Identifier:              "monthly",
				StartTime:               time.Time{},
				Duration:                time.Hour * 24,
				CurrentEpoch:            0,
				CurrentEpochStartHeight: ctx.BlockHeight(),
				CurrentEpochStartTime:   time.Time{},
				EpochCountingStarted:    true,
			},
			{
				Identifier:              "monthly",
				StartTime:               time.Time{},
				Duration:                time.Hour * 24,
				CurrentEpoch:            0,
				CurrentEpochStartHeight: ctx.BlockHeight(),
				CurrentEpochStartTime:   time.Time{},
				EpochCountingStarted:    true,
			},
		},
	}
	require.EqualError(t, genesisState.Validate(), "epoch identifier should be unique")

	genesisState = types.GenesisState{
		Epochs: []types.EpochInfo{
			{
				Identifier:              "monthly",
				StartTime:               time.Time{},
				Duration:                time.Hour * 24,
				CurrentEpoch:            0,
				CurrentEpochStartHeight: ctx.BlockHeight(),
				CurrentEpochStartTime:   time.Time{},
				EpochCountingStarted:    true,
			},
		},
	}

	epochs.InitGenesis(ctx, app.EpochsKeeper, genesisState)
	epochInfo := app.EpochsKeeper.GetEpochInfo(ctx, "monthly")
	require.Equal(t, epochInfo.Identifier, "monthly")
	require.Equal(t, epochInfo.StartTime.UTC().String(), now.UTC().String())
	require.Equal(t, epochInfo.Duration, time.Hour*24)
	require.Equal(t, epochInfo.CurrentEpoch, int64(0))
	require.Equal(t, epochInfo.CurrentEpochStartHeight, ctx.BlockHeight())
	require.Equal(t, epochInfo.CurrentEpochStartTime.UTC().String(), time.Time{}.String())
	require.Equal(t, epochInfo.EpochCountingStarted, true)
}
