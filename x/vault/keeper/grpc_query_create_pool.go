package keeper

import (
	"context"
	"strconv"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"gitlab.com/joltify/joltifychain/x/vault/types"
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

		proposal := getProposal(createPool.Proposal)
		proposals = append(proposals, proposal)
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
	proposal := getProposal(val.Proposal)
	return &types.QueryGetCreatePoolResponse{CreatePool: proposal}, nil
}

func (k Keeper) GetLastPool(c context.Context, req *types.QueryLatestPoolRequest) (*types.QueryLastPoolResponse, error) {
	var allProposal []*types.PoolInfo
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)
	blockHeight := ctx.BlockHeight()

	churnHeight := k.GetParams(ctx).BlockChurnInterval

	poolBlock := (blockHeight / churnHeight) * churnHeight

	var valLatest types.CreatePool
	var found bool
	var height string
	// if the current block height is 50, the height will be larger than blockHeight
	if poolBlock+1 >= blockHeight {
		poolBlock -= churnHeight
	}
	for {
		height = strconv.FormatInt(poolBlock+1, 10)
		valLatest, found = k.GetCreatePool(ctx, height)
		if found {
			break
		}
		if poolBlock < 10 {
			return nil, status.Error(codes.InvalidArgument, "not found")
		}
		poolBlock -= churnHeight
	}

	proposalLast := getProposal(valLatest.Proposal)
	lastProposal := types.PoolInfo{
		BlockHeight: height,
		CreatePool:  proposalLast,
	}

	allProposal = append(allProposal, &lastProposal)

	height = strconv.FormatInt(poolBlock+1-churnHeight, 10)

	valLatest2, found := k.GetCreatePool(ctx, height)
	if found {
		proposalLast2 := getProposal(valLatest2.Proposal)
		lastProposal := types.PoolInfo{
			BlockHeight: height,
			CreatePool:  proposalLast2,
		}
		allProposal = append(allProposal, &lastProposal)
	}

	return &types.QueryLastPoolResponse{Pools: allProposal}, nil
}

func getProposal(proposals []*types.PoolProposal) *types.PoolProposal {
	// since 2/3 nodes are honest, so we will not have 5/5 situation
	maxLength := 0
	proposalIndex := 0
	for index, proposal := range proposals {
		length := len(proposal.Nodes)
		if maxLength > length {
			proposalIndex = index
			maxLength = length
		}
	}
	return proposals[proposalIndex]
}
