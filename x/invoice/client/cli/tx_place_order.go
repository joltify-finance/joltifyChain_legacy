package cli

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/spf13/cobra"

	"github.com/spf13/cast"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/joltify/joltifyChain/x/invoice/types"
)

func CmdCreatePlaceOrder() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-place-order [sellOrderID] [amount]",
		Short: "Create a new placeOrder",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsSellOrderID, err := cast.ToStringE(args[0])
			if err != nil {
				return err
			}
			argsAmount, err := cast.ToStringE(args[1])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			amount, ok := sdk.NewIntFromString(argsAmount)
			if !ok {
				return errors.New("invalid amount", 0x12, "convert the amount")
			}

			msg := types.NewMsgCreatePlaceOrder(clientCtx.GetFromAddress(), argsSellOrderID, amount)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
