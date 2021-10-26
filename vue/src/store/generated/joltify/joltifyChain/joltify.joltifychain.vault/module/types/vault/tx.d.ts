import { Reader, Writer } from 'protobufjs/minimal';
export declare const protobufPackage = "joltify.joltifychain.vault";
/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgCreateCreatePool {
    creator: Uint8Array;
    poolPubKey: string;
    blockHeight: string;
}
export interface MsgCreateCreatePoolResponse {
    successful: boolean;
}
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
    /** this line is used by starport scaffolding # proto/tx/rpc */
    CreateCreatePool(request: MsgCreateCreatePool): Promise<MsgCreateCreatePoolResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
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
