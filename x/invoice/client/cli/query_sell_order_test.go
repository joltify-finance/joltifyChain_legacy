package cli_test

import (
	"encoding/hex"
	"fmt"
	"strconv"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	tmcli "github.com/tendermint/tendermint/libs/cli"
	"google.golang.org/grpc/codes"

	"github.com/cosmos/cosmos-sdk/client/flags"
	clitestutil "github.com/cosmos/cosmos-sdk/testutil/cli"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
	"gitlab.com/joltify/joltifychain/testutil/network"
	"gitlab.com/joltify/joltifychain/x/invoice/client/cli"
	"gitlab.com/joltify/joltifychain/x/invoice/tools"
	"gitlab.com/joltify/joltifychain/x/invoice/types"
	"google.golang.org/grpc/status"
)

func networkWithSellOrderObjects(t *testing.T, n int) (*network.Network, []*types.SellOrder) {
	t.Helper()
	setupBech32Prefix()
	cfg := network.DefaultConfig()
	state := types.GenesisState{}
	require.NoError(t, cfg.Codec.UnmarshalJSON(cfg.GenesisState[types.ModuleName], &state))
	creatorStr := "jolt1rfmwldwrm3652shx3a7say0v4vvtglast0l05d"
	creator, err := sdk.AccAddressFromBech32(creatorStr)
	assert.Nil(t, err)

	for i := 0; i < n; i++ {
		state.SellOrderList = append(state.SellOrderList, &types.SellOrder{Creator: creator, SellOrderID: strconv.Itoa(i), InvoiceID: strconv.Itoa(i), CreatedTime: time.Now().UTC()})
	}

	//for i := 0; i < n; i++ {
	//	state.InvoiceList = append(state.InvoiceList, &types.Invoice{
	//		CurrentOwner: creator,
	//		InvoiceID:    strconv.Itoa(i), InvoiceMembers: []types.InvoiceMember{invoiceMember},
	//	})
	//}
	buf, err := cfg.Codec.MarshalJSON(&state)
	require.NoError(t, err)
	cfg.GenesisState[types.ModuleName] = buf
	return network.New(t, cfg), state.SellOrderList
}

func TestShowSellOrder(t *testing.T) {
	net, objs := networkWithSellOrderObjects(t, 2)
	ctx := net.Validators[0].ClientCtx
	common := []string{
		fmt.Sprintf("--%s=json", tmcli.OutputFlag),
	}
	for _, tc := range []struct {
		desc string
		id   string
		args []string
		err  error
		obj  *types.SellOrder
	}{
		{
			desc: "found",
			id:   objs[0].SellOrderID,
			args: common,
			obj:  objs[0],
		},
		{
			desc: "not found",
			id:   "not_found",
			args: common,
			err:  status.Error(codes.InvalidArgument, "not found"),
		},
	} {
		tc := tc
		t.Run(tc.desc, func(t *testing.T) {
			args := []string{tc.id}
			out, err := clitestutil.ExecTestCLICmd(ctx, cli.CmdShowSellOrder(), args)
			if tc.err != nil {
				stat, ok := status.FromError(tc.err)
				require.True(t, ok)
				require.ErrorIs(t, stat.Err(), tc.err)
			} else {
				require.NoError(t, err)
				var resp types.QueryGetSellOrderResponse
				require.NoError(t, net.Config.Codec.UnmarshalJSON(out.Bytes(), &resp))
				require.NotNil(t, resp.SellOrder)
				require.Equal(t, tc.obj.SellOrderID, resp.SellOrder.SellOrderID)
				require.Equal(t, tc.obj.Creator, resp.SellOrder.Creator)
			}
		})
	}
}

func TestCmdListSellOrderAndQuerySellOrder(t *testing.T) {
	setupBech32Prefix()
	net := network.New(t)
	val := net.Validators[0]
	ctx := val.ClientCtx

	createInvoiceFields := []string{"xyz", val.Address.String(), "100000", "10", "xyz"}

	invoiceIDByte, err := tools.GenHash([]string{val.Address.String(), createInvoiceFields[1], createInvoiceFields[0]})
	require.Nil(t, err)
	invoiceID := hex.EncodeToString(invoiceIDByte)

	createSellBookFields := []string{invoiceID, "10", "10", "3000"}

	tcs := struct {
		desc string
		args []string
		err  error
		code uint32
	}{
		desc: "create invoice",
		args: []string{
			fmt.Sprintf("--%s=%s", flags.FlagFrom, val.Address.String()),
			fmt.Sprintf("--%s=true", flags.FlagSkipConfirmation),
			fmt.Sprintf("--%s=%s", flags.FlagBroadcastMode, flags.BroadcastBlock),
			fmt.Sprintf("--%s=%s", flags.FlagFees, sdk.NewCoins(sdk.NewCoin(net.Config.BondDenom, sdk.NewInt(10))).String()),
		},
	}
	createInvoiceArg := append(createInvoiceFields, tcs.args...)
	_, err = clitestutil.ExecTestCLICmd(ctx, cli.CmdCreateInvoice(), createInvoiceArg)
	require.Nil(t, err)
	args2 := createSellBookFields
	args2 = append(args2, tcs.args...)
	_, err = clitestutil.ExecTestCLICmd(ctx, cli.CmdCreateSellOrder(), args2)
	require.Nil(t, err)

	_, err = clitestutil.ExecTestCLICmd(ctx, cli.CmdCreateSellOrder(), args2)
	require.Nil(t, err)

	_, err = clitestutil.ExecTestCLICmd(ctx, cli.CmdCreateSellOrder(), args2)
	require.Nil(t, err)

	out, err := clitestutil.ExecTestCLICmd(ctx, cli.CmdListSellOrder(), []string{})
	require.Nil(t, err)
	var listResp types.QueryAllSellOrderResponse
	require.NoError(t, ctx.Codec.UnmarshalJSON(out.Bytes(), &listResp))
	require.Len(t, listResp.SellOrder, 3)
	queryID := listResp.SellOrder[0].SellOrderID
	_, err = clitestutil.ExecTestCLICmd(ctx, cli.CmdShowSellOrder(), []string{"invalid"})
	require.NotNil(t, err)
	_, err = clitestutil.ExecTestCLICmd(ctx, cli.CmdShowSellOrder(), []string{queryID})
	require.Nil(t, err)
}
