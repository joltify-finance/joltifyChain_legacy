package keeper_test

import (
	"strconv"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	keepertest "gitlab.com/joltify/joltifychain/testutil/keeper"
	"gitlab.com/joltify/joltifychain/testutil/nullify"
	"gitlab.com/joltify/joltifychain/x/vault/types"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func TestOutboundTxQuerySingle(t *testing.T) {
	keeper, ctx := keepertest.SetupVaultKeeper(t)
	wctx := sdk.WrapSDKContext(ctx)
	msgs := createNOutboundTx(keeper, ctx, 2)
	for _, tc := range []struct {
		desc     string
		request  *types.QueryGetOutboundTxRequest
		response *types.QueryGetOutboundTxResponse
		err      error
	}{
		{
			desc: "First",
			request: &types.QueryGetOutboundTxRequest{
				RequestID: msgs[0].Index,
			},
			response: &types.QueryGetOutboundTxResponse{OutboundTx: msgs[0]},
		},
		{
			desc: "Second",
			request: &types.QueryGetOutboundTxRequest{
				RequestID: msgs[1].Index,
			},
			response: &types.QueryGetOutboundTxResponse{OutboundTx: msgs[1]},
		},
		{
			desc: "KeyNotFound",
			request: &types.QueryGetOutboundTxRequest{
				RequestID: strconv.Itoa(100000),
			},
			err: status.Error(codes.InvalidArgument, "not found"),
		},
		{
			desc: "InvalidRequest",
			err:  status.Error(codes.InvalidArgument, "invalid request"),
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			response, err := keeper.OutboundTx(wctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
				require.Equal(t,
					nullify.Fill(tc.response),
					nullify.Fill(response),
				)
			}
		})
	}
}

func TestOutboundTxQueryPaginated(t *testing.T) {
	keeper, ctx := keepertest.SetupVaultKeeper(t)
	wctx := sdk.WrapSDKContext(ctx)
	msgs := createNOutboundTx(keeper, ctx, 5)

	request := func(next []byte, offset, limit uint64, total bool) *types.QueryAllOutboundTxRequest {
		return &types.QueryAllOutboundTxRequest{
			Pagination: &query.PageRequest{
				Key:        next,
				Offset:     offset,
				Limit:      limit,
				CountTotal: total,
			},
		}
	}
	t.Run("ByOffset", func(t *testing.T) {
		step := 2
		for i := 0; i < len(msgs); i += step {
			resp, err := keeper.OutboundTxAll(wctx, request(nil, uint64(i), uint64(step), false))
			require.NoError(t, err)
			require.LessOrEqual(t, len(resp.OutboundTx), step)
			require.Subset(t,
				nullify.Fill(msgs),
				nullify.Fill(resp.OutboundTx),
			)
		}
	})
	t.Run("ByKey", func(t *testing.T) {
		step := 2
		var next []byte
		for i := 0; i < len(msgs); i += step {
			resp, err := keeper.OutboundTxAll(wctx, request(next, 0, uint64(step), false))
			require.NoError(t, err)
			require.LessOrEqual(t, len(resp.OutboundTx), step)
			require.Subset(t,
				nullify.Fill(msgs),
				nullify.Fill(resp.OutboundTx),
			)
			next = resp.Pagination.NextKey
		}
	})
	t.Run("Total", func(t *testing.T) {
		resp, err := keeper.OutboundTxAll(wctx, request(nil, 0, 0, true))
		require.NoError(t, err)
		require.Equal(t, len(msgs), int(resp.Pagination.Total))
		require.ElementsMatch(t,
			nullify.Fill(msgs),
			nullify.Fill(resp.OutboundTx),
		)
	})
	t.Run("InvalidRequest", func(t *testing.T) {
		_, err := keeper.OutboundTxAll(wctx, nil)
		require.ErrorIs(t, err, status.Error(codes.InvalidArgument, "invalid request"))
	})
}
