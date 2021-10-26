package types

import (
	"errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

var _ sdk.Msg = &MsgCreatePlaceOrder{}

func NewMsgCreatePlaceOrder(creator sdk.AccAddress, sellOrderID string, amount sdk.Int) *MsgCreatePlaceOrder {
	return &MsgCreatePlaceOrder{
		Creator:     creator,
		SellOrderID: sellOrderID,
		Amount:      amount,
	}
}

func (msg *MsgCreatePlaceOrder) Route() string {
	return RouterKey
}

func (msg *MsgCreatePlaceOrder) Type() string {
	return "CreatePlaceOrder"
}

func (msg *MsgCreatePlaceOrder) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Creator}
}

func (msg *MsgCreatePlaceOrder) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreatePlaceOrder) ValidateBasic() error {
	if msg.Amount.IsNegative() {
		return errors.New("invalid amount")
	}
	return nil
}
