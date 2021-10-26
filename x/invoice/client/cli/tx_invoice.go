package cli

import (
	stdErr "errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/spf13/cobra"

	"github.com/spf13/cast"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/joltify/joltifyChain/x/invoice/types"
)

func CmdCreateInvoice() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-invoice [name] [original owner] [amount] [APY] [url]",
		Short: "Create a new invoice",
		Args:  cobra.ExactArgs(5),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsName, err := cast.ToStringE(args[0])
			if err != nil {
				return err
			}
			argsOwner, err := cast.ToStringE(args[1])
			if err != nil {
				return err
			}
			argsAmount, err := cast.ToStringE(args[2])
			if err != nil {
				return err
			}
			argsAPY, err := cast.ToStringE(args[3])
			if err != nil {
				return err
			}
			argsURL, err := cast.ToStringE(args[4])
			if err != nil {
				return err
			}
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}
			invoiceOwner, err := sdk.AccAddressFromBech32(argsOwner)
			if err != nil {
				return err
			}
			amount, ok := sdk.NewIntFromString(argsAmount)
			if !ok {
				return stdErr.New("fail to convert to amount")
			}
			msg := types.NewMsgCreateInvoice(clientCtx.GetFromAddress(), invoiceOwner, argsName, amount, argsURL, argsAPY, true)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdDeleteInvoice() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "delete-invoice [name] [original owner]",
		Short: "Delete a invoice",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsName, err := cast.ToStringE(args[0])
			if err != nil {
				return err
			}
			argsOwner, err := cast.ToStringE(args[1])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}
			invoiceOwner, err := sdk.AccAddressFromBech32(argsOwner)
			if err != nil {
				return err
			}

			msg := types.NewMsgDeleteInvoice(clientCtx.GetFromAddress(), invoiceOwner, argsName)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
