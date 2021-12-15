/* eslint-disable */
import { Reader, Writer } from 'protobufjs/minimal';
import { Duration } from '../google/protobuf/duration';
export const protobufPackage = 'joltify.joltifychain.invoice';
const baseMsgCreatePlaceOrder = { sellOrderID: '' };
export const MsgCreatePlaceOrder = {
    encode(message, writer = Writer.create()) {
        if (message.creator.length !== 0) {
            writer.uint32(10).bytes(message.creator);
        }
        if (message.sellOrderID !== '') {
            writer.uint32(26).string(message.sellOrderID);
        }
        if (message.amount.length !== 0) {
            writer.uint32(34).bytes(message.amount);
        }
        if (message.price.length !== 0) {
            writer.uint32(42).bytes(message.price);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreatePlaceOrder };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.bytes();
                    break;
                case 3:
                    message.sellOrderID = reader.string();
                    break;
                case 4:
                    message.amount = reader.bytes();
                    break;
                case 5:
                    message.price = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgCreatePlaceOrder };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = bytesFromBase64(object.creator);
        }
        if (object.sellOrderID !== undefined && object.sellOrderID !== null) {
            message.sellOrderID = String(object.sellOrderID);
        }
        else {
            message.sellOrderID = '';
        }
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = bytesFromBase64(object.amount);
        }
        if (object.price !== undefined && object.price !== null) {
            message.price = bytesFromBase64(object.price);
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = base64FromBytes(message.creator !== undefined ? message.creator : new Uint8Array()));
        message.sellOrderID !== undefined && (obj.sellOrderID = message.sellOrderID);
        message.amount !== undefined && (obj.amount = base64FromBytes(message.amount !== undefined ? message.amount : new Uint8Array()));
        message.price !== undefined && (obj.price = base64FromBytes(message.price !== undefined ? message.price : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgCreatePlaceOrder };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = new Uint8Array();
        }
        if (object.sellOrderID !== undefined && object.sellOrderID !== null) {
            message.sellOrderID = object.sellOrderID;
        }
        else {
            message.sellOrderID = '';
        }
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = object.amount;
        }
        else {
            message.amount = new Uint8Array();
        }
        if (object.price !== undefined && object.price !== null) {
            message.price = object.price;
        }
        else {
            message.price = new Uint8Array();
        }
        return message;
    }
};
const baseMsgCreatePlaceOrderResponse = { placeOrderID: '' };
export const MsgCreatePlaceOrderResponse = {
    encode(message, writer = Writer.create()) {
        if (message.placeOrderID !== '') {
            writer.uint32(10).string(message.placeOrderID);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreatePlaceOrderResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.placeOrderID = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgCreatePlaceOrderResponse };
        if (object.placeOrderID !== undefined && object.placeOrderID !== null) {
            message.placeOrderID = String(object.placeOrderID);
        }
        else {
            message.placeOrderID = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.placeOrderID !== undefined && (obj.placeOrderID = message.placeOrderID);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgCreatePlaceOrderResponse };
        if (object.placeOrderID !== undefined && object.placeOrderID !== null) {
            message.placeOrderID = object.placeOrderID;
        }
        else {
            message.placeOrderID = '';
        }
        return message;
    }
};
const baseMsgCreateSellOrder = { sellInvoiceID: '' };
export const MsgCreateSellOrder = {
    encode(message, writer = Writer.create()) {
        if (message.creator.length !== 0) {
            writer.uint32(10).bytes(message.creator);
        }
        if (message.sellInvoiceID !== '') {
            writer.uint32(18).string(message.sellInvoiceID);
        }
        if (message.amount.length !== 0) {
            writer.uint32(26).bytes(message.amount);
        }
        if (message.sellDuration !== undefined) {
            Duration.encode(message.sellDuration, writer.uint32(34).fork()).ldelim();
        }
        if (message.price.length !== 0) {
            writer.uint32(42).bytes(message.price);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreateSellOrder };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.bytes();
                    break;
                case 2:
                    message.sellInvoiceID = reader.string();
                    break;
                case 3:
                    message.amount = reader.bytes();
                    break;
                case 4:
                    message.sellDuration = Duration.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.price = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgCreateSellOrder };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = bytesFromBase64(object.creator);
        }
        if (object.sellInvoiceID !== undefined && object.sellInvoiceID !== null) {
            message.sellInvoiceID = String(object.sellInvoiceID);
        }
        else {
            message.sellInvoiceID = '';
        }
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = bytesFromBase64(object.amount);
        }
        if (object.sellDuration !== undefined && object.sellDuration !== null) {
            message.sellDuration = Duration.fromJSON(object.sellDuration);
        }
        else {
            message.sellDuration = undefined;
        }
        if (object.price !== undefined && object.price !== null) {
            message.price = bytesFromBase64(object.price);
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = base64FromBytes(message.creator !== undefined ? message.creator : new Uint8Array()));
        message.sellInvoiceID !== undefined && (obj.sellInvoiceID = message.sellInvoiceID);
        message.amount !== undefined && (obj.amount = base64FromBytes(message.amount !== undefined ? message.amount : new Uint8Array()));
        message.sellDuration !== undefined && (obj.sellDuration = message.sellDuration ? Duration.toJSON(message.sellDuration) : undefined);
        message.price !== undefined && (obj.price = base64FromBytes(message.price !== undefined ? message.price : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgCreateSellOrder };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = new Uint8Array();
        }
        if (object.sellInvoiceID !== undefined && object.sellInvoiceID !== null) {
            message.sellInvoiceID = object.sellInvoiceID;
        }
        else {
            message.sellInvoiceID = '';
        }
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = object.amount;
        }
        else {
            message.amount = new Uint8Array();
        }
        if (object.sellDuration !== undefined && object.sellDuration !== null) {
            message.sellDuration = Duration.fromPartial(object.sellDuration);
        }
        else {
            message.sellDuration = undefined;
        }
        if (object.price !== undefined && object.price !== null) {
            message.price = object.price;
        }
        else {
            message.price = new Uint8Array();
        }
        return message;
    }
};
const baseMsgCreateSellOrderResponse = { orderID: '' };
export const MsgCreateSellOrderResponse = {
    encode(message, writer = Writer.create()) {
        if (message.orderID !== '') {
            writer.uint32(10).string(message.orderID);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreateSellOrderResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.orderID = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgCreateSellOrderResponse };
        if (object.orderID !== undefined && object.orderID !== null) {
            message.orderID = String(object.orderID);
        }
        else {
            message.orderID = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.orderID !== undefined && (obj.orderID = message.orderID);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgCreateSellOrderResponse };
        if (object.orderID !== undefined && object.orderID !== null) {
            message.orderID = object.orderID;
        }
        else {
            message.orderID = '';
        }
        return message;
    }
};
const baseMsgDeleteSellOrder = { sellOrderID: '' };
export const MsgDeleteSellOrder = {
    encode(message, writer = Writer.create()) {
        if (message.creator.length !== 0) {
            writer.uint32(10).bytes(message.creator);
        }
        if (message.sellOrderID !== '') {
            writer.uint32(18).string(message.sellOrderID);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgDeleteSellOrder };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.bytes();
                    break;
                case 2:
                    message.sellOrderID = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgDeleteSellOrder };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = bytesFromBase64(object.creator);
        }
        if (object.sellOrderID !== undefined && object.sellOrderID !== null) {
            message.sellOrderID = String(object.sellOrderID);
        }
        else {
            message.sellOrderID = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = base64FromBytes(message.creator !== undefined ? message.creator : new Uint8Array()));
        message.sellOrderID !== undefined && (obj.sellOrderID = message.sellOrderID);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgDeleteSellOrder };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = new Uint8Array();
        }
        if (object.sellOrderID !== undefined && object.sellOrderID !== null) {
            message.sellOrderID = object.sellOrderID;
        }
        else {
            message.sellOrderID = '';
        }
        return message;
    }
};
const baseMsgDeleteSellOrderResponse = {};
export const MsgDeleteSellOrderResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgDeleteSellOrderResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = { ...baseMsgDeleteSellOrderResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgDeleteSellOrderResponse };
        return message;
    }
};
const baseMsgCreateInvoice = { creator: '', invoiceID: '', name: '', url: '', amount: '', origOwner: '', apy: '', isRootOwner: false };
export const MsgCreateInvoice = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== '') {
            writer.uint32(10).string(message.creator);
        }
        if (message.invoiceID !== '') {
            writer.uint32(18).string(message.invoiceID);
        }
        if (message.name !== '') {
            writer.uint32(26).string(message.name);
        }
        if (message.url !== '') {
            writer.uint32(34).string(message.url);
        }
        if (message.amount !== '') {
            writer.uint32(42).string(message.amount);
        }
        if (message.origOwner !== '') {
            writer.uint32(50).string(message.origOwner);
        }
        if (message.apy !== '') {
            writer.uint32(66).string(message.apy);
        }
        if (message.isRootOwner === true) {
            writer.uint32(72).bool(message.isRootOwner);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreateInvoice };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.invoiceID = reader.string();
                    break;
                case 3:
                    message.name = reader.string();
                    break;
                case 4:
                    message.url = reader.string();
                    break;
                case 5:
                    message.amount = reader.string();
                    break;
                case 6:
                    message.origOwner = reader.string();
                    break;
                case 8:
                    message.apy = reader.string();
                    break;
                case 9:
                    message.isRootOwner = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgCreateInvoice };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = '';
        }
        if (object.invoiceID !== undefined && object.invoiceID !== null) {
            message.invoiceID = String(object.invoiceID);
        }
        else {
            message.invoiceID = '';
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
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = String(object.amount);
        }
        else {
            message.amount = '';
        }
        if (object.origOwner !== undefined && object.origOwner !== null) {
            message.origOwner = String(object.origOwner);
        }
        else {
            message.origOwner = '';
        }
        if (object.apy !== undefined && object.apy !== null) {
            message.apy = String(object.apy);
        }
        else {
            message.apy = '';
        }
        if (object.isRootOwner !== undefined && object.isRootOwner !== null) {
            message.isRootOwner = Boolean(object.isRootOwner);
        }
        else {
            message.isRootOwner = false;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.invoiceID !== undefined && (obj.invoiceID = message.invoiceID);
        message.name !== undefined && (obj.name = message.name);
        message.url !== undefined && (obj.url = message.url);
        message.amount !== undefined && (obj.amount = message.amount);
        message.origOwner !== undefined && (obj.origOwner = message.origOwner);
        message.apy !== undefined && (obj.apy = message.apy);
        message.isRootOwner !== undefined && (obj.isRootOwner = message.isRootOwner);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgCreateInvoice };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
        }
        if (object.invoiceID !== undefined && object.invoiceID !== null) {
            message.invoiceID = object.invoiceID;
        }
        else {
            message.invoiceID = '';
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
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = object.amount;
        }
        else {
            message.amount = '';
        }
        if (object.origOwner !== undefined && object.origOwner !== null) {
            message.origOwner = object.origOwner;
        }
        else {
            message.origOwner = '';
        }
        if (object.apy !== undefined && object.apy !== null) {
            message.apy = object.apy;
        }
        else {
            message.apy = '';
        }
        if (object.isRootOwner !== undefined && object.isRootOwner !== null) {
            message.isRootOwner = object.isRootOwner;
        }
        else {
            message.isRootOwner = false;
        }
        return message;
    }
};
const baseMsgCreateInvoiceResponse = { invoiceID: '' };
export const MsgCreateInvoiceResponse = {
    encode(message, writer = Writer.create()) {
        if (message.invoiceID !== '') {
            writer.uint32(10).string(message.invoiceID);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreateInvoiceResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.invoiceID = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgCreateInvoiceResponse };
        if (object.invoiceID !== undefined && object.invoiceID !== null) {
            message.invoiceID = String(object.invoiceID);
        }
        else {
            message.invoiceID = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.invoiceID !== undefined && (obj.invoiceID = message.invoiceID);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgCreateInvoiceResponse };
        if (object.invoiceID !== undefined && object.invoiceID !== null) {
            message.invoiceID = object.invoiceID;
        }
        else {
            message.invoiceID = '';
        }
        return message;
    }
};
const baseMsgDeleteInvoice = { name: '' };
export const MsgDeleteInvoice = {
    encode(message, writer = Writer.create()) {
        if (message.creator.length !== 0) {
            writer.uint32(10).bytes(message.creator);
        }
        if (message.origOwner.length !== 0) {
            writer.uint32(18).bytes(message.origOwner);
        }
        if (message.name !== '') {
            writer.uint32(26).string(message.name);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgDeleteInvoice };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.bytes();
                    break;
                case 2:
                    message.origOwner = reader.bytes();
                    break;
                case 3:
                    message.name = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgDeleteInvoice };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = bytesFromBase64(object.creator);
        }
        if (object.origOwner !== undefined && object.origOwner !== null) {
            message.origOwner = bytesFromBase64(object.origOwner);
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        else {
            message.name = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = base64FromBytes(message.creator !== undefined ? message.creator : new Uint8Array()));
        message.origOwner !== undefined && (obj.origOwner = base64FromBytes(message.origOwner !== undefined ? message.origOwner : new Uint8Array()));
        message.name !== undefined && (obj.name = message.name);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgDeleteInvoice };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = new Uint8Array();
        }
        if (object.origOwner !== undefined && object.origOwner !== null) {
            message.origOwner = object.origOwner;
        }
        else {
            message.origOwner = new Uint8Array();
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = '';
        }
        return message;
    }
};
const baseMsgDeleteInvoiceResponse = {};
export const MsgDeleteInvoiceResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgDeleteInvoiceResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = { ...baseMsgDeleteInvoiceResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgDeleteInvoiceResponse };
        return message;
    }
};
export class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    CreatePlaceOrder(request) {
        const data = MsgCreatePlaceOrder.encode(request).finish();
        const promise = this.rpc.request('joltify.joltifychain.invoice.Msg', 'CreatePlaceOrder', data);
        return promise.then((data) => MsgCreatePlaceOrderResponse.decode(new Reader(data)));
    }
    CreateSellOrder(request) {
        const data = MsgCreateSellOrder.encode(request).finish();
        const promise = this.rpc.request('joltify.joltifychain.invoice.Msg', 'CreateSellOrder', data);
        return promise.then((data) => MsgCreateSellOrderResponse.decode(new Reader(data)));
    }
    DeleteSellOrder(request) {
        const data = MsgDeleteSellOrder.encode(request).finish();
        const promise = this.rpc.request('joltify.joltifychain.invoice.Msg', 'DeleteSellOrder', data);
        return promise.then((data) => MsgDeleteSellOrderResponse.decode(new Reader(data)));
    }
    CreateInvoice(request) {
        const data = MsgCreateInvoice.encode(request).finish();
        const promise = this.rpc.request('joltify.joltifychain.invoice.Msg', 'CreateInvoice', data);
        return promise.then((data) => MsgCreateInvoiceResponse.decode(new Reader(data)));
    }
    DeleteInvoice(request) {
        const data = MsgDeleteInvoice.encode(request).finish();
        const promise = this.rpc.request('joltify.joltifychain.invoice.Msg', 'DeleteInvoice', data);
        return promise.then((data) => MsgDeleteInvoiceResponse.decode(new Reader(data)));
    }
}
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
