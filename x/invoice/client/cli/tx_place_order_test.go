package cli_test

import (
	"encoding/hex"
	"fmt"
	"strings"
	"testing"

	"github.com/cosmos/cosmos-sdk/client/flags"
	clitestutil "github.com/cosmos/cosmos-sdk/testutil/cli"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gogo/protobuf/proto"
	"github.com/stretchr/testify/require"

	"gitlab.com/joltify/joltifychain/testutil/network"
	"gitlab.com/joltify/joltifychain/x/invoice/client/cli"
	"gitlab.com/joltify/joltifychain/x/invoice/tools"
	"gitlab.com/joltify/joltifychain/x/invoice/types"
)

func TestCreatePlaceOrder(t *testing.T) {
	setupBech32Prefix()
	net := network.New(t)
	val := net.Validators[0]
	ctx := val.ClientCtx
	createInvoiceFields := []string{"placeOrderTest", val.Address.String(), "100000", "10", "xyz"}
	invoiceIDByte, err := tools.GenHash([]string{val.Address.String(), createInvoiceFields[1], createInvoiceFields[0]})
	require.Nil(t, err)
	invoiceID := hex.EncodeToString(invoiceIDByte)
	createSellBookFields := []string{invoiceID, "100", "100", "3000"}
	basicArgs := []string{
		fmt.Sprintf("--%s=%s", flags.FlagFrom, val.Address.String()),
		fmt.Sprintf("--%s=true", flags.FlagSkipConfirmation),
		fmt.Sprintf("--%s=%s", flags.FlagBroadcastMode, flags.BroadcastBlock),
		fmt.Sprintf("--%s=%s", flags.FlagFees, sdk.NewCoins(sdk.NewCoin(net.Config.BondDenom, sdk.NewInt(10))).String()),
	}

	t.Run("test place order", func(t *testing.T) {
		args := append(createInvoiceFields, basicArgs...)
		invoiceResp, err := clitestutil.ExecTestCLICmd(ctx, cli.CmdCreateInvoice(), args)
		require.Nil(t, err)

		var resp1 sdk.TxResponse
		require.NoError(t, ctx.Codec.UnmarshalJSON(invoiceResp.Bytes(), &resp1))
		args2 := append(createSellBookFields, basicArgs...)
		out, err := clitestutil.ExecTestCLICmd(ctx, cli.CmdCreateSellOrder(), args2)
		require.Nil(t, err)

		var resp sdk.TxResponse
		require.NoError(t, ctx.Codec.UnmarshalJSON(out.Bytes(), &resp))
		outbb, _ := hex.DecodeString(resp.Data)
		var respOrder types.MsgCreateSellOrderResponse
		err = proto.Unmarshal(outbb, &respOrder)
		require.Nil(t, err)
		orderID := strings.Split(respOrder.OrderID, "@")[1]

		args = []string{orderID, "2"}
		args = append(args, basicArgs...)
		_, err = clitestutil.ExecTestCLICmd(ctx, cli.CmdCreatePlaceOrder(), args)
		require.Nil(t, err)
	})
}
