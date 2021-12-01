import { Writer, Reader } from 'protobufjs/minimal';
export declare const protobufPackage = "joltify.joltifychain.vault";
export interface PoolProposal {
    poolPubKey: string;
    poolAddr: Uint8Array;
    nodes: Uint8Array[];
}
export interface CreatePool {
    blockHeight: string;
    validators: Uint8Array[];
    proposal: PoolProposal[];
}
export declare const PoolProposal: {
    encode(message: PoolProposal, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): PoolProposal;
    fromJSON(object: any): PoolProposal;
    toJSON(message: PoolProposal): unknown;
    fromPartial(object: DeepPartial<PoolProposal>): PoolProposal;
};
export declare const CreatePool: {
    encode(message: CreatePool, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): CreatePool;
    fromJSON(object: any): CreatePool;
    toJSON(message: CreatePool): unknown;
    fromPartial(object: DeepPartial<CreatePool>): CreatePool;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
