import { Writer, Reader } from 'protobufjs/minimal';
export declare const protobufPackage = "joltify.joltifychain.invoice";
export interface PlaceOrder {
    creator: Uint8Array;
    placeOrderIndex: string;
    sellOrderID: string;
    amount: Uint8Array;
    OrderStatus: number;
    createdTime: Date | undefined;
}
export declare const PlaceOrder: {
    encode(message: PlaceOrder, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): PlaceOrder;
    fromJSON(object: any): PlaceOrder;
    toJSON(message: PlaceOrder): unknown;
    fromPartial(object: DeepPartial<PlaceOrder>): PlaceOrder;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
