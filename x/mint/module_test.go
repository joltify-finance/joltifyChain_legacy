package mint_test

import (
	"os"
	path2 "path"
	"runtime"
	"testing"

	"github.com/stretchr/testify/require"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"

	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"

	joltifyapp "gitlab.com/joltify/joltifychain/app"
	"gitlab.com/joltify/joltifychain/testutil/simapp"
	"gitlab.com/joltify/joltifychain/x/mint/types"
)

func TestItCreatesModuleAccountOnInitBlock(t *testing.T) {
	dir := os.TempDir()
	pc, _, _, _ := runtime.Caller(1)
	tempPath := path2.Join(dir, runtime.FuncForPC(pc).Name())
	defer func(tempPath string) {
		err := os.RemoveAll(tempPath)
		require.NoError(t, err)
	}(tempPath)
	app := simapp.New(tempPath).(*joltifyapp.App)
	ctx := app.BaseApp.NewContext(false, tmproto.Header{})

	acc := app.AccountKeeper.GetAccount(ctx, authtypes.NewModuleAddress(types.ModuleName))
	require.NotNil(t, acc)
}
