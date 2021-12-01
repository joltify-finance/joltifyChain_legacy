package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"gitlab.com/joltify/joltifychain/x/invoice/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) SellOrderAll(c context.Context, req *types.QueryAllSellOrderRequest) (*types.QueryAllSellOrderResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var sellOrders []*types.SellOrder
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	sellOrderStore := prefix.NewStore(store, types.KeyPrefix(types.SellOrderKey))

	pageRes, err := query.Paginate(sellOrderStore, req.Pagination, func(key []byte, value []byte) error {
		var sellOrder types.SellOrder
		if err := k.cdc.UnmarshalBinaryBare(value, &sellOrder); err != nil {
			return err
		}

		sellOrders = append(sellOrders, &sellOrder)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllSellOrderResponse{SellOrder: sellOrders, Pagination: pageRes}, nil
}

func (k Keeper) SellOrder(c context.Context, req *types.QueryGetSellOrderRequest) (*types.QueryGetSellOrderResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	val, found := k.GetSellOrder(ctx, req.Index)
	if !found {
		return nil, status.Error(codes.InvalidArgument, "not found")
	}

	return &types.QueryGetSellOrderResponse{SellOrder: &val}, nil
}
