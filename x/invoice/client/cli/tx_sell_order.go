package cli

import (
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/spf13/cobra"

	stdErr "errors"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cast"
	"gitlab.com/joltify/joltifychain/joltifychain/x/invoice/types"
)

func CmdCreateSellOrder() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-sell-order [invoiceID] [amount] [price] [time duration]",
		Short: "Create a new SellOrder",
		Args:  cobra.ExactArgs(4),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsInvoiceID, err := cast.ToStringE(args[0])
			if err != nil {
				return err
			}
			argsAmountDenom, err := cast.ToStringE(args[1])
			if err != nil {
				return err
			}
			argsPrice, err := cast.ToStringE(args[2])
			if err != nil {
				return err
			}
			argsTimeDuration := cast.ToDuration(args[3])
			// we convert time duration into seconds
			argsTimeDuration = argsTimeDuration * time.Second
			if err != nil {
				return err
			}
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}
			amount, ok := sdk.NewIntFromString(argsAmountDenom)
			if !ok {
				return stdErr.New("fail to convert to amount")
			}

			price, ok := sdk.NewIntFromString(argsPrice)
			if !ok {
				return stdErr.New("fail to convert to price")
			}

			msg := types.NewMsgCreateSellOrder(clientCtx.GetFromAddress(), argsInvoiceID, amount, price, argsTimeDuration)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdDeleteSellOrder() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "delete-sell-order [sellOrderInvoiceID]",
		Short: "Delete a SellOrder",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			index := args[0]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgDeleteSellOrder(clientCtx.GetFromAddress(), index)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
