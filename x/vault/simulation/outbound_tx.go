package simulation

import (
	"math/rand"
	"strconv"

	"github.com/cosmos/cosmos-sdk/baseapp"
	simappparams "github.com/cosmos/cosmos-sdk/simapp/params"
	sdk "github.com/cosmos/cosmos-sdk/types"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/cosmos/cosmos-sdk/x/simulation"
	"gitlab.com/joltify/joltifychain/x/vault/keeper"
	"gitlab.com/joltify/joltifychain/x/vault/types"

	authkeeper "github.com/cosmos/cosmos-sdk/x/auth/keeper"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func SimulateMsgCreateOutboundTx(
	ak authkeeper.AccountKeeper,
	bk types.BankKeeper,
	k keeper.Keeper,
) simtypes.Operation {
	return func(r *rand.Rand, app *baseapp.BaseApp, ctx sdk.Context, accs []simtypes.Account, chainID string,
	) (simtypes.OperationMsg, []simtypes.FutureOperation, error) {
		simAccount, _ := simtypes.RandomAcc(r, accs)

		i := r.Int()
		msg := &types.MsgCreateOutboundTx{
			Creator:   simAccount.Address,
			RequestID: strconv.Itoa(i),
		}

		_, found := k.GetOutboundTx(ctx, msg.RequestID)
		if found {
			return simtypes.NoOpMsg(types.ModuleName, msg.Type(), "OutboundTx already exist"), nil, nil
		}

		txCtx := simulation.OperationInput{
			R:               r,
			App:             app,
			TxGen:           simappparams.MakeTestEncodingConfig().TxConfig,
			Cdc:             nil,
			Msg:             msg,
			MsgType:         msg.Type(),
			Context:         ctx,
			SimAccount:      simAccount,
			ModuleName:      types.ModuleName,
			CoinsSpentInMsg: sdk.NewCoins(),
			AccountKeeper:   ak,
			Bankkeeper:      bk,
		}
		return simulation.GenAndDeliverTxWithRandFees(txCtx)
	}
}
