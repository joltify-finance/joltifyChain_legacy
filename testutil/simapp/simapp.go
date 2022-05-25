package simapp

import (
	"encoding/json"
	sdk "github.com/cosmos/cosmos-sdk/types"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	minttypes "github.com/cosmos/cosmos-sdk/x/mint/types"
	cosmoscmd3 "github.com/ignite-hq/cli/ignite/pkg/cosmoscmd"
	"time"

	"github.com/cosmos/cosmos-sdk/simapp"
	"github.com/tendermint/spm/cosmoscmd"
	abci "github.com/tendermint/tendermint/abci/types"
	"github.com/tendermint/tendermint/libs/log"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
	tmtypes "github.com/tendermint/tendermint/types"
	tmdb "github.com/tendermint/tm-db"

	"gitlab.com/joltify/joltifychain/app"
)

// New creates application instance with in-memory database and disabled logging.
func New(dir string) cosmoscmd.App {
	db := tmdb.NewMemDB()
	logger := log.NewNopLogger()

	encoding := cosmoscmd.MakeEncodingConfig(app.ModuleBasics)

	a := app.New(logger, db, nil, true, map[int64]bool{}, dir, 0, cosmoscmd3.EncodingConfig(encoding),
		simapp.EmptyAppOptions{})
	// InitChain updates deliverState which is required when app.NewContext is called
	genesisState := app.NewDefaultGenesisState(encoding.Marshaler)
	stateBytes, err := json.MarshalIndent(genesisState, "", " ")
	if err != nil {
		panic(err)
	}

	a.InitChain(abci.RequestInitChain{
		ConsensusParams: defaultConsensusParams,
		AppStateBytes:   stateBytes,
	})
	return a
}

var defaultConsensusParams = &abci.ConsensusParams{
	Block: &abci.BlockParams{
		MaxBytes: 200000,
		MaxGas:   2000000,
	},
	Evidence: &tmproto.EvidenceParams{
		MaxAgeNumBlocks: 302400,
		MaxAgeDuration:  504 * time.Hour, // 3 weeks is the max duration
		MaxBytes:        10000,
	},
	Validator: &tmproto.ValidatorParams{
		PubKeyTypes: []string{
			tmtypes.ABCIPubKeyTypeEd25519,
		},
	},
}

func FundAccount(bankKeeper bankkeeper.Keeper, ctx sdk.Context, addr sdk.AccAddress, amounts sdk.Coins) error {
	if err := bankKeeper.MintCoins(ctx, minttypes.ModuleName, amounts); err != nil {
		return err
	}
	return bankKeeper.SendCoinsFromModuleToAccount(ctx, minttypes.ModuleName, addr, amounts)
}
