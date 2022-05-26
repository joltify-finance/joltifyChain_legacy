package mint_test

import (
	"os"
	path2 "path"
	"runtime"
	"testing"

	joltifyapp "gitlab.com/joltify/joltifychain/app"

	"gitlab.com/joltify/joltifychain/testutil/simapp"

	"github.com/stretchr/testify/require"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
	"gitlab.com/joltify/joltifychain/x/mint/types"
)

func TestMintInitGenesis(t *testing.T) {

	dir := os.TempDir()
	pc, _, _, _ := runtime.Caller(1)
	tempPath := path2.Join(dir, runtime.FuncForPC(pc).Name())
	defer func(tempPath string) {
		err := os.RemoveAll(tempPath)
		require.NoError(t, err)
	}(tempPath)
	app := simapp.New(tempPath).(*joltifyapp.App)
	ctx := app.BaseApp.NewContext(false, tmproto.Header{})

	validateGenesis := types.ValidateGenesis(*types.DefaultGenesisState())
	require.NoError(t, validateGenesis)

	require.Equal(t, int64(0), app.MintKeeper.GetLastHalvenEpochNum(ctx))
}
