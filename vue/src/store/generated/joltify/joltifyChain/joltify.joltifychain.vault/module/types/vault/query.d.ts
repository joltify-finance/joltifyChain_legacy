import { Reader, Writer } from 'protobufjs/minimal';
import { PoolProposal } from '../vault/create_pool';
import { PageRequest, PageResponse } from '../cosmos/base/query/v1beta1/pagination';
export declare const protobufPackage = "joltify.joltifychain.vault";
/** this line is used by starport scaffolding # 3 */
export interface QueryGetCreatePoolRequest {
    index: string;
}
export interface QueryGetCreatePoolResponse {
    CreatePool: PoolProposal | undefined;
}
export interface QueryLastPoolResponse {
    BlockHeight: string;
    CreatePool: PoolProposal | undefined;
}
export interface QueryAllCreatePoolRequest {
    pagination: PageRequest | undefined;
}
export interface QueryLatestPoolRequest {
    pagination: PageRequest | undefined;
}
export interface QueryAllCreatePoolResponse {
    CreatePool: PoolProposal[];
    pagination: PageResponse | undefined;
}
export declare const QueryGetCreatePoolRequest: {
    encode(message: QueryGetCreatePoolRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetCreatePoolRequest;
    fromJSON(object: any): QueryGetCreatePoolRequest;
    toJSON(message: QueryGetCreatePoolRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetCreatePoolRequest>): QueryGetCreatePoolRequest;
};
export declare const QueryGetCreatePoolResponse: {
    encode(message: QueryGetCreatePoolResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetCreatePoolResponse;
    fromJSON(object: any): QueryGetCreatePoolResponse;
    toJSON(message: QueryGetCreatePoolResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetCreatePoolResponse>): QueryGetCreatePoolResponse;
};
export declare const QueryLastPoolResponse: {
    encode(message: QueryLastPoolResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryLastPoolResponse;
    fromJSON(object: any): QueryLastPoolResponse;
    toJSON(message: QueryLastPoolResponse): unknown;
    fromPartial(object: DeepPartial<QueryLastPoolResponse>): QueryLastPoolResponse;
};
export declare const QueryAllCreatePoolRequest: {
    encode(message: QueryAllCreatePoolRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllCreatePoolRequest;
    fromJSON(object: any): QueryAllCreatePoolRequest;
    toJSON(message: QueryAllCreatePoolRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllCreatePoolRequest>): QueryAllCreatePoolRequest;
};
export declare const QueryLatestPoolRequest: {
    encode(message: QueryLatestPoolRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryLatestPoolRequest;
    fromJSON(object: any): QueryLatestPoolRequest;
    toJSON(message: QueryLatestPoolRequest): unknown;
    fromPartial(object: DeepPartial<QueryLatestPoolRequest>): QueryLatestPoolRequest;
};
export declare const QueryAllCreatePoolResponse: {
    encode(message: QueryAllCreatePoolResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllCreatePoolResponse;
    fromJSON(object: any): QueryAllCreatePoolResponse;
    toJSON(message: QueryAllCreatePoolResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllCreatePoolResponse>): QueryAllCreatePoolResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /** Queries a createPool by index. */
    CreatePool(request: QueryGetCreatePoolRequest): Promise<QueryGetCreatePoolResponse>;
    /** Queries a list of createPool items. */
    CreatePoolAll(request: QueryAllCreatePoolRequest): Promise<QueryAllCreatePoolResponse>;
    /** Queries a createPool by index. */
    GetLastPool(request: QueryLatestPoolRequest): Promise<QueryLastPoolResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    CreatePool(request: QueryGetCreatePoolRequest): Promise<QueryGetCreatePoolResponse>;
    CreatePoolAll(request: QueryAllCreatePoolRequest): Promise<QueryAllCreatePoolResponse>;
    GetLastPool(request: QueryLatestPoolRequest): Promise<QueryLastPoolResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
