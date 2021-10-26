/* eslint-disable */
import * as Long from 'long';
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
export const protobufPackage = 'joltify.joltifychain.vault';
const baseParams = { blockChurnInterval: 0, power: 0, step: 0, candidateRatio: '' };
export const Params = {
    encode(message, writer = Writer.create()) {
        if (message.blockChurnInterval !== 0) {
            writer.uint32(8).int64(message.blockChurnInterval);
        }
        if (message.power !== 0) {
            writer.uint32(16).int64(message.power);
        }
        if (message.step !== 0) {
            writer.uint32(24).int64(message.step);
        }
        if (message.candidateRatio !== '') {
            writer.uint32(34).string(message.candidateRatio);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseParams };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.blockChurnInterval = longToNumber(reader.int64());
                    break;
                case 2:
                    message.power = longToNumber(reader.int64());
                    break;
                case 3:
                    message.step = longToNumber(reader.int64());
                    break;
                case 4:
                    message.candidateRatio = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseParams };
        if (object.blockChurnInterval !== undefined && object.blockChurnInterval !== null) {
            message.blockChurnInterval = Number(object.blockChurnInterval);
        }
        else {
            message.blockChurnInterval = 0;
        }
        if (object.power !== undefined && object.power !== null) {
            message.power = Number(object.power);
        }
        else {
            message.power = 0;
        }
        if (object.step !== undefined && object.step !== null) {
            message.step = Number(object.step);
        }
        else {
            message.step = 0;
        }
        if (object.candidateRatio !== undefined && object.candidateRatio !== null) {
            message.candidateRatio = String(object.candidateRatio);
        }
        else {
            message.candidateRatio = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.blockChurnInterval !== undefined && (obj.blockChurnInterval = message.blockChurnInterval);
        message.power !== undefined && (obj.power = message.power);
        message.step !== undefined && (obj.step = message.step);
        message.candidateRatio !== undefined && (obj.candidateRatio = message.candidateRatio);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseParams };
        if (object.blockChurnInterval !== undefined && object.blockChurnInterval !== null) {
            message.blockChurnInterval = object.blockChurnInterval;
        }
        else {
            message.blockChurnInterval = 0;
        }
        if (object.power !== undefined && object.power !== null) {
            message.power = object.power;
        }
        else {
            message.power = 0;
        }
        if (object.step !== undefined && object.step !== null) {
            message.step = object.step;
        }
        else {
            message.step = 0;
        }
        if (object.candidateRatio !== undefined && object.candidateRatio !== null) {
            message.candidateRatio = object.candidateRatio;
        }
        else {
            message.candidateRatio = '';
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
function longToNumber(long) {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER');
    }
    return long.toNumber();
}
if (util.Long !== Long) {
    util.Long = Long;
    configure();
}
