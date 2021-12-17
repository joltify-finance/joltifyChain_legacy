import { Reader, Writer } from 'protobufjs/minimal';
import { Duration } from '../google/protobuf/duration';
export declare const protobufPackage = "joltify.joltifychain.invoice";
/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgCreatePlaceOrder {
    creator: Uint8Array;
    sellOrderID: string;
    amount: Uint8Array;
    price: Uint8Array;
}
export interface MsgCreatePlaceOrderResponse {
    placeOrderID: string;
}
export interface MsgCreateSellOrder {
    creator: Uint8Array;
    sellInvoiceID: string;
    amount: Uint8Array;
    sellDuration: Duration | undefined;
    price: Uint8Array;
}
export interface MsgCreateSellOrderResponse {
    orderID: string;
}
export interface MsgDeleteSellOrder {
    creator: Uint8Array;
    sellOrderID: string;
}
export interface MsgDeleteSellOrderResponse {
}
export interface MsgCreateInvoice {
    creator: Uint8Array;
    name: string;
    url: string;
    /** bytes amount = 4  [(gogoproto.customtype) = "github.com/cosmos/cosmos-sdk/types.Dec", (gogoproto.nullable) = false]; */
    amount: string;
    /** string amount = 4 [(gogoproto.customtype) = "Int", (gogoproto.nullable) = false]; */
    origOwner: Uint8Array;
    apy: string;
    isRootOwner: boolean;
}
export interface MsgCreateInvoiceResponse {
    invoiceID: string;
}
export interface MsgDeleteInvoice {
    creator: Uint8Array;
    origOwner: Uint8Array;
    name: string;
}
export interface MsgDeleteInvoiceResponse {
}
export declare const MsgCreatePlaceOrder: {
    encode(message: MsgCreatePlaceOrder, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreatePlaceOrder;
    fromJSON(object: any): MsgCreatePlaceOrder;
    toJSON(message: MsgCreatePlaceOrder): unknown;
    fromPartial(object: DeepPartial<MsgCreatePlaceOrder>): MsgCreatePlaceOrder;
};
export declare const MsgCreatePlaceOrderResponse: {
    encode(message: MsgCreatePlaceOrderResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreatePlaceOrderResponse;
    fromJSON(object: any): MsgCreatePlaceOrderResponse;
    toJSON(message: MsgCreatePlaceOrderResponse): unknown;
    fromPartial(object: DeepPartial<MsgCreatePlaceOrderResponse>): MsgCreatePlaceOrderResponse;
};
export declare const MsgCreateSellOrder: {
    encode(message: MsgCreateSellOrder, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateSellOrder;
    fromJSON(object: any): MsgCreateSellOrder;
    toJSON(message: MsgCreateSellOrder): unknown;
    fromPartial(object: DeepPartial<MsgCreateSellOrder>): MsgCreateSellOrder;
};
export declare const MsgCreateSellOrderResponse: {
    encode(message: MsgCreateSellOrderResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateSellOrderResponse;
    fromJSON(object: any): MsgCreateSellOrderResponse;
    toJSON(message: MsgCreateSellOrderResponse): unknown;
    fromPartial(object: DeepPartial<MsgCreateSellOrderResponse>): MsgCreateSellOrderResponse;
};
export declare const MsgDeleteSellOrder: {
    encode(message: MsgDeleteSellOrder, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteSellOrder;
    fromJSON(object: any): MsgDeleteSellOrder;
    toJSON(message: MsgDeleteSellOrder): unknown;
    fromPartial(object: DeepPartial<MsgDeleteSellOrder>): MsgDeleteSellOrder;
};
export declare const MsgDeleteSellOrderResponse: {
    encode(_: MsgDeleteSellOrderResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteSellOrderResponse;
    fromJSON(_: any): MsgDeleteSellOrderResponse;
    toJSON(_: MsgDeleteSellOrderResponse): unknown;
    fromPartial(_: DeepPartial<MsgDeleteSellOrderResponse>): MsgDeleteSellOrderResponse;
};
export declare const MsgCreateInvoice: {
    encode(message: MsgCreateInvoice, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateInvoice;
    fromJSON(object: any): MsgCreateInvoice;
    toJSON(message: MsgCreateInvoice): unknown;
    fromPartial(object: DeepPartial<MsgCreateInvoice>): MsgCreateInvoice;
};
export declare const MsgCreateInvoiceResponse: {
    encode(message: MsgCreateInvoiceResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateInvoiceResponse;
    fromJSON(object: any): MsgCreateInvoiceResponse;
    toJSON(message: MsgCreateInvoiceResponse): unknown;
    fromPartial(object: DeepPartial<MsgCreateInvoiceResponse>): MsgCreateInvoiceResponse;
};
export declare const MsgDeleteInvoice: {
    encode(message: MsgDeleteInvoice, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteInvoice;
    fromJSON(object: any): MsgDeleteInvoice;
    toJSON(message: MsgDeleteInvoice): unknown;
    fromPartial(object: DeepPartial<MsgDeleteInvoice>): MsgDeleteInvoice;
};
export declare const MsgDeleteInvoiceResponse: {
    encode(_: MsgDeleteInvoiceResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteInvoiceResponse;
    fromJSON(_: any): MsgDeleteInvoiceResponse;
    toJSON(_: MsgDeleteInvoiceResponse): unknown;
    fromPartial(_: DeepPartial<MsgDeleteInvoiceResponse>): MsgDeleteInvoiceResponse;
};
/** Msg defines the Msg service. */
export interface Msg {
    /** this line is used by starport scaffolding # proto/tx/rpc */
    CreatePlaceOrder(request: MsgCreatePlaceOrder): Promise<MsgCreatePlaceOrderResponse>;
    CreateSellOrder(request: MsgCreateSellOrder): Promise<MsgCreateSellOrderResponse>;
    DeleteSellOrder(request: MsgDeleteSellOrder): Promise<MsgDeleteSellOrderResponse>;
    CreateInvoice(request: MsgCreateInvoice): Promise<MsgCreateInvoiceResponse>;
    DeleteInvoice(request: MsgDeleteInvoice): Promise<MsgDeleteInvoiceResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    CreatePlaceOrder(request: MsgCreatePlaceOrder): Promise<MsgCreatePlaceOrderResponse>;
    CreateSellOrder(request: MsgCreateSellOrder): Promise<MsgCreateSellOrderResponse>;
    DeleteSellOrder(request: MsgDeleteSellOrder): Promise<MsgDeleteSellOrderResponse>;
    CreateInvoice(request: MsgCreateInvoice): Promise<MsgCreateInvoiceResponse>;
    DeleteInvoice(request: MsgDeleteInvoice): Promise<MsgDeleteInvoiceResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
