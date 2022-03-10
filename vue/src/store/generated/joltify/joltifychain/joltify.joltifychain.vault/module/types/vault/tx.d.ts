import { Reader, Writer } from 'protobufjs/minimal';
export declare const protobufPackage = "joltify.joltifychain.vault";
export interface MsgCreateOutboundTx {
    creator: Uint8Array;
    requestID: string;
    outboundTx: string;
    blockHeight: string;
}
export interface MsgCreateOutboundTxResponse {
    successful: boolean;
}
/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgCreateIssueToken {
    creator: Uint8Array;
    index: string;
    coin: Uint8Array;
    receiver: Uint8Array;
}
export interface MsgCreateIssueTokenResponse {
    successful: boolean;
}
export interface MsgCreateCreatePool {
    creator: Uint8Array;
    poolPubKey: string;
    blockHeight: string;
}
export interface MsgCreateCreatePoolResponse {
    successful: boolean;
}
export declare const MsgCreateOutboundTx: {
    encode(message: MsgCreateOutboundTx, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateOutboundTx;
    fromJSON(object: any): MsgCreateOutboundTx;
    toJSON(message: MsgCreateOutboundTx): unknown;
    fromPartial(object: DeepPartial<MsgCreateOutboundTx>): MsgCreateOutboundTx;
};
export declare const MsgCreateOutboundTxResponse: {
    encode(message: MsgCreateOutboundTxResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateOutboundTxResponse;
    fromJSON(object: any): MsgCreateOutboundTxResponse;
    toJSON(message: MsgCreateOutboundTxResponse): unknown;
    fromPartial(object: DeepPartial<MsgCreateOutboundTxResponse>): MsgCreateOutboundTxResponse;
};
export declare const MsgCreateIssueToken: {
    encode(message: MsgCreateIssueToken, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateIssueToken;
    fromJSON(object: any): MsgCreateIssueToken;
    toJSON(message: MsgCreateIssueToken): unknown;
    fromPartial(object: DeepPartial<MsgCreateIssueToken>): MsgCreateIssueToken;
};
export declare const MsgCreateIssueTokenResponse: {
    encode(message: MsgCreateIssueTokenResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateIssueTokenResponse;
    fromJSON(object: any): MsgCreateIssueTokenResponse;
    toJSON(message: MsgCreateIssueTokenResponse): unknown;
    fromPartial(object: DeepPartial<MsgCreateIssueTokenResponse>): MsgCreateIssueTokenResponse;
};
export declare const MsgCreateCreatePool: {
    encode(message: MsgCreateCreatePool, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateCreatePool;
    fromJSON(object: any): MsgCreateCreatePool;
    toJSON(message: MsgCreateCreatePool): unknown;
    fromPartial(object: DeepPartial<MsgCreateCreatePool>): MsgCreateCreatePool;
};
export declare const MsgCreateCreatePoolResponse: {
    encode(message: MsgCreateCreatePoolResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateCreatePoolResponse;
    fromJSON(object: any): MsgCreateCreatePoolResponse;
    toJSON(message: MsgCreateCreatePoolResponse): unknown;
    fromPartial(object: DeepPartial<MsgCreateCreatePoolResponse>): MsgCreateCreatePoolResponse;
};
/** Msg defines the Msg service. */
export interface Msg {
    CreateOutboundTx(request: MsgCreateOutboundTx): Promise<MsgCreateOutboundTxResponse>;
    /** this line is used by starport scaffolding # proto/tx/rpc */
    CreateIssueToken(request: MsgCreateIssueToken): Promise<MsgCreateIssueTokenResponse>;
    CreateCreatePool(request: MsgCreateCreatePool): Promise<MsgCreateCreatePoolResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    CreateOutboundTx(request: MsgCreateOutboundTx): Promise<MsgCreateOutboundTxResponse>;
    CreateIssueToken(request: MsgCreateIssueToken): Promise<MsgCreateIssueTokenResponse>;
    CreateCreatePool(request: MsgCreateCreatePool): Promise<MsgCreateCreatePoolResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
