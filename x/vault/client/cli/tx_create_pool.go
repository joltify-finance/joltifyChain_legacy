package cli

import (
	"github.com/spf13/cobra"

	"github.com/spf13/cast"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"gitlab.com/joltify/joltifychain/x/vault/types"
)

func CmdCreateCreatePool() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-pool  [poolPubKey] [blockHeight]",
		Short: "Create a new create_pool",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {

			argsPoolPubKey, err := cast.ToStringE(args[0])
			if err != nil {
				return err
			}
			argsBlockHeight, err := cast.ToStringE(args[1])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreateCreatePool(clientCtx.GetFromAddress(), argsPoolPubKey, argsBlockHeight)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
