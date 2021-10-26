/* eslint-disable */
import { Reader, Writer } from 'protobufjs/minimal';
export const protobufPackage = 'joltify.joltifychain.vault';
const baseMsgCreateCreatePool = { poolPubKey: '', blockHeight: '' };
export const MsgCreateCreatePool = {
    encode(message, writer = Writer.create()) {
        if (message.creator.length !== 0) {
            writer.uint32(10).bytes(message.creator);
        }
        if (message.poolPubKey !== '') {
            writer.uint32(18).string(message.poolPubKey);
        }
        if (message.blockHeight !== '') {
            writer.uint32(26).string(message.blockHeight);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreateCreatePool };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.bytes();
                    break;
                case 2:
                    message.poolPubKey = reader.string();
                    break;
                case 3:
                    message.blockHeight = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgCreateCreatePool };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = bytesFromBase64(object.creator);
        }
        if (object.poolPubKey !== undefined && object.poolPubKey !== null) {
            message.poolPubKey = String(object.poolPubKey);
        }
        else {
            message.poolPubKey = '';
        }
        if (object.blockHeight !== undefined && object.blockHeight !== null) {
            message.blockHeight = String(object.blockHeight);
        }
        else {
            message.blockHeight = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = base64FromBytes(message.creator !== undefined ? message.creator : new Uint8Array()));
        message.poolPubKey !== undefined && (obj.poolPubKey = message.poolPubKey);
        message.blockHeight !== undefined && (obj.blockHeight = message.blockHeight);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgCreateCreatePool };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = new Uint8Array();
        }
        if (object.poolPubKey !== undefined && object.poolPubKey !== null) {
            message.poolPubKey = object.poolPubKey;
        }
        else {
            message.poolPubKey = '';
        }
        if (object.blockHeight !== undefined && object.blockHeight !== null) {
            message.blockHeight = object.blockHeight;
        }
        else {
            message.blockHeight = '';
        }
        return message;
    }
};
const baseMsgCreateCreatePoolResponse = { successful: false };
export const MsgCreateCreatePoolResponse = {
    encode(message, writer = Writer.create()) {
        if (message.successful === true) {
            writer.uint32(8).bool(message.successful);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreateCreatePoolResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.successful = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgCreateCreatePoolResponse };
        if (object.successful !== undefined && object.successful !== null) {
            message.successful = Boolean(object.successful);
        }
        else {
            message.successful = false;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.successful !== undefined && (obj.successful = message.successful);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgCreateCreatePoolResponse };
        if (object.successful !== undefined && object.successful !== null) {
            message.successful = object.successful;
        }
        else {
            message.successful = false;
        }
        return message;
    }
};
export class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    CreateCreatePool(request) {
        const data = MsgCreateCreatePool.encode(request).finish();
        const promise = this.rpc.request('joltify.joltifychain.vault.Msg', 'CreateCreatePool', data);
        return promise.then((data) => MsgCreateCreatePoolResponse.decode(new Reader(data)));
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
