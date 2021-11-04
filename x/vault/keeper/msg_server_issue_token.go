package keeper

import (
	"context"
	"fmt"
	sdk "github.com/cosmos/cosmos-sdk/types"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/joltify/joltifyChain/x/vault/types"
)

func (k msgServer) CreateIssueToken(goCtx context.Context, msg *types.MsgCreateIssueToken) (*types.MsgCreateIssueTokenResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Check if the value already exists
	_, isFound := k.GetIssueToken(ctx, msg.Index)
	if isFound {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("index %v already set", msg.Index))
	}

	pools, err := k.getLastTwoPools(goCtx)
	if err != nil {
		return nil, err
	}

	inPool := k.checkAddressInPool(pools, msg.Creator.Bytes())
	if !inPool {
		return &types.MsgCreateIssueTokenResponse{Successful: false}, nil
	}
	err = k.bankKeeper.MintCoins(ctx, types.ModuleName, sdk.NewCoins(msg.Coin))
	if err != nil {
		k.Logger(ctx).Error("fail to mint token")
		return nil, err
	}
	err = k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, msg.Receiver, sdk.NewCoins(msg.Coin))
	if err != nil {
		k.Logger(ctx).Error("fail to send token to account")
		return nil, err
	}

	issueToken := types.IssueToken{
		Index:    msg.Index,
		Creator:  msg.Creator,
		Coin:     &msg.Coin,
		Receiver: msg.Receiver,
	}

	k.SetIssueToken(
		ctx,
		issueToken,
	)

	return &types.MsgCreateIssueTokenResponse{Successful: true}, nil
}
