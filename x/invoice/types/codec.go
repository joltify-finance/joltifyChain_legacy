package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

func RegisterCodec(cdc *codec.LegacyAmino) {
	// this line is used by starport scaffolding # 2
	cdc.RegisterConcrete(&MsgCreatePlaceOrder{}, "invoice/CreatePlaceOrder", nil)

	cdc.RegisterConcrete(&MsgCreateSellOrder{}, "invoice/CreateSellOrder", nil)
	cdc.RegisterConcrete(&MsgDeleteSellOrder{}, "invoice/DeleteSellOrder", nil)

	cdc.RegisterConcrete(&MsgCreateInvoice{}, "invoice/CreateInvoice", nil)
	cdc.RegisterConcrete(&MsgDeleteInvoice{}, "invoice/DeleteInvoice", nil)
}

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	// this line is used by starport scaffolding # 3
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCreatePlaceOrder{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCreateSellOrder{},
		&MsgDeleteSellOrder{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCreateInvoice{},
		&MsgDeleteInvoice{},
	)

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}

var (
	amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewProtoCodec(cdctypes.NewInterfaceRegistry())
)
