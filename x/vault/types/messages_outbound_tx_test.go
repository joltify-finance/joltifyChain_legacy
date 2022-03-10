package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/assert"
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/stretchr/testify/require"
	"gitlab.com/joltify/joltifychain/testutil/sample"
)

func TestMsgCreateOutboundTx_ValidateBasic(t *testing.T) {
	s1, err := sdk.AccAddressFromBech32(sample.AccAddress())
	assert.Nil(t, err)
	tests := []struct {
		name string
		msg  MsgCreateOutboundTx
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgCreateOutboundTx{
				Creator: nil,
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgCreateOutboundTx{
				Creator: s1,
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := tt.msg.ValidateBasic()
			if tt.err != nil {
				require.ErrorIs(t, err, tt.err)
				return
			}
			require.NoError(t, err)
		})
	}
}
