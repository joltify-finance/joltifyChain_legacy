/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';
export const protobufPackage = 'joltify.joltifychain.invoice';
const baseInvoiceBase = { name: '', url: '', data: '' };
export const InvoiceBase = {
    encode(message, writer = Writer.create()) {
        if (message.creator.length !== 0) {
            writer.uint32(10).bytes(message.creator);
        }
        if (message.name !== '') {
            writer.uint32(18).string(message.name);
        }
        if (message.url !== '') {
            writer.uint32(26).string(message.url);
        }
        if (message.data !== '') {
            writer.uint32(34).string(message.data);
        }
        if (message.origOwner.length !== 0) {
            writer.uint32(42).bytes(message.origOwner);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseInvoiceBase };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.bytes();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.url = reader.string();
                    break;
                case 4:
                    message.data = reader.string();
                    break;
                case 5:
                    message.origOwner = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseInvoiceBase };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = bytesFromBase64(object.creator);
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        else {
            message.name = '';
        }
        if (object.url !== undefined && object.url !== null) {
            message.url = String(object.url);
        }
        else {
            message.url = '';
        }
        if (object.data !== undefined && object.data !== null) {
            message.data = String(object.data);
        }
        else {
            message.data = '';
        }
        if (object.origOwner !== undefined && object.origOwner !== null) {
            message.origOwner = bytesFromBase64(object.origOwner);
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = base64FromBytes(message.creator !== undefined ? message.creator : new Uint8Array()));
        message.name !== undefined && (obj.name = message.name);
        message.url !== undefined && (obj.url = message.url);
        message.data !== undefined && (obj.data = message.data);
        message.origOwner !== undefined && (obj.origOwner = base64FromBytes(message.origOwner !== undefined ? message.origOwner : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseInvoiceBase };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = new Uint8Array();
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = '';
        }
        if (object.url !== undefined && object.url !== null) {
            message.url = object.url;
        }
        else {
            message.url = '';
        }
        if (object.data !== undefined && object.data !== null) {
            message.data = object.data;
        }
        else {
            message.data = '';
        }
        if (object.origOwner !== undefined && object.origOwner !== null) {
            message.origOwner = object.origOwner;
        }
        else {
            message.origOwner = new Uint8Array();
        }
        return message;
    }
};
const baseInvoiceFinance = { denom: '', apy: 0 };
export const InvoiceFinance = {
    encode(message, writer = Writer.create()) {
        if (message.denom !== '') {
            writer.uint32(18).string(message.denom);
        }
        if (message.amount.length !== 0) {
            writer.uint32(26).bytes(message.amount);
        }
        if (message.amountLocked.length !== 0) {
            writer.uint32(34).bytes(message.amountLocked);
        }
        if (message.apy !== 0) {
            writer.uint32(45).float(message.apy);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseInvoiceFinance };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 2:
                    message.denom = reader.string();
                    break;
                case 3:
                    message.amount = reader.bytes();
                    break;
                case 4:
                    message.amountLocked = reader.bytes();
                    break;
                case 5:
                    message.apy = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseInvoiceFinance };
        if (object.denom !== undefined && object.denom !== null) {
            message.denom = String(object.denom);
        }
        else {
            message.denom = '';
        }
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = bytesFromBase64(object.amount);
        }
        if (object.amountLocked !== undefined && object.amountLocked !== null) {
            message.amountLocked = bytesFromBase64(object.amountLocked);
        }
        if (object.apy !== undefined && object.apy !== null) {
            message.apy = Number(object.apy);
        }
        else {
            message.apy = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.denom !== undefined && (obj.denom = message.denom);
        message.amount !== undefined && (obj.amount = base64FromBytes(message.amount !== undefined ? message.amount : new Uint8Array()));
        message.amountLocked !== undefined && (obj.amountLocked = base64FromBytes(message.amountLocked !== undefined ? message.amountLocked : new Uint8Array()));
        message.apy !== undefined && (obj.apy = message.apy);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseInvoiceFinance };
        if (object.denom !== undefined && object.denom !== null) {
            message.denom = object.denom;
        }
        else {
            message.denom = '';
        }
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = object.amount;
        }
        else {
            message.amount = new Uint8Array();
        }
        if (object.amountLocked !== undefined && object.amountLocked !== null) {
            message.amountLocked = object.amountLocked;
        }
        else {
            message.amountLocked = new Uint8Array();
        }
        if (object.apy !== undefined && object.apy !== null) {
            message.apy = object.apy;
        }
        else {
            message.apy = 0;
        }
        return message;
    }
};
const baseInvoiceMember = { invoiceID: '' };
export const InvoiceMember = {
    encode(message, writer = Writer.create()) {
        if (message.invoiceID !== '') {
            writer.uint32(10).string(message.invoiceID);
        }
        if (message.share.length !== 0) {
            writer.uint32(18).bytes(message.share);
        }
        if (message.invoiceHolder.length !== 0) {
            writer.uint32(26).bytes(message.invoiceHolder);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseInvoiceMember };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.invoiceID = reader.string();
                    break;
                case 2:
                    message.share = reader.bytes();
                    break;
                case 3:
                    message.invoiceHolder = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseInvoiceMember };
        if (object.invoiceID !== undefined && object.invoiceID !== null) {
            message.invoiceID = String(object.invoiceID);
        }
        else {
            message.invoiceID = '';
        }
        if (object.share !== undefined && object.share !== null) {
            message.share = bytesFromBase64(object.share);
        }
        if (object.invoiceHolder !== undefined && object.invoiceHolder !== null) {
            message.invoiceHolder = bytesFromBase64(object.invoiceHolder);
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.invoiceID !== undefined && (obj.invoiceID = message.invoiceID);
        message.share !== undefined && (obj.share = base64FromBytes(message.share !== undefined ? message.share : new Uint8Array()));
        message.invoiceHolder !== undefined && (obj.invoiceHolder = base64FromBytes(message.invoiceHolder !== undefined ? message.invoiceHolder : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseInvoiceMember };
        if (object.invoiceID !== undefined && object.invoiceID !== null) {
            message.invoiceID = object.invoiceID;
        }
        else {
            message.invoiceID = '';
        }
        if (object.share !== undefined && object.share !== null) {
            message.share = object.share;
        }
        else {
            message.share = new Uint8Array();
        }
        if (object.invoiceHolder !== undefined && object.invoiceHolder !== null) {
            message.invoiceHolder = object.invoiceHolder;
        }
        else {
            message.invoiceHolder = new Uint8Array();
        }
        return message;
    }
};
const baseInvoice = { invoiceID: '', rootOwner: false, deleted: false, isListedForSell: false };
export const Invoice = {
    encode(message, writer = Writer.create()) {
        if (message.invoiceID !== '') {
            writer.uint32(10).string(message.invoiceID);
        }
        if (message.invoiceBase !== undefined) {
            InvoiceBase.encode(message.invoiceBase, writer.uint32(18).fork()).ldelim();
        }
        if (message.invoiceFinance !== undefined) {
            InvoiceFinance.encode(message.invoiceFinance, writer.uint32(26).fork()).ldelim();
        }
        if (message.currentOwner.length !== 0) {
            writer.uint32(34).bytes(message.currentOwner);
        }
        for (const v of message.invoiceMembers) {
            InvoiceMember.encode(v, writer.uint32(42).fork()).ldelim();
        }
        if (message.rootOwner === true) {
            writer.uint32(48).bool(message.rootOwner);
        }
        if (message.deleted === true) {
            writer.uint32(56).bool(message.deleted);
        }
        if (message.isListedForSell === true) {
            writer.uint32(64).bool(message.isListedForSell);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseInvoice };
        message.invoiceMembers = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.invoiceID = reader.string();
                    break;
                case 2:
                    message.invoiceBase = InvoiceBase.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.invoiceFinance = InvoiceFinance.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.currentOwner = reader.bytes();
                    break;
                case 5:
                    message.invoiceMembers.push(InvoiceMember.decode(reader, reader.uint32()));
                    break;
                case 6:
                    message.rootOwner = reader.bool();
                    break;
                case 7:
                    message.deleted = reader.bool();
                    break;
                case 8:
                    message.isListedForSell = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseInvoice };
        message.invoiceMembers = [];
        if (object.invoiceID !== undefined && object.invoiceID !== null) {
            message.invoiceID = String(object.invoiceID);
        }
        else {
            message.invoiceID = '';
        }
        if (object.invoiceBase !== undefined && object.invoiceBase !== null) {
            message.invoiceBase = InvoiceBase.fromJSON(object.invoiceBase);
        }
        else {
            message.invoiceBase = undefined;
        }
        if (object.invoiceFinance !== undefined && object.invoiceFinance !== null) {
            message.invoiceFinance = InvoiceFinance.fromJSON(object.invoiceFinance);
        }
        else {
            message.invoiceFinance = undefined;
        }
        if (object.currentOwner !== undefined && object.currentOwner !== null) {
            message.currentOwner = bytesFromBase64(object.currentOwner);
        }
        if (object.invoiceMembers !== undefined && object.invoiceMembers !== null) {
            for (const e of object.invoiceMembers) {
                message.invoiceMembers.push(InvoiceMember.fromJSON(e));
            }
        }
        if (object.rootOwner !== undefined && object.rootOwner !== null) {
            message.rootOwner = Boolean(object.rootOwner);
        }
        else {
            message.rootOwner = false;
        }
        if (object.deleted !== undefined && object.deleted !== null) {
            message.deleted = Boolean(object.deleted);
        }
        else {
            message.deleted = false;
        }
        if (object.isListedForSell !== undefined && object.isListedForSell !== null) {
            message.isListedForSell = Boolean(object.isListedForSell);
        }
        else {
            message.isListedForSell = false;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.invoiceID !== undefined && (obj.invoiceID = message.invoiceID);
        message.invoiceBase !== undefined && (obj.invoiceBase = message.invoiceBase ? InvoiceBase.toJSON(message.invoiceBase) : undefined);
        message.invoiceFinance !== undefined && (obj.invoiceFinance = message.invoiceFinance ? InvoiceFinance.toJSON(message.invoiceFinance) : undefined);
        message.currentOwner !== undefined && (obj.currentOwner = base64FromBytes(message.currentOwner !== undefined ? message.currentOwner : new Uint8Array()));
        if (message.invoiceMembers) {
            obj.invoiceMembers = message.invoiceMembers.map((e) => (e ? InvoiceMember.toJSON(e) : undefined));
        }
        else {
            obj.invoiceMembers = [];
        }
        message.rootOwner !== undefined && (obj.rootOwner = message.rootOwner);
        message.deleted !== undefined && (obj.deleted = message.deleted);
        message.isListedForSell !== undefined && (obj.isListedForSell = message.isListedForSell);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseInvoice };
        message.invoiceMembers = [];
        if (object.invoiceID !== undefined && object.invoiceID !== null) {
            message.invoiceID = object.invoiceID;
        }
        else {
            message.invoiceID = '';
        }
        if (object.invoiceBase !== undefined && object.invoiceBase !== null) {
            message.invoiceBase = InvoiceBase.fromPartial(object.invoiceBase);
        }
        else {
            message.invoiceBase = undefined;
        }
        if (object.invoiceFinance !== undefined && object.invoiceFinance !== null) {
            message.invoiceFinance = InvoiceFinance.fromPartial(object.invoiceFinance);
        }
        else {
            message.invoiceFinance = undefined;
        }
        if (object.currentOwner !== undefined && object.currentOwner !== null) {
            message.currentOwner = object.currentOwner;
        }
        else {
            message.currentOwner = new Uint8Array();
        }
        if (object.invoiceMembers !== undefined && object.invoiceMembers !== null) {
            for (const e of object.invoiceMembers) {
                message.invoiceMembers.push(InvoiceMember.fromPartial(e));
            }
        }
        if (object.rootOwner !== undefined && object.rootOwner !== null) {
            message.rootOwner = object.rootOwner;
        }
        else {
            message.rootOwner = false;
        }
        if (object.deleted !== undefined && object.deleted !== null) {
            message.deleted = object.deleted;
        }
        else {
            message.deleted = false;
        }
        if (object.isListedForSell !== undefined && object.isListedForSell !== null) {
            message.isListedForSell = object.isListedForSell;
        }
        else {
            message.isListedForSell = false;
        }
        return message;
    }
};
var globalThis = (() => {
    if (typeof globalThis !== 'undefined')
        return globalThis;
    if (typeof self !== 'undefined')
        return self;
    if (typeof window !== 'undefined')
        return window;
    if (typeof global !== 'undefined')
        return global;
    throw 'Unable to locate global object';
})();
const atob = globalThis.atob || ((b64) => globalThis.Buffer.from(b64, 'base64').toString('binary'));
function bytesFromBase64(b64) {
    const bin = atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
        arr[i] = bin.charCodeAt(i);
    }
    return arr;
}
const btoa = globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, 'binary').toString('base64'));
function base64FromBytes(arr) {
    const bin = [];
    for (let i = 0; i < arr.byteLength; ++i) {
        bin.push(String.fromCharCode(arr[i]));
    }
    return btoa(bin.join(''));
}
