import { Duration } from '../google/protobuf/duration';
import { Writer, Reader } from 'protobufjs/minimal';
export declare const protobufPackage = "joltify.joltifychain.invoice";
export interface SellOrder {
    creator: Uint8Array;
    sellOrderID: string;
    invoiceID: string;
    amount: Uint8Array;
    price: Uint8Array;
    leftAmount: Uint8Array;
    priceRatio: string;
    sellDuration: Duration | undefined;
    createdTime: Date | undefined;
    isDeleted: boolean;
}
export declare const SellOrder: {
    encode(message: SellOrder, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): SellOrder;
    fromJSON(object: any): SellOrder;
    toJSON(message: SellOrder): unknown;
    fromPartial(object: DeepPartial<SellOrder>): SellOrder;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
