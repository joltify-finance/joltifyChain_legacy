package cli

import (
	"context"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/joltify/joltifyChain/x/invoice/types"
	"github.com/spf13/cobra"
)

func CmdListPlaceOrder() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "list-place-order",
		Short: "list all placeOrder",
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryAllPlaceOrderRequest{
				Pagination: pageReq,
			}

			res, err := queryClient.PlaceOrderAll(context.Background(), params)
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

func CmdShowPlaceOrder() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "show-place-order [index]",
		Short: "shows a placeOrder",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryGetPlaceOrderRequest{
				Index: args[0],
			}

			res, err := queryClient.PlaceOrder(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
