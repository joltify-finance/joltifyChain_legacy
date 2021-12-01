import { Writer, Reader } from 'protobufjs/minimal';
export declare const protobufPackage = "joltify.joltifychain.vault";
export interface IssueToken {
    creator: Uint8Array;
    index: string;
    coin: Uint8Array;
    receiver: Uint8Array;
}
export declare const IssueToken: {
    encode(message: IssueToken, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): IssueToken;
    fromJSON(object: any): IssueToken;
    toJSON(message: IssueToken): unknown;
    fromPartial(object: DeepPartial<IssueToken>): IssueToken;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
