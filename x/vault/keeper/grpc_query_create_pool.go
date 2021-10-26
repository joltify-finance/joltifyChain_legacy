package keeper

import (
	"context"
	"strconv"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/joltify/joltifyChain/x/vault/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) CreatePoolAll(c context.Context, req *types.QueryAllCreatePoolRequest) (*types.QueryAllCreatePoolResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var proposals []*types.PoolProposal
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	createPoolStore := prefix.NewStore(store, types.KeyPrefix(types.CreatePoolKey))

	pageRes, err := query.Paginate(createPoolStore, req.Pagination, func(key []byte, value []byte) error {
		var createPool types.CreatePool
		if err := k.cdc.UnmarshalBinaryBare(value, &createPool); err != nil {
			return err
		}

		// since 2/3 nodes are honest, so we will not have 5/5 situation
		maxLength := 0
		proposalIndex := 0
		for index, proposal := range createPool.Proposal {
			length := len(proposal.Nodes)
			if maxLength > length {
				proposalIndex = index
				maxLength = length
			}
		}

		proposals = append(proposals, createPool.Proposal[proposalIndex])
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllCreatePoolResponse{CreatePool: proposals, Pagination: pageRes}, nil
}

func (k Keeper) CreatePool(c context.Context, req *types.QueryGetCreatePoolRequest) (*types.QueryGetCreatePoolResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	val, found := k.GetCreatePool(ctx, req.Index)
	if !found {
		return nil, status.Error(codes.InvalidArgument, "not found")
	}

	// since 2/3 nodes are honest, so we will not have 5/5 situation
	maxLength := 0
	proposalIndex := 0
	for index, proposal := range val.Proposal {
		length := len(proposal.Nodes)
		if maxLength > length {
			proposalIndex = index
			maxLength = length
		}
	}

	return &types.QueryGetCreatePoolResponse{CreatePool: val.Proposal[proposalIndex]}, nil
}

func (k Keeper) GetLastPool(c context.Context, req *types.QueryLatestPoolRequest) (*types.QueryLastPoolResponse, error) {

	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)
	blockHeight := ctx.BlockHeight()

	churnHeight := k.GetParams(ctx).BlockChurnInterval

	poolBlock := (blockHeight / churnHeight) * churnHeight

	// if the current block height is 50, the height will be larger than blockHeight
	if poolBlock+1 >= blockHeight {
		poolBlock -= churnHeight
	}
	height := strconv.FormatInt(poolBlock+1, 10)

	val, found := k.GetCreatePool(ctx, height)
	if !found {
		return nil, status.Error(codes.InvalidArgument, "not found")
	}

	// since 2/3 nodes are honest, so we will not have 5/5 situation
	maxLength := 0
	proposalIndex := 0
	for index, proposal := range val.Proposal {
		length := len(proposal.Nodes)
		if maxLength > length {
			proposalIndex = index
			maxLength = length
		}
	}

	return &types.QueryLastPoolResponse{BlockHeight: height, CreatePool: val.Proposal[proposalIndex]}, nil

}
