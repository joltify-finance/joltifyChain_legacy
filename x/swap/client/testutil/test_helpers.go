package testutil

import (
	"fmt"
	"testing"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/testutil"
	clitestutil "github.com/cosmos/cosmos-sdk/testutil/cli"
	sdk "github.com/cosmos/cosmos-sdk/types"
	swapcli "gitlab.com/joltify/joltifychain/x/swap/client/cli"
)

// commonArgs is args for CLI test commands
var commonArgs = []string{
	fmt.Sprintf("--%s=true", flags.FlagSkipConfirmation),
	fmt.Sprintf("--%s=%s", flags.FlagBroadcastMode, flags.BroadcastBlock),
	fmt.Sprintf("--%s=%s", flags.FlagFees, sdk.NewCoins(sdk.NewCoin(sdk.DefaultBondDenom, sdk.NewInt(10))).String()),
}

// MsgCreatePool broadcast a pool creation message.
func MsgCreatePool(
	t *testing.T,
	clientCtx client.Context,
	owner fmt.Stringer,
	tokenWeights string,
	initialDeposit string,
	swapFee string,
	exitFee string,
	futureGovernor string,
	extraArgs ...string,
) (testutil.BufferWriter, error) {
	args := []string{}

	jsonFile := testutil.WriteToNewTempFile(t,
		fmt.Sprintf(`
		{
		  "%s": "%s",
		  "%s": "%s",
		  "%s": "%s",
		  "%s": "%s",
		  "%s": "%s"
		}
		`, swapcli.PoolFileWeights,
			tokenWeights,
			swapcli.PoolFileInitialDeposit,
			initialDeposit,
			swapcli.PoolFileSwapFee,
			swapFee,
			swapcli.PoolFileExitFee,
			exitFee,
			swapcli.PoolFileExitFee,
			exitFee,
		),
	)

	args = append(args,
		fmt.Sprintf("--%s=%s", swapcli.FlagPoolFile, jsonFile.Name()),
		fmt.Sprintf("--%s=%s", flags.FlagFrom, owner.String()),
		fmt.Sprintf("--%s=%d", flags.FlagGas, 300000),
	)

	args = append(args, commonArgs...)
	return clitestutil.ExecTestCLICmd(clientCtx, swapcli.NewCreatePoolCmd(), args)
}

// MsgJoinPool broadcast pool join message.
func MsgJoinPool(clientCtx client.Context, owner fmt.Stringer, poolID uint64, shareAmtOut string, maxAmountsIn []string, extraArgs ...string) (testutil.BufferWriter, error) {
	args := []string{
		fmt.Sprintf("--%s=%d", swapcli.FlagPoolId, poolID),
		fmt.Sprintf("--%s=%s", swapcli.FlagShareAmountOut, shareAmtOut),
		fmt.Sprintf("--%s=%s", flags.FlagFrom, owner.String()),
	}

	for _, maxAmt := range maxAmountsIn {
		args = append(args, fmt.Sprintf("--%s=%s", swapcli.FlagMaxAmountsIn, maxAmt))
	}
	args = append(args, commonArgs...)
	return clitestutil.ExecTestCLICmd(clientCtx, swapcli.NewJoinPoolCmd(), args)
}

// MsgExitPool broadcast a pool exit message
func MsgExitPool(clientCtx client.Context, owner fmt.Stringer, poolID uint64, shareAmtIn string, minAmountsOut []string, extraArgs ...string) (testutil.BufferWriter, error) {
	args := []string{
		fmt.Sprintf("--%s=%d", swapcli.FlagPoolId, poolID),
		fmt.Sprintf("--%s=%s", swapcli.FlagShareAmountIn, shareAmtIn),
		fmt.Sprintf("--%s=%s", flags.FlagFrom, owner.String()),
	}

	for _, maxAmt := range minAmountsOut {
		args = append(args, fmt.Sprintf("--%s=%s", swapcli.FlagMinAmountsOut, maxAmt))
	}

	args = append(args, commonArgs...)
	return clitestutil.ExecTestCLICmd(clientCtx, swapcli.NewExitPoolCmd(), args)
}
