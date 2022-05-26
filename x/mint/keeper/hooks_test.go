package keeper_test

import (
	"os"
	path2 "path"
	"runtime"
	"testing"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
	abci "github.com/tendermint/tendermint/abci/types"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
	joltifyapp "gitlab.com/joltify/joltifychain/app"
	"gitlab.com/joltify/joltifychain/testutil/simapp"
	lockuptypes "gitlab.com/joltify/joltifychain/x/lockup/types"
	"gitlab.com/joltify/joltifychain/x/mint/types"
)

func TestEndOfEpochMintedCoinDistribution(t *testing.T) {
	dir := os.TempDir()
	pc, _, _, _ := runtime.Caller(1)
	tempPath := path2.Join(dir, runtime.FuncForPC(pc).Name())
	defer func(tempPath string) {
		err := os.RemoveAll(tempPath)
		require.NoError(t, err)
	}(tempPath)
	app := simapp.New(tempPath).(*joltifyapp.App)
	ctx := app.BaseApp.NewContext(false, tmproto.Header{})

	header := tmproto.Header{Height: app.LastBlockHeight() + 1}
	app.BeginBlock(abci.RequestBeginBlock{Header: header})

	setupGaugeForLPIncentives(t, app, ctx)

	params := app.IncentivesKeeper.GetParams(ctx)
	futureCtx := ctx.WithBlockTime(time.Now().Add(time.Minute))

	// set developer rewards address
	mintParams := app.MintKeeper.GetParams(ctx)
	mintParams.WeightedDeveloperRewardsReceivers = []types.WeightedAddress{
		{
			Address: sdk.AccAddress([]byte("addr1---------------")).String(),
			Weight:  sdk.NewDec(1),
		},
	}
	app.MintKeeper.SetParams(ctx, mintParams)

	height := int64(1)
	lastHalvenPeriod := app.MintKeeper.GetLastHalvenEpochNum(ctx)
	// correct rewards
	for ; height < lastHalvenPeriod+app.MintKeeper.GetParams(ctx).ReductionPeriodInEpochs; height++ {
		feePoolOrigin := app.DistrKeeper.GetFeePool(ctx)

		// get pre-epoch osmo supply and supplyWithOffset
		presupply := app.BankKeeper.GetSupply(ctx, mintParams.MintDenom)
		app.EpochsKeeper.BeforeEpochStart(futureCtx, params.DistrEpochIdentifier, height)
		app.EpochsKeeper.AfterEpochEnd(futureCtx, params.DistrEpochIdentifier, height)

		mintParams = app.MintKeeper.GetParams(ctx)
		mintedCoin := app.MintKeeper.GetMinter(ctx).EpochProvision(mintParams)
		//expectedRewardsAmount := app.MintKeeper.GetProportions(ctx, mintedCoin, mintParams.DistributionProportions.Staking).Amount
		expectedPoolIncentivesRewardsAmount := app.MintKeeper.GetProportions(ctx, mintedCoin, mintParams.DistributionProportions.PoolIncentives).Amount
		expectedPoolIncentivesRewards := sdk.NewDecCoin("stake", expectedPoolIncentivesRewardsAmount)

		communityPoolCoins := sdk.NewCoins(mintedCoin)[0].Sub(app.MintKeeper.GetProportions(ctx, mintedCoin, mintParams.DistributionProportions.Staking)).Sub(app.MintKeeper.GetProportions(ctx, mintedCoin, mintParams.DistributionProportions.PoolIncentives))

		expectedRewards := sdk.NewDecCoin("stake", communityPoolCoins.Amount)

		// ensure post-epoch supply with offset changed by exactly the minted coins amount
		// ensure post-epoch supply with offset changed by less than the minted coins amount (because of developer vesting account)
		postSupply := app.BankKeeper.GetSupply(ctx, mintParams.MintDenom)
		require.True(t, postSupply.IsEqual(presupply.Add(mintedCoin)))
		// check community pool balance increase
		feePoolNew := app.DistrKeeper.GetFeePool(ctx)
		//the money of communitypool comes from 1. the ration it origial have and the assert from poolincentives as the weith
		// here is zero. 2 from the community pool ratio itself.

		require.Equal(t, feePoolOrigin.CommunityPool.Add(expectedRewards).Add(expectedPoolIncentivesRewards), feePoolNew.CommunityPool, height)
	}

	app.EpochsKeeper.BeforeEpochStart(futureCtx, params.DistrEpochIdentifier, height)
	app.EpochsKeeper.AfterEpochEnd(futureCtx, params.DistrEpochIdentifier, height)

	lastHalvenPeriod = app.MintKeeper.GetLastHalvenEpochNum(ctx)
	require.Equal(t, lastHalvenPeriod, app.MintKeeper.GetParams(ctx).ReductionPeriodInEpochs)

	for ; height < lastHalvenPeriod+app.MintKeeper.GetParams(ctx).ReductionPeriodInEpochs; height++ {
		feePoolOrigin := app.DistrKeeper.GetFeePool(ctx)

		app.EpochsKeeper.BeforeEpochStart(futureCtx, params.DistrEpochIdentifier, height)
		app.EpochsKeeper.AfterEpochEnd(futureCtx, params.DistrEpochIdentifier, height)

		mintParams = app.MintKeeper.GetParams(ctx)
		mintedCoin := app.MintKeeper.GetMinter(ctx).EpochProvision(mintParams)

		expectedPoolIncentivesRewardsAmount := app.MintKeeper.GetProportions(ctx, mintedCoin, mintParams.DistributionProportions.PoolIncentives).Amount
		expectedPoolIncentivesRewards := sdk.NewDecCoin("stake", expectedPoolIncentivesRewardsAmount)

		communityPoolCoins := sdk.NewCoins(mintedCoin)[0].Sub(app.MintKeeper.GetProportions(ctx, mintedCoin, mintParams.DistributionProportions.Staking)).Sub(app.MintKeeper.GetProportions(ctx, mintedCoin, mintParams.DistributionProportions.PoolIncentives))
		expectedRewards := sdk.NewDecCoin("stake", communityPoolCoins.Amount)

		// check community pool balance increase
		feePoolNew := app.DistrKeeper.GetFeePool(ctx)
		require.Equal(t, feePoolOrigin.CommunityPool.Add(expectedRewards).Add(expectedPoolIncentivesRewards), feePoolNew.CommunityPool, height)
	}
}

