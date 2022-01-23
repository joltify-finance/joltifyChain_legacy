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

func TestIssueTokenQuerySingle(t *testing.T) {
	setupBech32Prefix()
	k, _, wctx := setupMsgServer(t)
	ctx := sdk.UnwrapSDKContext(wctx)
	msgs, err := createNIssueToken(k, ctx, 2)
	assert.Nil(t, err)
	for _, tc := range []struct {
		desc     string
		request  *types.QueryGetIssueTokenRequest
		response *types.QueryGetIssueTokenResponse
		err      error
	}{
		{
			desc:     "First",
			request:  &types.QueryGetIssueTokenRequest{Index: msgs[0].Index},
			response: &types.QueryGetIssueTokenResponse{IssueToken: &msgs[0]},
		},
		{
			desc:     "Second",
			request:  &types.QueryGetIssueTokenRequest{Index: msgs[1].Index},
			response: &types.QueryGetIssueTokenResponse{IssueToken: &msgs[1]},
		},
		{
			desc:    "KeyNotFound",
			request: &types.QueryGetIssueTokenRequest{Index: "missing"},
			err:     status.Error(codes.InvalidArgument, "not found"),
		},
		{
			desc: "InvalidRequest",
			err:  status.Error(codes.InvalidArgument, "invalid request"),
		},
	} {
		tc := tc
		t.Run(tc.desc, func(t *testing.T) {
			response, err := k.IssueToken(wctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.Equal(t, tc.response, response)
			}
		})
	}
}

func TestIssueTokenQueryPaginated(t *testing.T) {
	setupBech32Prefix()
	k, _, wctx := setupMsgServer(t)
	ctx := sdk.UnwrapSDKContext(wctx)
	msgs, err := createNIssueToken(k, ctx, 5)
	assert.Nil(t, err)

	request := func(next []byte, offset, limit uint64, total bool) *types.QueryAllIssueTokenRequest {
		return &types.QueryAllIssueTokenRequest{
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
			resp, err := k.IssueTokenAll(wctx, request(nil, uint64(i), uint64(step), false))
			require.NoError(t, err)
			for j := i; j < len(msgs) && j < i+step; j++ {
				assert.Equal(t, &msgs[j], resp.IssueToken[j-i])
			}
		}
	})
	t.Run("ByKey", func(t *testing.T) {
		step := 2
		var next []byte
		for i := 0; i < len(msgs); i += step {
			resp, err := k.IssueTokenAll(wctx, request(next, 0, uint64(step), false))
			require.NoError(t, err)
			for j := i; j < len(msgs) && j < i+step; j++ {
				assert.Equal(t, &msgs[j], resp.IssueToken[j-i])
			}
			next = resp.Pagination.NextKey
		}
	})
	t.Run("Total", func(t *testing.T) {
		resp, err := k.IssueTokenAll(wctx, request(nil, 0, 0, true))
		require.NoError(t, err)
		require.Equal(t, len(msgs), int(resp.Pagination.Total))
	})
	t.Run("InvalidRequest", func(t *testing.T) {
		_, err := k.IssueTokenAll(wctx, nil)
		require.ErrorIs(t, err, status.Error(codes.InvalidArgument, "invalid request"))
	})
}
