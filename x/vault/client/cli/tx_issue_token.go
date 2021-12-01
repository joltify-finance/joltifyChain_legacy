package cli

import (
	"github.com/spf13/cobra"

	"github.com/spf13/cast"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"gitlab.com/joltify/joltifychain/x/vault/types"
)

func CmdCreateIssueToken() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "issue-token [index] [coin] [receiver]",
		Short: "issueToken",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			index := args[0]
			argsCoin, err := cast.ToStringE(args[1])
			if err != nil {
				return err
			}
			argsReceiver, err := cast.ToStringE(args[2])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg, err := types.NewMsgCreateIssueToken(clientCtx.GetFromAddress().String(), index, argsCoin, argsReceiver)
			if err != nil {
				return err
			}
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
