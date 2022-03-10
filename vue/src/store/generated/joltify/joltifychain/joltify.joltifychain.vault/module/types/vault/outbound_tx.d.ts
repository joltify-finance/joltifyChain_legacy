import { Writer, Reader } from 'protobufjs/minimal';
export declare const protobufPackage = "joltify.joltifychain.vault";
export interface address {
    address: Uint8Array[];
}
export interface OutboundTx {
    index: string;
    items: {
        [key: string]: address;
    };
}
export interface OutboundTx_ItemsEntry {
    key: string;
    value: address | undefined;
}
export declare const address: {
    encode(message: address, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): address;
    fromJSON(object: any): address;
    toJSON(message: address): unknown;
    fromPartial(object: DeepPartial<address>): address;
};
export declare const OutboundTx: {
    encode(message: OutboundTx, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): OutboundTx;
    fromJSON(object: any): OutboundTx;
    toJSON(message: OutboundTx): unknown;
    fromPartial(object: DeepPartial<OutboundTx>): OutboundTx;
};
export declare const OutboundTx_ItemsEntry: {
    encode(message: OutboundTx_ItemsEntry, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): OutboundTx_ItemsEntry;
    fromJSON(object: any): OutboundTx_ItemsEntry;
    toJSON(message: OutboundTx_ItemsEntry): unknown;
    fromPartial(object: DeepPartial<OutboundTx_ItemsEntry>): OutboundTx_ItemsEntry;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
