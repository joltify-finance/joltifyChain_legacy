import { Reader, Writer } from 'protobufjs/minimal';
import { PlaceOrder } from '../invoice/place_order';
import { PageRequest, PageResponse } from '../cosmos/base/query/v1beta1/pagination';
import { SellOrder } from '../invoice/sell_order';
import { Invoice } from '../invoice/invoice';
export declare const protobufPackage = "joltify.joltifychain.invoice";
/** this line is used by starport scaffolding # 3 */
export interface QueryGetPlaceOrderRequest {
    index: string;
}
export interface QueryGetPlaceOrderResponse {
    PlaceOrder: PlaceOrder | undefined;
}
export interface QueryAllPlaceOrderRequest {
    pagination: PageRequest | undefined;
}
export interface QueryAllPlaceOrderResponse {
    PlaceOrder: PlaceOrder[];
    pagination: PageResponse | undefined;
}
export interface QueryGetSellOrderRequest {
    index: string;
}
export interface QueryGetSellOrderResponse {
    SellOrder: SellOrder | undefined;
}
export interface QueryAllSellOrderRequest {
    pagination: PageRequest | undefined;
}
export interface QueryAllSellOrderResponse {
    SellOrder: SellOrder[];
    pagination: PageResponse | undefined;
}
export interface QueryGetInvoiceRequest {
    index: string;
}
export interface QueryGetInvoiceResponse {
    Invoice: Invoice | undefined;
}
export interface QueryAllInvoiceRequest {
    pagination: PageRequest | undefined;
}
export interface QueryAllInvoiceResponse {
    Invoice: Invoice[];
    pagination: PageResponse | undefined;
}
export declare const QueryGetPlaceOrderRequest: {
    encode(message: QueryGetPlaceOrderRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetPlaceOrderRequest;
    fromJSON(object: any): QueryGetPlaceOrderRequest;
    toJSON(message: QueryGetPlaceOrderRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetPlaceOrderRequest>): QueryGetPlaceOrderRequest;
};
export declare const QueryGetPlaceOrderResponse: {
    encode(message: QueryGetPlaceOrderResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetPlaceOrderResponse;
    fromJSON(object: any): QueryGetPlaceOrderResponse;
    toJSON(message: QueryGetPlaceOrderResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetPlaceOrderResponse>): QueryGetPlaceOrderResponse;
};
export declare const QueryAllPlaceOrderRequest: {
    encode(message: QueryAllPlaceOrderRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllPlaceOrderRequest;
    fromJSON(object: any): QueryAllPlaceOrderRequest;
    toJSON(message: QueryAllPlaceOrderRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllPlaceOrderRequest>): QueryAllPlaceOrderRequest;
};
export declare const QueryAllPlaceOrderResponse: {
    encode(message: QueryAllPlaceOrderResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllPlaceOrderResponse;
    fromJSON(object: any): QueryAllPlaceOrderResponse;
    toJSON(message: QueryAllPlaceOrderResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllPlaceOrderResponse>): QueryAllPlaceOrderResponse;
};
export declare const QueryGetSellOrderRequest: {
    encode(message: QueryGetSellOrderRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetSellOrderRequest;
    fromJSON(object: any): QueryGetSellOrderRequest;
    toJSON(message: QueryGetSellOrderRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetSellOrderRequest>): QueryGetSellOrderRequest;
};
export declare const QueryGetSellOrderResponse: {
    encode(message: QueryGetSellOrderResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetSellOrderResponse;
    fromJSON(object: any): QueryGetSellOrderResponse;
    toJSON(message: QueryGetSellOrderResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetSellOrderResponse>): QueryGetSellOrderResponse;
};
export declare const QueryAllSellOrderRequest: {
    encode(message: QueryAllSellOrderRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllSellOrderRequest;
    fromJSON(object: any): QueryAllSellOrderRequest;
    toJSON(message: QueryAllSellOrderRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllSellOrderRequest>): QueryAllSellOrderRequest;
};
export declare const QueryAllSellOrderResponse: {
    encode(message: QueryAllSellOrderResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllSellOrderResponse;
    fromJSON(object: any): QueryAllSellOrderResponse;
    toJSON(message: QueryAllSellOrderResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllSellOrderResponse>): QueryAllSellOrderResponse;
};
export declare const QueryGetInvoiceRequest: {
    encode(message: QueryGetInvoiceRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetInvoiceRequest;
    fromJSON(object: any): QueryGetInvoiceRequest;
    toJSON(message: QueryGetInvoiceRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetInvoiceRequest>): QueryGetInvoiceRequest;
};
export declare const QueryGetInvoiceResponse: {
    encode(message: QueryGetInvoiceResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetInvoiceResponse;
    fromJSON(object: any): QueryGetInvoiceResponse;
    toJSON(message: QueryGetInvoiceResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetInvoiceResponse>): QueryGetInvoiceResponse;
};
export declare const QueryAllInvoiceRequest: {
    encode(message: QueryAllInvoiceRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllInvoiceRequest;
    fromJSON(object: any): QueryAllInvoiceRequest;
    toJSON(message: QueryAllInvoiceRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllInvoiceRequest>): QueryAllInvoiceRequest;
};
export declare const QueryAllInvoiceResponse: {
    encode(message: QueryAllInvoiceResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllInvoiceResponse;
    fromJSON(object: any): QueryAllInvoiceResponse;
    toJSON(message: QueryAllInvoiceResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllInvoiceResponse>): QueryAllInvoiceResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /** Queries a placeOrder by index. */
    PlaceOrder(request: QueryGetPlaceOrderRequest): Promise<QueryGetPlaceOrderResponse>;
    /** Queries a list of placeOrder items. */
    PlaceOrderAll(request: QueryAllPlaceOrderRequest): Promise<QueryAllPlaceOrderResponse>;
    /** Queries a sellOrder by index. */
    SellOrder(request: QueryGetSellOrderRequest): Promise<QueryGetSellOrderResponse>;
    /** Queries a list of sellOrder items. */
    SellOrderAll(request: QueryAllSellOrderRequest): Promise<QueryAllSellOrderResponse>;
    /** Queries a invoice by index. */
    Invoice(request: QueryGetInvoiceRequest): Promise<QueryGetInvoiceResponse>;
    /** Queries a list of invoice items. */
    InvoiceAll(request: QueryAllInvoiceRequest): Promise<QueryAllInvoiceResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    PlaceOrder(request: QueryGetPlaceOrderRequest): Promise<QueryGetPlaceOrderResponse>;
    PlaceOrderAll(request: QueryAllPlaceOrderRequest): Promise<QueryAllPlaceOrderResponse>;
    SellOrder(request: QueryGetSellOrderRequest): Promise<QueryGetSellOrderResponse>;
    SellOrderAll(request: QueryAllSellOrderRequest): Promise<QueryAllSellOrderResponse>;
    Invoice(request: QueryGetInvoiceRequest): Promise<QueryGetInvoiceResponse>;
    InvoiceAll(request: QueryAllInvoiceRequest): Promise<QueryAllInvoiceResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
