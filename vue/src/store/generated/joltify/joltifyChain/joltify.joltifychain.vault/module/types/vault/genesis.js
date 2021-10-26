/* eslint-disable */
import { Params } from '../vault/staking';
import { CreatePool } from '../vault/create_pool';
import { Writer, Reader } from 'protobufjs/minimal';
export const protobufPackage = 'joltify.joltifychain.vault';
const baseGenesisState = { exported: false };
export const GenesisState = {
    encode(message, writer = Writer.create()) {
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.createPoolList) {
            CreatePool.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.exported === true) {
            writer.uint32(24).bool(message.exported);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseGenesisState };
        message.createPoolList = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.params = Params.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.createPoolList.push(CreatePool.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.exported = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseGenesisState };
        message.createPoolList = [];
        if (object.params !== undefined && object.params !== null) {
            message.params = Params.fromJSON(object.params);
        }
        else {
            message.params = undefined;
        }
        if (object.createPoolList !== undefined && object.createPoolList !== null) {
            for (const e of object.createPoolList) {
                message.createPoolList.push(CreatePool.fromJSON(e));
            }
        }
        if (object.exported !== undefined && object.exported !== null) {
            message.exported = Boolean(object.exported);
        }
        else {
            message.exported = false;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
        if (message.createPoolList) {
            obj.createPoolList = message.createPoolList.map((e) => (e ? CreatePool.toJSON(e) : undefined));
        }
        else {
            obj.createPoolList = [];
        }
        message.exported !== undefined && (obj.exported = message.exported);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseGenesisState };
        message.createPoolList = [];
        if (object.params !== undefined && object.params !== null) {
            message.params = Params.fromPartial(object.params);
        }
        else {
            message.params = undefined;
        }
        if (object.createPoolList !== undefined && object.createPoolList !== null) {
            for (const e of object.createPoolList) {
                message.createPoolList.push(CreatePool.fromPartial(e));
            }
        }
        if (object.exported !== undefined && object.exported !== null) {
            message.exported = object.exported;
        }
        else {
            message.exported = false;
        }
        return message;
    }
};
