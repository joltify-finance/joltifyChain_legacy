import { Reader, Writer } from 'protobufjs/minimal';
import { OutboundTx } from '../vault/outbound_tx';
import { PageRequest, PageResponse } from '../cosmos/base/query/v1beta1/pagination';
import { IssueToken } from '../vault/issue_token';
import { PoolProposal } from '../vault/create_pool';
export declare const protobufPackage = "joltify.joltifychain.vault";
export interface QueryGetOutboundTxRequest {
    requestID: string;
}
export interface QueryGetOutboundTxResponse {
    outboundTx: OutboundTx | undefined;
}
export interface QueryAllOutboundTxRequest {
    pagination: PageRequest | undefined;
}
export interface QueryAllOutboundTxResponse {
    outboundTx: OutboundTx[];
    pagination: PageResponse | undefined;
}
/** this line is used by starport scaffolding # 3 */
export interface QueryGetIssueTokenRequest {
    index: string;
}
export interface QueryGetIssueTokenResponse {
    IssueToken: IssueToken | undefined;
}
export interface QueryAllIssueTokenRequest {
    pagination: PageRequest | undefined;
}
export interface QueryAllIssueTokenResponse {
    IssueToken: IssueToken[];
    pagination: PageResponse | undefined;
}
export interface QueryGetCreatePoolRequest {
    index: string;
}
export interface QueryGetCreatePoolResponse {
    CreatePool: PoolProposal | undefined;
}
export interface poolInfo {
    BlockHeight: string;
    CreatePool: PoolProposal | undefined;
}
export interface QueryLastPoolResponse {
    pools: poolInfo[];
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
export declare const QueryGetOutboundTxRequest: {
    encode(message: QueryGetOutboundTxRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetOutboundTxRequest;
    fromJSON(object: any): QueryGetOutboundTxRequest;
    toJSON(message: QueryGetOutboundTxRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetOutboundTxRequest>): QueryGetOutboundTxRequest;
};
export declare const QueryGetOutboundTxResponse: {
    encode(message: QueryGetOutboundTxResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetOutboundTxResponse;
    fromJSON(object: any): QueryGetOutboundTxResponse;
    toJSON(message: QueryGetOutboundTxResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetOutboundTxResponse>): QueryGetOutboundTxResponse;
};
export declare const QueryAllOutboundTxRequest: {
    encode(message: QueryAllOutboundTxRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllOutboundTxRequest;
    fromJSON(object: any): QueryAllOutboundTxRequest;
    toJSON(message: QueryAllOutboundTxRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllOutboundTxRequest>): QueryAllOutboundTxRequest;
};
export declare const QueryAllOutboundTxResponse: {
    encode(message: QueryAllOutboundTxResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllOutboundTxResponse;
    fromJSON(object: any): QueryAllOutboundTxResponse;
    toJSON(message: QueryAllOutboundTxResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllOutboundTxResponse>): QueryAllOutboundTxResponse;
};
export declare const QueryGetIssueTokenRequest: {
    encode(message: QueryGetIssueTokenRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetIssueTokenRequest;
    fromJSON(object: any): QueryGetIssueTokenRequest;
    toJSON(message: QueryGetIssueTokenRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetIssueTokenRequest>): QueryGetIssueTokenRequest;
};
export declare const QueryGetIssueTokenResponse: {
    encode(message: QueryGetIssueTokenResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetIssueTokenResponse;
    fromJSON(object: any): QueryGetIssueTokenResponse;
    toJSON(message: QueryGetIssueTokenResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetIssueTokenResponse>): QueryGetIssueTokenResponse;
};
export declare const QueryAllIssueTokenRequest: {
    encode(message: QueryAllIssueTokenRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllIssueTokenRequest;
    fromJSON(object: any): QueryAllIssueTokenRequest;
    toJSON(message: QueryAllIssueTokenRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllIssueTokenRequest>): QueryAllIssueTokenRequest;
};
export declare const QueryAllIssueTokenResponse: {
    encode(message: QueryAllIssueTokenResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllIssueTokenResponse;
    fromJSON(object: any): QueryAllIssueTokenResponse;
    toJSON(message: QueryAllIssueTokenResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllIssueTokenResponse>): QueryAllIssueTokenResponse;
};
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
export declare const poolInfo: {
    encode(message: poolInfo, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): poolInfo;
    fromJSON(object: any): poolInfo;
    toJSON(message: poolInfo): unknown;
    fromPartial(object: DeepPartial<poolInfo>): poolInfo;
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
    /** Queries a OutboundTx by index. */
    OutboundTx(request: QueryGetOutboundTxRequest): Promise<QueryGetOutboundTxResponse>;
    /** Queries a list of OutboundTx items. */
    OutboundTxAll(request: QueryAllOutboundTxRequest): Promise<QueryAllOutboundTxResponse>;
    /** Queries a issueToken by index. */
    IssueToken(request: QueryGetIssueTokenRequest): Promise<QueryGetIssueTokenResponse>;
    /** Queries a list of issueToken items. */
    IssueTokenAll(request: QueryAllIssueTokenRequest): Promise<QueryAllIssueTokenResponse>;
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
    OutboundTx(request: QueryGetOutboundTxRequest): Promise<QueryGetOutboundTxResponse>;
    OutboundTxAll(request: QueryAllOutboundTxRequest): Promise<QueryAllOutboundTxResponse>;
    IssueToken(request: QueryGetIssueTokenRequest): Promise<QueryGetIssueTokenResponse>;
    IssueTokenAll(request: QueryAllIssueTokenRequest): Promise<QueryAllIssueTokenResponse>;
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
