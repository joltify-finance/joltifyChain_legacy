/* eslint-disable */
import { Timestamp } from '../google/protobuf/timestamp';
import { Writer, Reader } from 'protobufjs/minimal';
export const protobufPackage = 'joltify.joltifychain.invoice';
const basePlaceOrder = { placeOrderIndex: '', sellOrderID: '', OrderStatus: 0 };
export const PlaceOrder = {
    encode(message, writer = Writer.create()) {
        if (message.creator.length !== 0) {
            writer.uint32(10).bytes(message.creator);
        }
        if (message.placeOrderIndex !== '') {
            writer.uint32(18).string(message.placeOrderIndex);
        }
        if (message.sellOrderID !== '') {
            writer.uint32(26).string(message.sellOrderID);
        }
        if (message.amount.length !== 0) {
            writer.uint32(34).bytes(message.amount);
        }
        if (message.OrderStatus !== 0) {
            writer.uint32(40).int32(message.OrderStatus);
        }
        if (message.createdTime !== undefined) {
            Timestamp.encode(toTimestamp(message.createdTime), writer.uint32(50).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...basePlaceOrder };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.bytes();
                    break;
                case 2:
                    message.placeOrderIndex = reader.string();
                    break;
                case 3:
                    message.sellOrderID = reader.string();
                    break;
                case 4:
                    message.amount = reader.bytes();
                    break;
                case 5:
                    message.OrderStatus = reader.int32();
                    break;
                case 6:
                    message.createdTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...basePlaceOrder };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = bytesFromBase64(object.creator);
        }
        if (object.placeOrderIndex !== undefined && object.placeOrderIndex !== null) {
            message.placeOrderIndex = String(object.placeOrderIndex);
        }
        else {
            message.placeOrderIndex = '';
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
        if (object.OrderStatus !== undefined && object.OrderStatus !== null) {
            message.OrderStatus = Number(object.OrderStatus);
        }
        else {
            message.OrderStatus = 0;
        }
        if (object.createdTime !== undefined && object.createdTime !== null) {
            message.createdTime = fromJsonTimestamp(object.createdTime);
        }
        else {
            message.createdTime = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = base64FromBytes(message.creator !== undefined ? message.creator : new Uint8Array()));
        message.placeOrderIndex !== undefined && (obj.placeOrderIndex = message.placeOrderIndex);
        message.sellOrderID !== undefined && (obj.sellOrderID = message.sellOrderID);
        message.amount !== undefined && (obj.amount = base64FromBytes(message.amount !== undefined ? message.amount : new Uint8Array()));
        message.OrderStatus !== undefined && (obj.OrderStatus = message.OrderStatus);
        message.createdTime !== undefined && (obj.createdTime = message.createdTime !== undefined ? message.createdTime.toISOString() : null);
        return obj;
    },
    fromPartial(object) {
        const message = { ...basePlaceOrder };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = new Uint8Array();
        }
        if (object.placeOrderIndex !== undefined && object.placeOrderIndex !== null) {
            message.placeOrderIndex = object.placeOrderIndex;
        }
        else {
            message.placeOrderIndex = '';
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
        if (object.OrderStatus !== undefined && object.OrderStatus !== null) {
            message.OrderStatus = object.OrderStatus;
        }
        else {
            message.OrderStatus = 0;
        }
        if (object.createdTime !== undefined && object.createdTime !== null) {
            message.createdTime = object.createdTime;
        }
        else {
            message.createdTime = undefined;
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
function toTimestamp(date) {
    const seconds = date.getTime() / 1000;
    const nanos = (date.getTime() % 1000) * 1000000;
    return { seconds, nanos };
}
function fromTimestamp(t) {
    let millis = t.seconds * 1000;
    millis += t.nanos / 1000000;
    return new Date(millis);
}
function fromJsonTimestamp(o) {
    if (o instanceof Date) {
        return o;
    }
    else if (typeof o === 'string') {
        return new Date(o);
    }
    else {
        return fromTimestamp(Timestamp.fromJSON(o));
    }
}
