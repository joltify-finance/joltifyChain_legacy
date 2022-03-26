package keeper

import (
	"context"
	"fmt"
	"github.com/ethereum/go-ethereum/crypto"
	"strconv"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"gitlab.com/joltify/joltifychain/x/vault/types"
)

func (k msgServer) CreateOutboundTx(goCtx context.Context, msg *types.MsgCreateOutboundTx) (*types.MsgCreateOutboundTxResponse, error) {
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
		return &types.MsgCreateOutboundTxResponse{Successful: false}, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintln("not a validator"))
	}

	index := crypto.Keccak256Hash([]byte(msg.RequestID), []byte(msg.BlockHeight))

	info, isFound := k.GetOutboundTx(ctx, index.Hex())
	if isFound {
		address, ok := info.Items[msg.OutboundTx]
		if ok {
			for _, el := range address.Address {
				if el.Equals(msg.Creator) {
					ctx.Logger().Info("the creator has already submitted the outbound tx")
					return &types.MsgCreateOutboundTxResponse{Successful: false},  sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintln("already submitted"))
				}
			}
			address.Address = append(address.Address, msg.Creator)
			info.Items[msg.OutboundTx] = address
			k.SetOutboundTx(
				ctx,
				info,
			)
			return &types.MsgCreateOutboundTxResponse{Successful: true}, nil
		}

		info.Items[msg.OutboundTx] = types.Address{Address: []sdk.AccAddress{msg.Creator}}
		k.SetOutboundTx(
			ctx,
			info,
		)
		return &types.MsgCreateOutboundTxResponse{Successful: true}, nil
	}

	items := make(map[string]types.Address)
	items[msg.OutboundTx] = types.Address{Address: []sdk.AccAddress{msg.Creator}}
	newInfo := types.OutboundTx{
		Index: index.Hex(),
		Items: items,
	}

	k.SetOutboundTx(
		ctx,
		newInfo,
	)
	return &types.MsgCreateOutboundTxResponse{Successful: true}, nil

}
