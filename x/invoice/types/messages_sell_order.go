package types

import (
	"errors"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

var _ sdk.Msg = &MsgCreateSellOrder{}

func NewMsgCreateSellOrder(creator sdk.AccAddress, invoiceID string, amount, price sdk.Int, duration time.Duration) *MsgCreateSellOrder {
	return &MsgCreateSellOrder{
		Creator:       creator,
		SellInvoiceID: invoiceID,
		Amount:        amount,
		Price:         price,
		SellDuration:  duration,
	}
}

func (msg *MsgCreateSellOrder) Route() string {
	return RouterKey
}

func (msg *MsgCreateSellOrder) Type() string {
	return "CreateSellOrder"
}

func (msg *MsgCreateSellOrder) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Creator}
}

func (msg *MsgCreateSellOrder) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateSellOrder) ValidateBasic() error {
	if msg.Amount.IsNegative() || msg.Price.IsNegative() {
		return errors.New("invalid amount or price put")
	}
	return nil
}

var _ sdk.Msg = &MsgDeleteSellOrder{}

func NewMsgDeleteSellOrder(creator sdk.AccAddress, index string) *MsgDeleteSellOrder {
	return &MsgDeleteSellOrder{
		Creator:     creator,
		SellOrderID: index,
	}
}

func (msg *MsgDeleteSellOrder) Route() string {
	return RouterKey
}

func (msg *MsgDeleteSellOrder) Type() string {
	return "DeleteSellOrder"
}

func (msg *MsgDeleteSellOrder) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Creator}
}

func (msg *MsgDeleteSellOrder) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgDeleteSellOrder) ValidateBasic() error {
	return nil
}
