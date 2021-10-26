/* eslint-disable */
import { Reader, Writer } from 'protobufjs/minimal';
import { PoolProposal } from '../vault/create_pool';
import { PageRequest, PageResponse } from '../cosmos/base/query/v1beta1/pagination';
export const protobufPackage = 'joltify.joltifychain.vault';
const baseQueryGetCreatePoolRequest = { index: '' };
export const QueryGetCreatePoolRequest = {
    encode(message, writer = Writer.create()) {
        if (message.index !== '') {
            writer.uint32(10).string(message.index);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetCreatePoolRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.index = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryGetCreatePoolRequest };
        if (object.index !== undefined && object.index !== null) {
            message.index = String(object.index);
        }
        else {
            message.index = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.index !== undefined && (obj.index = message.index);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetCreatePoolRequest };
        if (object.index !== undefined && object.index !== null) {
            message.index = object.index;
        }
        else {
            message.index = '';
        }
        return message;
    }
};
const baseQueryGetCreatePoolResponse = {};
export const QueryGetCreatePoolResponse = {
    encode(message, writer = Writer.create()) {
        if (message.CreatePool !== undefined) {
            PoolProposal.encode(message.CreatePool, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetCreatePoolResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.CreatePool = PoolProposal.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryGetCreatePoolResponse };
        if (object.CreatePool !== undefined && object.CreatePool !== null) {
            message.CreatePool = PoolProposal.fromJSON(object.CreatePool);
        }
        else {
            message.CreatePool = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.CreatePool !== undefined && (obj.CreatePool = message.CreatePool ? PoolProposal.toJSON(message.CreatePool) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetCreatePoolResponse };
        if (object.CreatePool !== undefined && object.CreatePool !== null) {
            message.CreatePool = PoolProposal.fromPartial(object.CreatePool);
        }
        else {
            message.CreatePool = undefined;
        }
        return message;
    }
};
const baseQueryLastPoolResponse = { BlockHeight: '' };
export const QueryLastPoolResponse = {
    encode(message, writer = Writer.create()) {
        if (message.BlockHeight !== '') {
            writer.uint32(10).string(message.BlockHeight);
        }
        if (message.CreatePool !== undefined) {
            PoolProposal.encode(message.CreatePool, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryLastPoolResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.BlockHeight = reader.string();
                    break;
                case 2:
                    message.CreatePool = PoolProposal.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryLastPoolResponse };
        if (object.BlockHeight !== undefined && object.BlockHeight !== null) {
            message.BlockHeight = String(object.BlockHeight);
        }
        else {
            message.BlockHeight = '';
        }
        if (object.CreatePool !== undefined && object.CreatePool !== null) {
            message.CreatePool = PoolProposal.fromJSON(object.CreatePool);
        }
        else {
            message.CreatePool = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.BlockHeight !== undefined && (obj.BlockHeight = message.BlockHeight);
        message.CreatePool !== undefined && (obj.CreatePool = message.CreatePool ? PoolProposal.toJSON(message.CreatePool) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryLastPoolResponse };
        if (object.BlockHeight !== undefined && object.BlockHeight !== null) {
            message.BlockHeight = object.BlockHeight;
        }
        else {
            message.BlockHeight = '';
        }
        if (object.CreatePool !== undefined && object.CreatePool !== null) {
            message.CreatePool = PoolProposal.fromPartial(object.CreatePool);
        }
        else {
            message.CreatePool = undefined;
        }
        return message;
    }
};
const baseQueryAllCreatePoolRequest = {};
export const QueryAllCreatePoolRequest = {
    encode(message, writer = Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllCreatePoolRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pagination = PageRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryAllCreatePoolRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAllCreatePoolRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    }
};
const baseQueryLatestPoolRequest = {};
export const QueryLatestPoolRequest = {
    encode(message, writer = Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryLatestPoolRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 2:
                    message.pagination = PageRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryLatestPoolRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryLatestPoolRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    }
};
const baseQueryAllCreatePoolResponse = {};
export const QueryAllCreatePoolResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.CreatePool) {
            PoolProposal.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllCreatePoolResponse };
        message.CreatePool = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.CreatePool.push(PoolProposal.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = PageResponse.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryAllCreatePoolResponse };
        message.CreatePool = [];
        if (object.CreatePool !== undefined && object.CreatePool !== null) {
            for (const e of object.CreatePool) {
                message.CreatePool.push(PoolProposal.fromJSON(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.CreatePool) {
            obj.CreatePool = message.CreatePool.map((e) => (e ? PoolProposal.toJSON(e) : undefined));
        }
        else {
            obj.CreatePool = [];
        }
        message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAllCreatePoolResponse };
        message.CreatePool = [];
        if (object.CreatePool !== undefined && object.CreatePool !== null) {
            for (const e of object.CreatePool) {
                message.CreatePool.push(PoolProposal.fromPartial(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    }
};
export class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    CreatePool(request) {
        const data = QueryGetCreatePoolRequest.encode(request).finish();
        const promise = this.rpc.request('joltify.joltifychain.vault.Query', 'CreatePool', data);
        return promise.then((data) => QueryGetCreatePoolResponse.decode(new Reader(data)));
    }
    CreatePoolAll(request) {
        const data = QueryAllCreatePoolRequest.encode(request).finish();
        const promise = this.rpc.request('joltify.joltifychain.vault.Query', 'CreatePoolAll', data);
        return promise.then((data) => QueryAllCreatePoolResponse.decode(new Reader(data)));
    }
    GetLastPool(request) {
        const data = QueryLatestPoolRequest.encode(request).finish();
        const promise = this.rpc.request('joltify.joltifychain.vault.Query', 'GetLastPool', data);
        return promise.then((data) => QueryLastPoolResponse.decode(new Reader(data)));
    }
}