func TestEndOfEpochNoDistributionWhenIsNotYetStartTime(t *testing.T) {

	dir := os.TempDir()
	pc, _, _, _ := runtime.Caller(1)
	tempPath := path2.Join(dir, runtime.FuncForPC(pc).Name())
	defer func(tempPath string) {
		err := os.RemoveAll(tempPath)
		require.NoError(t, err)
	}(tempPath)
	app := simapp.New(tempPath).(*joltifyapp.App)
	ctx := app.BaseApp.NewContext(false, tmproto.Header{})

	mintParams := app.MintKeeper.GetParams(ctx)
	mintParams.MintingRewardsDistributionStartEpoch = 4
	app.MintKeeper.SetParams(ctx, mintParams)

	header := tmproto.Header{Height: app.LastBlockHeight() + 1}
	app.BeginBlock(abci.RequestBeginBlock{Header: header})

	setupGaugeForLPIncentives(t, app, ctx)

	params := app.IncentivesKeeper.GetParams(ctx)
	futureCtx := ctx.WithBlockTime(time.Now().Add(time.Minute))

	height := int64(1)
	// Run through epochs 0 through mintParams.MintingRewardsDistributionStartEpoch - 1
	// ensure no rewards sent out
	for ; height < mintParams.MintingRewardsDistributionStartEpoch; height++ {
		feePoolOrigin := app.DistrKeeper.GetFeePool(ctx)
		app.EpochsKeeper.BeforeEpochStart(futureCtx, params.DistrEpochIdentifier, height)
		app.EpochsKeeper.AfterEpochEnd(futureCtx, params.DistrEpochIdentifier, height)

		// check community pool balance not increase
		feePoolNew := app.DistrKeeper.GetFeePool(ctx)
		require.Equal(t, feePoolOrigin.CommunityPool, feePoolNew.CommunityPool, "height = %v", height)
	}
	// Run through epochs mintParams.MintingRewardsDistributionStartEpoch
	// ensure tokens distributed
	app.EpochsKeeper.BeforeEpochStart(futureCtx, params.DistrEpochIdentifier, height)
	app.EpochsKeeper.AfterEpochEnd(futureCtx, params.DistrEpochIdentifier, height)
	require.NotEqual(t, sdk.DecCoins{}, app.DistrKeeper.GetFeePool(ctx).CommunityPool,
		"Tokens to community pool at start distribution epoch")

	// halven period should be set to mintParams.MintingRewardsDistributionStartEpoch
	lastHalvenPeriod := app.MintKeeper.GetLastHalvenEpochNum(ctx)
	require.Equal(t, lastHalvenPeriod, mintParams.MintingRewardsDistributionStartEpoch)
}

func setupGaugeForLPIncentives(t *testing.T, app *joltifyapp.App, ctx sdk.Context) {
	addr := sdk.AccAddress([]byte("addr1---------------"))
	coins := sdk.Coins{sdk.NewInt64Coin("stake", 10000)}
	err := simapp.FundAccount(app.BankKeeper, ctx, addr, coins)
	require.NoError(t, err)
	distrTo := lockuptypes.QueryCondition{
		LockQueryType: lockuptypes.ByDuration,
		Denom:         "lptoken",
		Duration:      time.Second,
	}

	// mints coins so supply exists on chain
	mintLPtokens := sdk.Coins{sdk.NewInt64Coin(distrTo.Denom, 200)}
	err = simapp.FundAccount(app.BankKeeper, ctx, addr, mintLPtokens)
	require.NoError(t, err)

	_, err = app.IncentivesKeeper.CreateGauge(ctx, true, addr, coins, distrTo, time.Now(), 1)
	require.NoError(t, err)
}
