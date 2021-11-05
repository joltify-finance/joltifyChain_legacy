package keeper

import (
	"fmt"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"gitlab.com/joltify/joltifychain/joltifychain/x/vault/types"
)

func TestIssueTokenMsgServerCreate(t *testing.T) {
	keeper, ctx := setupKeeper(t)
	srv := NewMsgServerImpl(*keeper)
	wctx := sdk.WrapSDKContext(ctx)
	creator := "A"
	for i := 0; i < 5; i++ {
		idx := fmt.Sprintf("%d", i)
		expected := &types.MsgCreateIssueToken{Creator: creator, Index: idx}
		_, err := srv.CreateIssueToken(wctx, expected)
		require.NoError(t, err)
		rst, found := keeper.GetIssueToken(ctx, expected.Index)
		require.True(t, found)
		assert.Equal(t, expected.Creator, rst.Creator)
	}
}
