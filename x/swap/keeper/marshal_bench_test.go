package keeper_test

import (
	joltifyapp "gitlab.com/joltify/joltifychain/app"
	"gitlab.com/joltify/joltifychain/testutil/simapp"
	"math/rand"
	"os"
	"testing"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"gitlab.com/joltify/joltifychain/x/swap/pool_models/balancer"
	swaptypes "gitlab.com/joltify/joltifychain/x/swap/types"
)

func genPoolAssets(r *rand.Rand) []swaptypes.PoolAsset {
	denoms := []string{"IBC/0123456789ABCDEF012346789ABCDEF", "IBC/denom56789ABCDEF012346789ABCDEF"}
	assets := []swaptypes.PoolAsset{}
	for _, denom := range denoms {
		amt, _ := simtypes.RandPositiveInt(r, sdk.NewIntWithDecimal(1, 40))
		reserveAmt := sdk.NewCoin(denom, amt)
		weight := sdk.NewInt(r.Int63n(9) + 1)
		assets = append(assets, swaptypes.PoolAsset{Token: reserveAmt, Weight: weight})
	}

	return assets
}

func genPoolParams(r *rand.Rand) balancer.PoolParams {
	swapFeeInt := int64(r.Intn(1e5))
	swapFee := sdk.NewDecWithPrec(swapFeeInt, 6)

	exitFeeInt := int64(r.Intn(1e5))
	exitFee := sdk.NewDecWithPrec(exitFeeInt, 6)

	// TODO: Randomly generate LBP params
	return balancer.PoolParams{
		SwapFee:                  swapFee,
		ExitFee:                  exitFee,
		SmoothWeightChangeParams: nil,
	}
}

func setupPools(maxNumPoolsToGen int) []swaptypes.PoolI {
	r := rand.New(rand.NewSource(10))
	// setup N pools
	pools := make([]swaptypes.PoolI, 0, maxNumPoolsToGen)
	for i := 0; i < maxNumPoolsToGen; i++ {
		assets := genPoolAssets(r)
		params := genPoolParams(r)
		pool, _ := balancer.NewBalancerPool(uint64(i), params, assets, "FutureGovernorString", time.Now())
		pools = append(pools, &pool)
	}
	return pools
}

func BenchmarkswapPoolSerialization(b *testing.B) {
	tempDir := b.TempDir()
	app := simapp.New(tempDir).(*joltifyapp.App)

	defer func(tempPath string) {
		err := os.RemoveAll(tempPath)
		if err != nil {
			b.Fatalf("error in remote files")
		}
	}(tempDir)

	maxNumPoolsToGen := 5000
	pools := setupPools(maxNumPoolsToGen)

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		j := i % maxNumPoolsToGen
		app.SwapKeeper.MarshalPool(pools[j])
	}
}

func BenchmarkswapPoolDeserialization(b *testing.B) {
	tempDir := b.TempDir()
	app := simapp.New(tempDir).(*joltifyapp.App)
	maxNumPoolsToGen := 5000
	pools := setupPools(maxNumPoolsToGen)
	marshals := make([][]byte, 0, maxNumPoolsToGen)
	for i := 0; i < maxNumPoolsToGen; i++ {
		bz, _ := app.SwapKeeper.MarshalPool(pools[i])
		marshals = append(marshals, bz)
	}

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		j := i % maxNumPoolsToGen
		app.SwapKeeper.UnmarshalPool(marshals[j])
	}
}
