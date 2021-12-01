/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';
export const protobufPackage = 'joltify.joltifychain.vault';
const baseIssueToken = { index: '' };
export const IssueToken = {
    encode(message, writer = Writer.create()) {
        if (message.creator.length !== 0) {
            writer.uint32(10).bytes(message.creator);
        }
        if (message.index !== '') {
            writer.uint32(18).string(message.index);
        }
        if (message.coin.length !== 0) {
            writer.uint32(26).bytes(message.coin);
        }
        if (message.receiver.length !== 0) {
            writer.uint32(34).bytes(message.receiver);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseIssueToken };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.bytes();
                    break;
                case 2:
                    message.index = reader.string();
                    break;
                case 3:
                    message.coin = reader.bytes();
                    break;
                case 4:
                    message.receiver = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseIssueToken };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = bytesFromBase64(object.creator);
        }
        if (object.index !== undefined && object.index !== null) {
            message.index = String(object.index);
        }
        else {
            message.index = '';
        }
        if (object.coin !== undefined && object.coin !== null) {
            message.coin = bytesFromBase64(object.coin);
        }
        if (object.receiver !== undefined && object.receiver !== null) {
            message.receiver = bytesFromBase64(object.receiver);
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = base64FromBytes(message.creator !== undefined ? message.creator : new Uint8Array()));
        message.index !== undefined && (obj.index = message.index);
        message.coin !== undefined && (obj.coin = base64FromBytes(message.coin !== undefined ? message.coin : new Uint8Array()));
        message.receiver !== undefined && (obj.receiver = base64FromBytes(message.receiver !== undefined ? message.receiver : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseIssueToken };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = new Uint8Array();
        }
        if (object.index !== undefined && object.index !== null) {
            message.index = object.index;
        }
        else {
            message.index = '';
        }
        if (object.coin !== undefined && object.coin !== null) {
            message.coin = object.coin;
        }
        else {
            message.coin = new Uint8Array();
        }
        if (object.receiver !== undefined && object.receiver !== null) {
            message.receiver = object.receiver;
        }
        else {
            message.receiver = new Uint8Array();
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
