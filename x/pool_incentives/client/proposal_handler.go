package client

import (
	govclient "github.com/cosmos/cosmos-sdk/x/gov/client"
	"gitlab.com/joltify/joltifychain/x/pool_incentives/client/cli"
	"gitlab.com/joltify/joltifychain/x/pool_incentives/client/rest"
)

var UpdatePoolIncentivesHandler = govclient.NewProposalHandler(cli.NewCmdSubmitUpdatePoolIncentivesProposal, rest.ProposalUpdatePoolIncentivesRESTHandler)
