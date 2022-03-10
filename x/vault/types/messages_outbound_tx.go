package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"strconv"
)

const (
	TypeMsgCreateOutboundTx = "create_outbound_tx"
)

var _ sdk.Msg = &MsgCreateOutboundTx{}

func NewMsgCreateOutboundTx(
	creator sdk.AccAddress,
	requestID string,
	outboundTx string,
	blockHeight string,
) *MsgCreateOutboundTx {
	return &MsgCreateOutboundTx{
		Creator:     creator,
		RequestID:   requestID,
		OutboundTx:  outboundTx,
		BlockHeight: blockHeight,
	}
}

func (msg *MsgCreateOutboundTx) Route() string {
	return RouterKey
}

func (msg *MsgCreateOutboundTx) Type() string {
	return TypeMsgCreateOutboundTx
}

func (msg *MsgCreateOutboundTx) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Creator}
}

func (msg *MsgCreateOutboundTx) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateOutboundTx) ValidateBasic() error {
	_, err := strconv.ParseUint(msg.BlockHeight, 10, 64)
	if err != nil {
		return err
	}
	return nil
}
