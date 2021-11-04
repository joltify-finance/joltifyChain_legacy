package cli_test

import (
	"fmt"
	"testing"

	"github.com/cosmos/cosmos-sdk/client/flags"
	clitestutil "github.com/cosmos/cosmos-sdk/testutil/cli"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/stretchr/testify/require"

	"github.com/joltify/joltifyChain/testutil/network"
	"github.com/joltify/joltifyChain/x/invoice/client/cli"
)

func TestCreateInvoice(t *testing.T) {
	setupBech32Prefix()
	net := network.New(t)
	val := net.Validators[0]
	ctx := val.ClientCtx

	fields := []string{"xyz", "jolt1rfmwldwrm3652shx3a7say0v4vvtglast0l05d", "100000", "10", "xyz"}
	for _, tc := range []struct {
		desc string
		args []string
		err  error
		code uint32
	}{
		{
			desc: "valid",
			args: []string{
				fmt.Sprintf("--%s=%s", flags.FlagFrom, val.Address.String()),
				fmt.Sprintf("--%s=true", flags.FlagSkipConfirmation),
				fmt.Sprintf("--%s=%s", flags.FlagBroadcastMode, flags.BroadcastBlock),
				fmt.Sprintf("--%s=%s", flags.FlagFees, sdk.NewCoins(sdk.NewCoin(net.Config.BondDenom, sdk.NewInt(10))).String()),
			},
		},
	} {
		tc := tc
		t.Run(tc.desc, func(t *testing.T) {
			args := fields
			args = append(args, tc.args...)
			out, err := clitestutil.ExecTestCLICmd(ctx, cli.CmdCreateInvoice(), args)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
				var resp sdk.TxResponse
				require.NoError(t, ctx.JSONMarshaler.UnmarshalJSON(out.Bytes(), &resp))
				require.Equal(t, tc.code, resp.Code)
			}
		})
	}
}

func TestCreateInvoiceInvalid(t *testing.T) {
	setupBech32Prefix()
	net := network.New(t)
	val := net.Validators[0]
	ctx := val.ClientCtx

	fields := []string{"xyzaaaa", "jolt1rfmwldwrm3652shx3a7say0v4vvtglast0l05d", "1000", "10", "xyz"}
	for _, tc := range []struct {
		desc string
		args []string
		err  error
		code uint32
	}{
		{
			desc: "valid",
			args: []string{
				fmt.Sprintf("--%s=%s", flags.FlagFrom, val.Address.String()),
				fmt.Sprintf("--%s=true", flags.FlagSkipConfirmation),
				fmt.Sprintf("--%s=%s", flags.FlagBroadcastMode, flags.BroadcastBlock),
				fmt.Sprintf("--%s=%s", flags.FlagFees, sdk.NewCoins(sdk.NewCoin(net.Config.BondDenom, sdk.NewInt(10))).String()),
			},
		},
	} {
		tc := tc
		t.Run(tc.desc, func(t *testing.T) {
			args := fields
			args = append(args, tc.args...)
			_, err := clitestutil.ExecTestCLICmd(ctx, cli.CmdCreateInvoice(), args)
			require.Nil(t, err)
		})
	}
}

func TestDeleteInvoice(t *testing.T) {
	setupBech32Prefix()
	net := network.New(t)

	val := net.Validators[0]
	ctx := val.ClientCtx

	fields := []string{"xyz", "jolt1rfmwldwrm3652shx3a7say0v4vvtglast0l05d", "100000", "10", "xyz"}
	common := []string{
		fmt.Sprintf("--%s=%s", flags.FlagFrom, val.Address.String()),
		fmt.Sprintf("--%s=true", flags.FlagSkipConfirmation),
		fmt.Sprintf("--%s=%s", flags.FlagBroadcastMode, flags.BroadcastBlock),
		fmt.Sprintf("--%s=%s", flags.FlagFees, sdk.NewCoins(sdk.NewCoin(net.Config.BondDenom, sdk.NewInt(10))).String()),
	}
	args := fields
	args = append(args, common...)
	_, err := clitestutil.ExecTestCLICmd(ctx, cli.CmdCreateInvoice(), args)
	require.NoError(t, err)

	deleteArgsUser := []string{"xyz", "jolt1rfmwldwrm3652shx3a7say0v4vvtglast0l05d"}
	deleteArgs := append(deleteArgsUser, common...)
	for _, tc := range []struct {
		name string
		args []string
		code uint32
		err  error
	}{
		{
			name: "success delete",
		},
		{
			name: "key not found",
			args: common,
			code: sdkerrors.ErrKeyNotFound.ABCICode(),
		},
	} {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			args = deleteArgs
			if tc.name == "key not found" {
				args[0] = "not found"
			}
			out, err := clitestutil.ExecTestCLICmd(ctx, cli.CmdDeleteInvoice(), args)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
				var resp sdk.TxResponse
				require.NoError(t, ctx.JSONMarshaler.UnmarshalJSON(out.Bytes(), &resp))
				require.Equal(t, tc.code, resp.Code)
			}
		})
	}
}
