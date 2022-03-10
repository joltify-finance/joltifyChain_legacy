package cli

import (
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cobra"
	"gitlab.com/joltify/joltifychain/x/vault/types"
)

func CmdCreateOutboundTx() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-outbound-tx [request-id] [outboundtx] [blockheight]",
		Short: "Create a new outboundTx",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			// Get indexes
			indexRequestID := args[0]
			outboundTx := args[1]
			blockHeight := args[2]

			// Get value arguments

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreateOutboundTx(
				clientCtx.GetFromAddress(),
				indexRequestID,
				outboundTx,
				blockHeight,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
