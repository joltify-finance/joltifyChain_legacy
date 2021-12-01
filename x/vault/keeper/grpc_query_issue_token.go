package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"gitlab.com/joltify/joltifychain/x/vault/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) IssueTokenAll(c context.Context, req *types.QueryAllIssueTokenRequest) (*types.QueryAllIssueTokenResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var issueTokens []*types.IssueToken
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	issueTokenStore := prefix.NewStore(store, types.KeyPrefix(types.IssueTokenKey))

	pageRes, err := query.Paginate(issueTokenStore, req.Pagination, func(key []byte, value []byte) error {
		var issueToken types.IssueToken
		if err := k.cdc.UnmarshalBinaryBare(value, &issueToken); err != nil {
			return err
		}

		issueTokens = append(issueTokens, &issueToken)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllIssueTokenResponse{IssueToken: issueTokens, Pagination: pageRes}, nil
}

func (k Keeper) IssueToken(c context.Context, req *types.QueryGetIssueTokenRequest) (*types.QueryGetIssueTokenResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	val, found := k.GetIssueToken(ctx, req.Index)
	if !found {
		return nil, status.Error(codes.InvalidArgument, "not found")
	}

	return &types.QueryGetIssueTokenResponse{IssueToken: &val}, nil
}
