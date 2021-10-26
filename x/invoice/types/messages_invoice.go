package types

import (
	"errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"strconv"
)

var _ sdk.Msg = &MsgCreateInvoice{}

func NewMsgCreateInvoice(creator, owner sdk.AccAddress, name string, amount sdk.Int, url string, apy string, isRootOwner bool) *MsgCreateInvoice {
	return &MsgCreateInvoice{
		Creator:     creator,
		Name:        name,
		Url:         url,
		OrigOwner:   owner,
		Amount:      amount,
		Apy:         apy,
		IsRootOwner: isRootOwner,
	}
}

func (msg *MsgCreateInvoice) Route() string {
	return RouterKey
}

func (msg *MsgCreateInvoice) Type() string {
	return "CreateInvoice"
}

func (msg *MsgCreateInvoice) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Creator}
}

func (msg *MsgCreateInvoice) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateInvoice) ValidateBasic() error {
	if msg.Amount.IsNegative() {
		return errors.New("the amount cannnot be negtive")
	}
	apy, err := strconv.ParseFloat(msg.Apy, 32)
	if err != nil {
		return err
	}
	if apy < 0 {
		return errors.New("the APY should not small than 0")
	}
	return nil
}

var _ sdk.Msg = &MsgDeleteInvoice{}

func NewMsgDeleteInvoice(creator, owner sdk.AccAddress, name string) *MsgDeleteInvoice {
	return &MsgDeleteInvoice{
		Creator:   creator,
		Name:      name,
		OrigOwner: owner,
	}
}

func (msg *MsgDeleteInvoice) Route() string {
	return RouterKey
}

func (msg *MsgDeleteInvoice) Type() string {
	return "DeleteInvoice"
}

func (msg *MsgDeleteInvoice) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Creator}
}

func (msg *MsgDeleteInvoice) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgDeleteInvoice) ValidateBasic() error {
	return nil
}
