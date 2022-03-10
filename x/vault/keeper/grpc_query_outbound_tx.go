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

func (k Keeper) OutboundTxAll(c context.Context, req *types.QueryAllOutboundTxRequest) (*types.QueryAllOutboundTxResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var outboundTxs []types.OutboundTx
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	outboundTxStore := prefix.NewStore(store, types.KeyPrefix(types.OutboundTxKeyPrefix))

	pageRes, err := query.Paginate(outboundTxStore, req.Pagination, func(key []byte, value []byte) error {
		var outboundTx types.OutboundTx
		if err := k.cdc.Unmarshal(value, &outboundTx); err != nil {
			return err
		}

		outboundTxs = append(outboundTxs, outboundTx)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllOutboundTxResponse{OutboundTx: outboundTxs, Pagination: pageRes}, nil
}

func (k Keeper) OutboundTx(c context.Context, req *types.QueryGetOutboundTxRequest) (*types.QueryGetOutboundTxResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	val, found := k.GetOutboundTx(
		ctx,
		req.RequestID,
	)
	if !found {
		return nil, status.Error(codes.InvalidArgument, "not found")
	}

	return &types.QueryGetOutboundTxResponse{OutboundTx: val}, nil
}
