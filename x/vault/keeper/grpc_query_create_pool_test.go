package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"gitlab.com/joltify/joltifychain/x/vault/types"
)

func TestCreatePoolQuerySingle(t *testing.T) {
	app, _, wctx := setupMsgServer(t)
	k := &app.VaultKeeper
	ctx := sdk.UnwrapSDKContext(wctx)
	addressesStr := []string{"jolt1rfmwldwrm3652shx3a7say0v4vvtglast0l05d", "jolt1xdpg5l3pxpyhxqg4ey4krq2pf9d3sphmmuuugg", "jolt17fczazdur0g04jtedlwp837r0vzktvwc0gx0fg"}
	addresses := make([]sdk.AccAddress, 3)
	var err error
	for i := 0; i < 3; i++ {
		addresses[i], err = sdk.AccAddressFromBech32(addressesStr[i])
		assert.Nil(t, err)
	}

	msgs := createNCreatePool(k, ctx, 2, addresses)
	for _, tc := range []struct {
		desc     string
		request  *types.QueryGetCreatePoolRequest
		response *types.QueryGetCreatePoolResponse
		err      error
	}{
		{
			desc:     "First",
			request:  &types.QueryGetCreatePoolRequest{Index: msgs[0].BlockHeight},
			response: &types.QueryGetCreatePoolResponse{CreatePool: msgs[0].Proposal[0]},
		},
		{
			desc:     "Second",
			request:  &types.QueryGetCreatePoolRequest{Index: msgs[1].BlockHeight},
			response: &types.QueryGetCreatePoolResponse{CreatePool: msgs[1].Proposal[0]},
		},
		{
			desc:    "KeyNotFound",
			request: &types.QueryGetCreatePoolRequest{Index: "missing"},
			err:     status.Error(codes.InvalidArgument, "not found"),
		},
		{
			desc: "InvalidRequest",
			err:  status.Error(codes.InvalidArgument, "invalid request"),
		},
	} {
		tc := tc
		t.Run(tc.desc, func(t *testing.T) {
			response, err := k.CreatePool(wctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.Equal(t, tc.response, response)
			}
		})
	}
}

func TestCreatePoolQueryPaginated(t *testing.T) {
	addressesStr := []string{"jolt1rfmwldwrm3652shx3a7say0v4vvtglast0l05d", "jolt1xdpg5l3pxpyhxqg4ey4krq2pf9d3sphmmuuugg", "jolt17fczazdur0g04jtedlwp837r0vzktvwc0gx0fg"}
	addresses := make([]sdk.AccAddress, 3)
	var err error
	for i := 0; i < 3; i++ {
		addresses[i], err = sdk.AccAddressFromBech32(addressesStr[i])
		assert.Nil(t, err)
	}
	app, _, wctx := setupMsgServer(t)
	ctx := sdk.UnwrapSDKContext(wctx)
	k := &app.VaultKeeper
	msgs := createNCreatePool(k, ctx, 5, addresses)

	request := func(next []byte, offset, limit uint64, total bool) *types.QueryAllCreatePoolRequest {
		return &types.QueryAllCreatePoolRequest{
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
			resp, err := k.CreatePoolAll(wctx, request(nil, uint64(i), uint64(step), false))
			require.NoError(t, err)
			for j := i; j < len(msgs) && j < i+step; j++ {
				assert.Equal(t, msgs[j].Proposal[0].PoolPubKey, resp.CreatePool[j-i].PoolPubKey)
			}
		}
	})
	t.Run("ByKey", func(t *testing.T) {
		step := 2
		var next []byte
		for i := 0; i < len(msgs); i += step {
			resp, err := k.CreatePoolAll(wctx, request(next, 0, uint64(step), false))
			require.NoError(t, err)
			for j := i; j < len(msgs) && j < i+step; j++ {
				assert.Equal(t, msgs[j].Proposal[0].PoolPubKey, resp.CreatePool[j-i].PoolPubKey)
			}
			next = resp.Pagination.NextKey
		}
	})
	t.Run("Total", func(t *testing.T) {
		resp, err := k.CreatePoolAll(wctx, request(nil, 0, 0, true))
		require.NoError(t, err)
		require.Equal(t, len(msgs), int(resp.Pagination.Total))
	})
	t.Run("InvalidRequest", func(t *testing.T) {
		_, err := k.CreatePoolAll(wctx, nil)
		require.ErrorIs(t, err, status.Error(codes.InvalidArgument, "invalid request"))
	})
}
