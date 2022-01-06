package types

import (
	"errors"
	"strconv"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

var _ sdk.Msg = &MsgCreateInvoice{}

func NewMsgCreateInvoice(creator, owner, name, amount, url, apy string, isRootOwner bool) *MsgCreateInvoice {
	return &MsgCreateInvoice{
		Creator:     creatorStr,
		Name:        name,
		Url:         url,
		OrigOwner:   ownerStr,
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
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return nil
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCreateInvoice) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateInvoice) ValidateBasic() error {
	amount, err := sdk.NewDecFromStr(msg.Amount)
	if err != nil {
		return err
	}
	if amount.IsNegative() {
		return errors.New("the amount cannot be negative")
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

func NewMsgDeleteInvoice(creator, owner, name string) *MsgDeleteInvoice {
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
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return nil
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgDeleteInvoice) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgDeleteInvoice) ValidateBasic() error {
	return nil
}
