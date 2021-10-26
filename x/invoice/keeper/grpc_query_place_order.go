package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/joltify/joltifyChain/x/invoice/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) PlaceOrderAll(c context.Context, req *types.QueryAllPlaceOrderRequest) (*types.QueryAllPlaceOrderResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var placeOrders []*types.PlaceOrder
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	placeOrderStore := prefix.NewStore(store, types.KeyPrefix(types.PlaceOrderKey))

	pageRes, err := query.Paginate(placeOrderStore, req.Pagination, func(key []byte, value []byte) error {
		var placeOrder types.PlaceOrder
		if err := k.cdc.UnmarshalBinaryBare(value, &placeOrder); err != nil {
			return err
		}

		placeOrders = append(placeOrders, &placeOrder)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllPlaceOrderResponse{PlaceOrder: placeOrders, Pagination: pageRes}, nil
}

func (k Keeper) PlaceOrder(c context.Context, req *types.QueryGetPlaceOrderRequest) (*types.QueryGetPlaceOrderResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	val, found := k.GetPlaceOrder(ctx, req.Index)
	if !found {
		return nil, status.Error(codes.InvalidArgument, "not found")
	}

	return &types.QueryGetPlaceOrderResponse{PlaceOrder: &val}, nil
}
