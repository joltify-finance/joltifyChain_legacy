package keeper_test

import (
	"github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/stretchr/testify/assert"
	"strconv"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"

	"math/rand"
	"time"

	keepertest "gitlab.com/joltify/joltifychain/testutil/keeper"
	"gitlab.com/joltify/joltifychain/x/vault/keeper"
	"gitlab.com/joltify/joltifychain/x/vault/types"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func TestOutboundTxMsgServerCreate(t *testing.T) {
	setupBech32Prefix()
	k, ctx := keepertest.SetupVaultKeeper(t)
	srv := keeper.NewMsgServerImpl(*k)
	wctx := sdk.WrapSDKContext(ctx)

	r := rand.New(rand.NewSource(time.Now().Unix()))
	accs := simulation.RandomAccounts(r, 1)

	expected := &types.MsgCreateOutboundTx{Creator: accs[0].Address,
		RequestID:   strconv.Itoa(12),
		BlockHeight: "100",
		OutboundTx:  "123",
	}
	//if it is not the validator, it should fail to submit the proposal
	ret, err := srv.CreateOutboundTx(wctx, expected)
	require.NoError(t, err)
	require.Equal(t, ret.Successful, false)

	creatorStr := "jolt1f0atl7egduue8a07j42hyklct0sqa68wxem3lg"
	creator, err := sdk.AccAddressFromBech32(creatorStr)
	assert.Nil(t, err)

	for i := 0; i < 5; i++ {
		expected := &types.MsgCreateOutboundTx{Creator: creator,
			RequestID:   strconv.Itoa(i),
			BlockHeight: "100",
			OutboundTx:  "123",
		}
		ret, err := srv.CreateOutboundTx(wctx, expected)
		require.True(t, ret.Successful)
		require.NoError(t, err)

		index := crypto.Keccak256Hash([]byte(expected.RequestID), []byte(expected.BlockHeight))
		rst, found := k.GetOutboundTx(ctx,
			index.Hex(),
		)
		require.True(t, found)
		require.Equal(t, len(rst.Items), 1)
		require.Equal(t, expected.Creator.String(), rst.Items["123"].Address[0].String())
	}
}
