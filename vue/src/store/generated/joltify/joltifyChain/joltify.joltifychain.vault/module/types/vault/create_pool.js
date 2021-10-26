/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';
export const protobufPackage = 'joltify.joltifychain.vault';
const basePoolProposal = { poolPubKey: '' };
export const PoolProposal = {
    encode(message, writer = Writer.create()) {
        if (message.poolPubKey !== '') {
            writer.uint32(10).string(message.poolPubKey);
        }
        for (const v of message.nodes) {
            writer.uint32(18).bytes(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...basePoolProposal };
        message.nodes = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.poolPubKey = reader.string();
                    break;
                case 2:
                    message.nodes.push(reader.bytes());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...basePoolProposal };
        message.nodes = [];
        if (object.poolPubKey !== undefined && object.poolPubKey !== null) {
            message.poolPubKey = String(object.poolPubKey);
        }
        else {
            message.poolPubKey = '';
        }
        if (object.nodes !== undefined && object.nodes !== null) {
            for (const e of object.nodes) {
                message.nodes.push(bytesFromBase64(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.poolPubKey !== undefined && (obj.poolPubKey = message.poolPubKey);
        if (message.nodes) {
            obj.nodes = message.nodes.map((e) => base64FromBytes(e !== undefined ? e : new Uint8Array()));
        }
        else {
            obj.nodes = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...basePoolProposal };
        message.nodes = [];
        if (object.poolPubKey !== undefined && object.poolPubKey !== null) {
            message.poolPubKey = object.poolPubKey;
        }
        else {
            message.poolPubKey = '';
        }
        if (object.nodes !== undefined && object.nodes !== null) {
            for (const e of object.nodes) {
                message.nodes.push(e);
            }
        }
        return message;
    }
};
const baseCreatePool = { blockHeight: '' };
export const CreatePool = {
    encode(message, writer = Writer.create()) {
        if (message.blockHeight !== '') {
            writer.uint32(10).string(message.blockHeight);
        }
        for (const v of message.validators) {
            writer.uint32(18).bytes(v);
        }
        for (const v of message.proposal) {
            PoolProposal.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseCreatePool };
        message.validators = [];
        message.proposal = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.blockHeight = reader.string();
                    break;
                case 2:
                    message.validators.push(reader.bytes());
                    break;
                case 3:
                    message.proposal.push(PoolProposal.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseCreatePool };
        message.validators = [];
        message.proposal = [];
        if (object.blockHeight !== undefined && object.blockHeight !== null) {
            message.blockHeight = String(object.blockHeight);
        }
        else {
            message.blockHeight = '';
        }
        if (object.validators !== undefined && object.validators !== null) {
            for (const e of object.validators) {
                message.validators.push(bytesFromBase64(e));
            }
        }
        if (object.proposal !== undefined && object.proposal !== null) {
            for (const e of object.proposal) {
                message.proposal.push(PoolProposal.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.blockHeight !== undefined && (obj.blockHeight = message.blockHeight);
        if (message.validators) {
            obj.validators = message.validators.map((e) => base64FromBytes(e !== undefined ? e : new Uint8Array()));
        }
        else {
            obj.validators = [];
        }
        if (message.proposal) {
            obj.proposal = message.proposal.map((e) => (e ? PoolProposal.toJSON(e) : undefined));
        }
        else {
            obj.proposal = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseCreatePool };
        message.validators = [];
        message.proposal = [];
        if (object.blockHeight !== undefined && object.blockHeight !== null) {
            message.blockHeight = object.blockHeight;
        }
        else {
            message.blockHeight = '';
        }
        if (object.validators !== undefined && object.validators !== null) {
            for (const e of object.validators) {
                message.validators.push(e);
            }
        }
        if (object.proposal !== undefined && object.proposal !== null) {
            for (const e of object.proposal) {
                message.proposal.push(PoolProposal.fromPartial(e));
            }
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
