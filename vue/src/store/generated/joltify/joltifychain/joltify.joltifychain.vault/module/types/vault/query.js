/* eslint-disable */
import { Reader, Writer } from 'protobufjs/minimal';
import { OutboundTx } from '../vault/outbound_tx';
import { PageRequest, PageResponse } from '../cosmos/base/query/v1beta1/pagination';
import { IssueToken } from '../vault/issue_token';
import { PoolProposal } from '../vault/create_pool';
export const protobufPackage = 'joltify.joltifychain.vault';
const baseQueryGetOutboundTxRequest = { requestID: '' };
export const QueryGetOutboundTxRequest = {
    encode(message, writer = Writer.create()) {
        if (message.requestID !== '') {
            writer.uint32(10).string(message.requestID);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetOutboundTxRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.requestID = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryGetOutboundTxRequest };
        if (object.requestID !== undefined && object.requestID !== null) {
            message.requestID = String(object.requestID);
        }
        else {
            message.requestID = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.requestID !== undefined && (obj.requestID = message.requestID);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetOutboundTxRequest };
        if (object.requestID !== undefined && object.requestID !== null) {
            message.requestID = object.requestID;
        }
        else {
            message.requestID = '';
        }
        return message;
    }
};
const baseQueryGetOutboundTxResponse = {};
export const QueryGetOutboundTxResponse = {
    encode(message, writer = Writer.create()) {
        if (message.outboundTx !== undefined) {
            OutboundTx.encode(message.outboundTx, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetOutboundTxResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.outboundTx = OutboundTx.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryGetOutboundTxResponse };
        if (object.outboundTx !== undefined && object.outboundTx !== null) {
            message.outboundTx = OutboundTx.fromJSON(object.outboundTx);
        }
        else {
            message.outboundTx = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.outboundTx !== undefined && (obj.outboundTx = message.outboundTx ? OutboundTx.toJSON(message.outboundTx) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetOutboundTxResponse };
        if (object.outboundTx !== undefined && object.outboundTx !== null) {
            message.outboundTx = OutboundTx.fromPartial(object.outboundTx);
        }
        else {
            message.outboundTx = undefined;
        }
        return message;
    }
};
const baseQueryAllOutboundTxRequest = {};
export const QueryAllOutboundTxRequest = {
    encode(message, writer = Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllOutboundTxRequest };
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
        const message = { ...baseQueryAllOutboundTxRequest };
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
        const message = { ...baseQueryAllOutboundTxRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    }
};
const baseQueryAllOutboundTxResponse = {};
export const QueryAllOutboundTxResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.outboundTx) {
            OutboundTx.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllOutboundTxResponse };
        message.outboundTx = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.outboundTx.push(OutboundTx.decode(reader, reader.uint32()));
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
        const message = { ...baseQueryAllOutboundTxResponse };
        message.outboundTx = [];
        if (object.outboundTx !== undefined && object.outboundTx !== null) {
            for (const e of object.outboundTx) {
                message.outboundTx.push(OutboundTx.fromJSON(e));
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
        if (message.outboundTx) {
            obj.outboundTx = message.outboundTx.map((e) => (e ? OutboundTx.toJSON(e) : undefined));
        }
        else {
            obj.outboundTx = [];
        }
        message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAllOutboundTxResponse };
        message.outboundTx = [];
        if (object.outboundTx !== undefined && object.outboundTx !== null) {
            for (const e of object.outboundTx) {
                message.outboundTx.push(OutboundTx.fromPartial(e));
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
const baseQueryGetIssueTokenRequest = { index: '' };
export const QueryGetIssueTokenRequest = {
    encode(message, writer = Writer.create()) {
        if (message.index !== '') {
            writer.uint32(10).string(message.index);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetIssueTokenRequest };
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
        const message = { ...baseQueryGetIssueTokenRequest };
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
        const message = { ...baseQueryGetIssueTokenRequest };
        if (object.index !== undefined && object.index !== null) {
            message.index = object.index;
        }
        else {
            message.index = '';
        }
        return message;
    }
};
const baseQueryGetIssueTokenResponse = {};
export const QueryGetIssueTokenResponse = {
    encode(message, writer = Writer.create()) {
        if (message.IssueToken !== undefined) {
            IssueToken.encode(message.IssueToken, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetIssueTokenResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.IssueToken = IssueToken.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryGetIssueTokenResponse };
        if (object.IssueToken !== undefined && object.IssueToken !== null) {
            message.IssueToken = IssueToken.fromJSON(object.IssueToken);
        }
        else {
            message.IssueToken = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.IssueToken !== undefined && (obj.IssueToken = message.IssueToken ? IssueToken.toJSON(message.IssueToken) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetIssueTokenResponse };
        if (object.IssueToken !== undefined && object.IssueToken !== null) {
            message.IssueToken = IssueToken.fromPartial(object.IssueToken);
        }
        else {
            message.IssueToken = undefined;
        }
        return message;
    }
};
const baseQueryAllIssueTokenRequest = {};
export const QueryAllIssueTokenRequest = {
    encode(message, writer = Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllIssueTokenRequest };
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
        const message = { ...baseQueryAllIssueTokenRequest };
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
        const message = { ...baseQueryAllIssueTokenRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    }
};
const baseQueryAllIssueTokenResponse = {};
export const QueryAllIssueTokenResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.IssueToken) {
            IssueToken.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllIssueTokenResponse };
        message.IssueToken = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.IssueToken.push(IssueToken.decode(reader, reader.uint32()));
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
        const message = { ...baseQueryAllIssueTokenResponse };
        message.IssueToken = [];
        if (object.IssueToken !== undefined && object.IssueToken !== null) {
            for (const e of object.IssueToken) {
                message.IssueToken.push(IssueToken.fromJSON(e));
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
        if (message.IssueToken) {
            obj.IssueToken = message.IssueToken.map((e) => (e ? IssueToken.toJSON(e) : undefined));
        }
        else {
            obj.IssueToken = [];
        }
        message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAllIssueTokenResponse };
        message.IssueToken = [];
        if (object.IssueToken !== undefined && object.IssueToken !== null) {
            for (const e of object.IssueToken) {
                message.IssueToken.push(IssueToken.fromPartial(e));
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
const basepoolInfo = { BlockHeight: '' };
export const poolInfo = {
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
        const message = { ...basepoolInfo };
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
        const message = { ...basepoolInfo };
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
        const message = { ...basepoolInfo };
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
const baseQueryLastPoolResponse = {};
export const QueryLastPoolResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.pools) {
            poolInfo.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryLastPoolResponse };
        message.pools = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pools.push(poolInfo.decode(reader, reader.uint32()));
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
        message.pools = [];
        if (object.pools !== undefined && object.pools !== null) {
            for (const e of object.pools) {
                message.pools.push(poolInfo.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.pools) {
            obj.pools = message.pools.map((e) => (e ? poolInfo.toJSON(e) : undefined));
        }
        else {
            obj.pools = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryLastPoolResponse };
        message.pools = [];
        if (object.pools !== undefined && object.pools !== null) {
            for (const e of object.pools) {
                message.pools.push(poolInfo.fromPartial(e));
            }
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
    OutboundTx(request) {
        const data = QueryGetOutboundTxRequest.encode(request).finish();
        const promise = this.rpc.request('joltify.joltifychain.vault.Query', 'OutboundTx', data);
        return promise.then((data) => QueryGetOutboundTxResponse.decode(new Reader(data)));
    }
    OutboundTxAll(request) {
        const data = QueryAllOutboundTxRequest.encode(request).finish();
        const promise = this.rpc.request('joltify.joltifychain.vault.Query', 'OutboundTxAll', data);
        return promise.then((data) => QueryAllOutboundTxResponse.decode(new Reader(data)));
    }
    IssueToken(request) {
        const data = QueryGetIssueTokenRequest.encode(request).finish();
        const promise = this.rpc.request('joltify.joltifychain.vault.Query', 'IssueToken', data);
        return promise.then((data) => QueryGetIssueTokenResponse.decode(new Reader(data)));
    }
    IssueTokenAll(request) {
        const data = QueryAllIssueTokenRequest.encode(request).finish();
        const promise = this.rpc.request('joltify.joltifychain.vault.Query', 'IssueTokenAll', data);
        return promise.then((data) => QueryAllIssueTokenResponse.decode(new Reader(data)));
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
