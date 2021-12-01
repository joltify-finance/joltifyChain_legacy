package cli

import (
	"fmt"
	// "strings"

	"github.com/spf13/cobra"

	"github.com/cosmos/cosmos-sdk/client"
	// "github.com/cosmos/cosmos-sdk/client/flags"
	// sdk "github.com/cosmos/cosmos-sdk/types"

	"gitlab.com/joltify/joltifychain/x/invoice/types"
)

// GetQueryCmd returns the cli query commands for this module
func GetQueryCmd(queryRoute string) *cobra.Command {
	// Group invoice queries under a subcommand
	cmd := &cobra.Command{
		Use:                        types.ModuleName,
		Short:                      fmt.Sprintf("Querying commands for the %s module", types.ModuleName),
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}

	// this line is used by starport scaffolding # 1

	cmd.AddCommand(CmdListPlaceOrder())
	cmd.AddCommand(CmdShowPlaceOrder())

	cmd.AddCommand(CmdListSellOrder())
	cmd.AddCommand(CmdShowSellOrder())

	cmd.AddCommand(CmdListInvoice())
	cmd.AddCommand(CmdShowInvoice())

	return cmd
}
