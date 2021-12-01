import { Writer, Reader } from 'protobufjs/minimal';
export declare const protobufPackage = "joltify.joltifychain.invoice";
export interface InvoiceBase {
    creator: Uint8Array;
    name: string;
    url: string;
    data: string;
    origOwner: Uint8Array;
}
export interface InvoiceFinance {
    denom: string;
    amount: Uint8Array;
    amountLocked: Uint8Array;
    apy: number;
}
export interface InvoiceMember {
    invoiceID: string;
    share: Uint8Array;
    invoiceHolder: Uint8Array;
}
export interface Invoice {
    invoiceID: string;
    invoiceBase: InvoiceBase | undefined;
    invoiceFinance: InvoiceFinance | undefined;
    currentOwner: Uint8Array;
    invoiceMembers: InvoiceMember[];
    rootOwner: boolean;
    deleted: boolean;
    isListedForSell: boolean;
}
export declare const InvoiceBase: {
    encode(message: InvoiceBase, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): InvoiceBase;
    fromJSON(object: any): InvoiceBase;
    toJSON(message: InvoiceBase): unknown;
    fromPartial(object: DeepPartial<InvoiceBase>): InvoiceBase;
};
export declare const InvoiceFinance: {
    encode(message: InvoiceFinance, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): InvoiceFinance;
    fromJSON(object: any): InvoiceFinance;
    toJSON(message: InvoiceFinance): unknown;
    fromPartial(object: DeepPartial<InvoiceFinance>): InvoiceFinance;
};
export declare const InvoiceMember: {
    encode(message: InvoiceMember, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): InvoiceMember;
    fromJSON(object: any): InvoiceMember;
    toJSON(message: InvoiceMember): unknown;
    fromPartial(object: DeepPartial<InvoiceMember>): InvoiceMember;
};
export declare const Invoice: {
    encode(message: Invoice, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Invoice;
    fromJSON(object: any): Invoice;
    toJSON(message: Invoice): unknown;
    fromPartial(object: DeepPartial<Invoice>): Invoice;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
