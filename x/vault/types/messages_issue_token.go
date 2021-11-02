package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
)

var _ sdk.Msg = &MsgCreateIssueToken{}

func NewMsgCreateIssueToken(creator string, index string, coinStr string, receiver string) (*MsgCreateIssueToken, error) {
	coins, err := sdk.ParseCoinsNormalized(coinStr)
	if err!=nil ||len(coins)!=1{
		return nil,err
	}
	creatorAddr, err := sdk.AccAddressFromBech32(creator)
	if err != nil {
		return nil, err
	}

	receiverAddr, err := sdk.AccAddressFromBech32(receiver)
	if err != nil {
		return nil, err
	}

	return &MsgCreateIssueToken{
		Index: index,
		Creator:  creatorAddr,
		Coin:    coins[0],
		Receiver: receiverAddr,
	}, nil
}

func (msg *MsgCreateIssueToken) Route() string {
	return RouterKey
}

func (msg *MsgCreateIssueToken) Type() string {
	return "CreateIssueToken"
}

func (msg *MsgCreateIssueToken) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Creator}
}

func (msg *MsgCreateIssueToken) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateIssueToken) ValidateBasic() error {
	return nil
}
