package cli_test

import (
	"fmt"
	"strconv"
	"testing"
	"time"

	"github.com/cosmos/cosmos-sdk/client/flags"
	clitestutil "github.com/cosmos/cosmos-sdk/testutil/cli"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"

	"gitlab.com/joltify/joltifychain/x/vault/client/cli"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func TestCreateOutboundTx(t *testing.T) {
	setupBech32Prefix()
	net, _ := preparePool(t)
	val := net.Validators[0]
	ctx := val.ClientCtx

	fields := []string{}
	for _, tc := range []struct {
		desc        string
		idRequestID string
		blockHeight string
		tx          string

		args []string
		err  error
		code uint32
	}{
		{
			idRequestID: strconv.Itoa(0),
			tx:          "testtoken",
			blockHeight: "15",

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
			args := []string{
				tc.idRequestID,
				tc.tx,
				tc.blockHeight,
			}
			args = append(args, fields...)
			args = append(args, tc.args...)
			_, err := net.WaitForHeightWithTimeout(15, time.Minute)
			require.NoError(t, err)
			out, err := clitestutil.ExecTestCLICmd(ctx, cli.CmdCreateOutboundTx(), args)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
				var resp sdk.TxResponse
				require.NoError(t, ctx.Codec.UnmarshalJSON(out.Bytes(), &resp))
				require.Equal(t, tc.code, resp.Code)
			}
		})
	}
}
