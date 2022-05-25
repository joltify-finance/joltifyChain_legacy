package keeper_test

import (
	"fmt"
	"github.com/stretchr/testify/require"
	joltifyapp "gitlab.com/joltify/joltifychain/app"
	"gitlab.com/joltify/joltifychain/testutil/simapp"
	"os"
	path2 "path"
	"runtime"
	"testing"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/suite"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
	"gitlab.com/joltify/joltifychain/app"
)

type KeeperTestSuite struct {
	suite.Suite

	ctx     sdk.Context
	querier sdk.Querier
	app     *app.App
	cleanup func()
}

func (suite *KeeperTestSuite) SetupTest() {

	dir := os.TempDir()
	pc, _, _, _ := runtime.Caller(1)
	tempPath := path2.Join(dir, fmt.Sprintf("%s", runtime.FuncForPC(pc).Name()))
	defer func(tempPath string) {
		err := os.RemoveAll(tempPath)
		require.NoError(suite.T(), err)
	}(tempPath)

	app := simapp.New(tempPath).(*joltifyapp.App)
	ctx := app.BaseApp.NewContext(false, tmproto.Header{Height: 1, ChainID: "osmosis-1", Time: time.Now().UTC()})
	suite.app = app
	suite.ctx = ctx
}

func (suite *KeeperTestSuite) Cleanup() {
	suite.cleanup()
}

func TestKeeperTestSuite(t *testing.T) {
	suite.Run(t, new(KeeperTestSuite))
}
