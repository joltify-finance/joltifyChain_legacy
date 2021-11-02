package cli_test

import (
	"fmt"
	"testing"

	"github.com/cosmos/cosmos-sdk/client/flags"
	clitestutil "github.com/cosmos/cosmos-sdk/testutil/cli"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"

	"github.com/joltify/joltifyChain/testutil/network"
	"github.com/joltify/joltifyChain/x/vault/client/cli"
)

func TestCreateIssueToken(t *testing.T) {
	setupBech32Prefix()
	net := network.New(t)
	val := net.Validators[0]
	ctx := val.ClientCtx
    id := "0"

    fields := []string{  "100vvusd","jolt1xdpg5l3pxpyhxqg4ey4krq2pf9d3sphmmuuugg" }
	for _, tc := range []struct {
		desc string
        id   string
		args []string
		err  error
		code uint32
	}{
		{
            id:   id,
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
            args := []string{tc.id}
            args = append(args, fields...)
            args = append(args, tc.args...)
			out, err := clitestutil.ExecTestCLICmd(ctx, cli.CmdCreateIssueToken(), args)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
				var resp sdk.TxResponse
				require.NoError(t, ctx.JSONMarshaler.UnmarshalJSON(out.Bytes(), &resp))
				fmt.Printf(">>>%v\n",resp.RawLog)
				require.Equal(t, tc.code, resp.Code)
			}
		})
	}
}
