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

func (k Keeper) GetAllValidators(goCtx context.Context, req *types.QueryAllValidatorsRequest) (*types.QueryAllValidatorsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)
	store := ctx.KVStore(k.storeKey)
	validatorsStore := prefix.NewStore(store, types.KeyPrefix(types.ValidatorsStoreKey))
	var allValidators []*types.Validators
	pageRes, err := query.Paginate(validatorsStore, req.Pagination, func(key []byte, value []byte) error {
		var v types.Validators
		if err := k.cdc.Unmarshal(value, &v); err != nil {
			return err
		}
		allValidators = append(allValidators, &v)
		return nil
	})
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllValidatorsResponse{AllValidators: allValidators, Pagination: pageRes}, nil

}

func (k Keeper) GetValidators(c context.Context, req *types.QueryGetValidatorsRequest) (*types.QueryGetValidatorsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	val, found := k.GetValidatorsByHeight(ctx, req.Height)
	if !found {
		return nil, status.Error(codes.InvalidArgument, "not found")
	}

	return &types.QueryGetValidatorsResponse{Validators: &val}, nil
}
