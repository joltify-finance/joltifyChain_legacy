package keeper_test

import (
	"fmt"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"gitlab.com/joltify/joltifychain/x/vault/types"
)

func TstIssueTokenMsgServerCreate(t *testing.T) {
	k, srv, wctx := setupMsgServer(t)
	ctx := sdk.UnwrapSDKContext(wctx)
	creator := "jolt1xdpg5l3pxpyhxqg4ey4krq2pf9d3sphmmuuugg"
	creatorAddr, err := sdk.AccAddressFromBech32(creator)
	assert.Nil(t, err)
	for i := 0; i < 5; i++ {
		idx := fmt.Sprintf("%d", i)
		expected := &types.MsgCreateIssueToken{Creator: creatorAddr, Index: idx}
		_, err := srv.CreateIssueToken(wctx, expected)
		require.NoError(t, err)
		rst, found := k.GetIssueToken(ctx, expected.Index)
		require.True(t, found)
		assert.Equal(t, expected.Creator, rst.Creator)
	}
}
