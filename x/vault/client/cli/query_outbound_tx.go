package cli

import (
	"context"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/spf13/cobra"
	"gitlab.com/joltify/joltifychain/x/vault/types"
)

func CmdListOutboundTx() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "list-outbound-tx",
		Short: "list all outboundTx",
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryAllOutboundTxRequest{
				Pagination: pageReq,
			}

			res, err := queryClient.OutboundTxAll(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddPaginationFlagsToCmd(cmd, cmd.Use)
	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}

func CmdShowOutboundTx() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "show-outbound-tx [request-id]",
		Short: "shows a outboundTx",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx := client.GetClientContextFromCmd(cmd)

			queryClient := types.NewQueryClient(clientCtx)

			argRequestID := args[0]

			params := &types.QueryGetOutboundTxRequest{
				RequestID: argRequestID,
			}

			res, err := queryClient.OutboundTx(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
