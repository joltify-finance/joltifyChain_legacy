package keeper

import (
	"context"
	"errors"
	"fmt"
	"strconv"

	"github.com/cosmos/cosmos-sdk/telemetry"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/bech32/legacybech32"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"gitlab.com/joltify/joltifychain/x/vault/types"
)

// fixme need to confirm which is correct
func PubKeyToPoolAddr(pk string) (sdk.AccAddress, error) {
	poolPubKey, err := legacybech32.UnmarshalPubKey(legacybech32.AccPK, pk)
	if err != nil {
		return nil, err
	}
	return sdk.AccAddressFromHex(poolPubKey.Address().String())
}

func (k msgServer) setupAccount(ctx sdk.Context, address sdk.AccAddress) error {
	qAcc := k.ak.GetAccount(ctx, address)
	if qAcc != nil {
		return errors.New("account existed")
	}
	defer telemetry.IncrCounter(1, "new", "account")
	k.ak.SetAccount(ctx, k.ak.NewAccountWithAddress(ctx, address))
	return nil
}

func (k msgServer) CreateCreatePool(goCtx context.Context, msg *types.MsgCreateCreatePool) (*types.MsgCreateCreatePoolResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	height, err := strconv.ParseInt(msg.BlockHeight, 10, 64)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("invalid block height %v", msg.BlockHeight))
	}
	history, get := k.vaultStaking.GetHistoricalInfo(ctx, height)
	if !get {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("too early, we cannot find the block %v", msg.BlockHeight))
	}

	// now we check whether the msg is sent from the validator
	validators := history.GetValset()
	isValidator := false
	for _, el := range validators {
		if el.GetOperator().Equals(msg.Creator) {
			isValidator = true
			break
		}
	}
	if !isValidator {
		ctx.Logger().Info("not a validator update tss message", "result", "false")
		return &types.MsgCreateCreatePoolResponse{Successful: false}, nil
	}

	var newProposal types.PoolProposal
	info, isFound := k.GetCreatePool(ctx, msg.BlockHeight)
	if isFound {
		entryFound := false
		for i, proposal := range info.Proposal {
			newProposal.PoolPubKey = proposal.PoolPubKey
			addr, err := PubKeyToPoolAddr(proposal.PoolPubKey)
			if err != nil {
				ctx.Logger().Info("not a valid address with err", "result", err)
				return nil, err
			}
			newProposal.PoolAddr = addr
			if proposal.GetPoolPubKey() == msg.PoolPubKey {
				proposal.Nodes = append(proposal.Nodes, msg.Creator)
				entryFound = true
				info.Proposal[i] = proposal
				break
			}
		}
		if !entryFound {
			newProposal.PoolPubKey = msg.PoolPubKey
			addr, err := PubKeyToPoolAddr(msg.PoolPubKey)
			if err != nil {
				ctx.Logger().Info("not a valid address with err", "result", err)
				return nil, err
			}
			newProposal.PoolAddr = addr
			newProposal.Nodes = []sdk.AccAddress{msg.Creator}
			info.Proposal = append(info.Proposal, &newProposal)
		}

	} else {
		addr, err := PubKeyToPoolAddr(msg.PoolPubKey)
		if err != nil {
			ctx.Logger().Info("not a valid address with err", "result", err)
			return nil, err
		}
		pro := types.PoolProposal{
			PoolPubKey: msg.PoolPubKey,
			PoolAddr:   addr,
			Nodes:      []sdk.AccAddress{msg.Creator},
		}
		info.Proposal = []*types.PoolProposal{&pro}

		err = k.setupAccount(ctx, addr)
		if err != nil {
			ctx.Logger().Info("account exist!!", "result")
			return nil, err
		}
	}
	createPool := types.CreatePool{
		BlockHeight: msg.BlockHeight,
		Validators:  validators,
		Proposal:    info.Proposal,
	}

	k.SetCreatePool(
		ctx,
		createPool,
	)

	return &types.MsgCreateCreatePoolResponse{Successful: true}, nil
}
