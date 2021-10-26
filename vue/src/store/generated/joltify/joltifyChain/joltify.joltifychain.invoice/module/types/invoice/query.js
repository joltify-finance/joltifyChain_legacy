/* eslint-disable */
import { Reader, Writer } from 'protobufjs/minimal';
import { PlaceOrder } from '../invoice/place_order';
import { PageRequest, PageResponse } from '../cosmos/base/query/v1beta1/pagination';
import { SellOrder } from '../invoice/sell_order';
import { Invoice } from '../invoice/invoice';
export const protobufPackage = 'joltify.joltifychain.invoice';
const baseQueryGetPlaceOrderRequest = { index: '' };
export const QueryGetPlaceOrderRequest = {
    encode(message, writer = Writer.create()) {
        if (message.index !== '') {
            writer.uint32(10).string(message.index);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetPlaceOrderRequest };
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
        const message = { ...baseQueryGetPlaceOrderRequest };
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
        const message = { ...baseQueryGetPlaceOrderRequest };
        if (object.index !== undefined && object.index !== null) {
            message.index = object.index;
        }
        else {
            message.index = '';
        }
        return message;
    }
};
const baseQueryGetPlaceOrderResponse = {};
export const QueryGetPlaceOrderResponse = {
    encode(message, writer = Writer.create()) {
        if (message.PlaceOrder !== undefined) {
            PlaceOrder.encode(message.PlaceOrder, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetPlaceOrderResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.PlaceOrder = PlaceOrder.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryGetPlaceOrderResponse };
        if (object.PlaceOrder !== undefined && object.PlaceOrder !== null) {
            message.PlaceOrder = PlaceOrder.fromJSON(object.PlaceOrder);
        }
        else {
            message.PlaceOrder = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.PlaceOrder !== undefined && (obj.PlaceOrder = message.PlaceOrder ? PlaceOrder.toJSON(message.PlaceOrder) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetPlaceOrderResponse };
        if (object.PlaceOrder !== undefined && object.PlaceOrder !== null) {
            message.PlaceOrder = PlaceOrder.fromPartial(object.PlaceOrder);
        }
        else {
            message.PlaceOrder = undefined;
        }
        return message;
    }
};
const baseQueryAllPlaceOrderRequest = {};
export const QueryAllPlaceOrderRequest = {
    encode(message, writer = Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllPlaceOrderRequest };
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
        const message = { ...baseQueryAllPlaceOrderRequest };
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
        const message = { ...baseQueryAllPlaceOrderRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    }
};
const baseQueryAllPlaceOrderResponse = {};
export const QueryAllPlaceOrderResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.PlaceOrder) {
            PlaceOrder.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllPlaceOrderResponse };
        message.PlaceOrder = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.PlaceOrder.push(PlaceOrder.decode(reader, reader.uint32()));
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
        const message = { ...baseQueryAllPlaceOrderResponse };
        message.PlaceOrder = [];
        if (object.PlaceOrder !== undefined && object.PlaceOrder !== null) {
            for (const e of object.PlaceOrder) {
                message.PlaceOrder.push(PlaceOrder.fromJSON(e));
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
        if (message.PlaceOrder) {
            obj.PlaceOrder = message.PlaceOrder.map((e) => (e ? PlaceOrder.toJSON(e) : undefined));
        }
        else {
            obj.PlaceOrder = [];
        }
        message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAllPlaceOrderResponse };
        message.PlaceOrder = [];
        if (object.PlaceOrder !== undefined && object.PlaceOrder !== null) {
            for (const e of object.PlaceOrder) {
                message.PlaceOrder.push(PlaceOrder.fromPartial(e));
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
const baseQueryGetSellOrderRequest = { index: '' };
export const QueryGetSellOrderRequest = {
    encode(message, writer = Writer.create()) {
        if (message.index !== '') {
            writer.uint32(10).string(message.index);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetSellOrderRequest };
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
        const message = { ...baseQueryGetSellOrderRequest };
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
        const message = { ...baseQueryGetSellOrderRequest };
        if (object.index !== undefined && object.index !== null) {
            message.index = object.index;
        }
        else {
            message.index = '';
        }
        return message;
    }
};
const baseQueryGetSellOrderResponse = {};
export const QueryGetSellOrderResponse = {
    encode(message, writer = Writer.create()) {
        if (message.SellOrder !== undefined) {
            SellOrder.encode(message.SellOrder, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetSellOrderResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.SellOrder = SellOrder.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryGetSellOrderResponse };
        if (object.SellOrder !== undefined && object.SellOrder !== null) {
            message.SellOrder = SellOrder.fromJSON(object.SellOrder);
        }
        else {
            message.SellOrder = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.SellOrder !== undefined && (obj.SellOrder = message.SellOrder ? SellOrder.toJSON(message.SellOrder) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetSellOrderResponse };
        if (object.SellOrder !== undefined && object.SellOrder !== null) {
            message.SellOrder = SellOrder.fromPartial(object.SellOrder);
        }
        else {
            message.SellOrder = undefined;
        }
        return message;
    }
};
const baseQueryAllSellOrderRequest = {};
export const QueryAllSellOrderRequest = {
    encode(message, writer = Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllSellOrderRequest };
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
        const message = { ...baseQueryAllSellOrderRequest };
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
        const message = { ...baseQueryAllSellOrderRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    }
};
const baseQueryAllSellOrderResponse = {};
export const QueryAllSellOrderResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.SellOrder) {
            SellOrder.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllSellOrderResponse };
        message.SellOrder = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.SellOrder.push(SellOrder.decode(reader, reader.uint32()));
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
        const message = { ...baseQueryAllSellOrderResponse };
        message.SellOrder = [];
        if (object.SellOrder !== undefined && object.SellOrder !== null) {
            for (const e of object.SellOrder) {
                message.SellOrder.push(SellOrder.fromJSON(e));
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
        if (message.SellOrder) {
            obj.SellOrder = message.SellOrder.map((e) => (e ? SellOrder.toJSON(e) : undefined));
        }
        else {
            obj.SellOrder = [];
        }
        message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAllSellOrderResponse };
        message.SellOrder = [];
        if (object.SellOrder !== undefined && object.SellOrder !== null) {
            for (const e of object.SellOrder) {
                message.SellOrder.push(SellOrder.fromPartial(e));
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
const baseQueryGetInvoiceRequest = { index: '' };
export const QueryGetInvoiceRequest = {
    encode(message, writer = Writer.create()) {
        if (message.index !== '') {
            writer.uint32(10).string(message.index);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetInvoiceRequest };
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
        const message = { ...baseQueryGetInvoiceRequest };
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
        const message = { ...baseQueryGetInvoiceRequest };
        if (object.index !== undefined && object.index !== null) {
            message.index = object.index;
        }
        else {
            message.index = '';
        }
        return message;
    }
};
const baseQueryGetInvoiceResponse = {};
export const QueryGetInvoiceResponse = {
    encode(message, writer = Writer.create()) {
        if (message.Invoice !== undefined) {
            Invoice.encode(message.Invoice, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetInvoiceResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Invoice = Invoice.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryGetInvoiceResponse };
        if (object.Invoice !== undefined && object.Invoice !== null) {
            message.Invoice = Invoice.fromJSON(object.Invoice);
        }
        else {
            message.Invoice = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.Invoice !== undefined && (obj.Invoice = message.Invoice ? Invoice.toJSON(message.Invoice) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetInvoiceResponse };
        if (object.Invoice !== undefined && object.Invoice !== null) {
            message.Invoice = Invoice.fromPartial(object.Invoice);
        }
        else {
            message.Invoice = undefined;
        }
        return message;
    }
};
const baseQueryAllInvoiceRequest = {};
export const QueryAllInvoiceRequest = {
    encode(message, writer = Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllInvoiceRequest };
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
        const message = { ...baseQueryAllInvoiceRequest };
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
        const message = { ...baseQueryAllInvoiceRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    }
};
const baseQueryAllInvoiceResponse = {};
export const QueryAllInvoiceResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.Invoice) {
            Invoice.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllInvoiceResponse };
        message.Invoice = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Invoice.push(Invoice.decode(reader, reader.uint32()));
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
        const message = { ...baseQueryAllInvoiceResponse };
        message.Invoice = [];
        if (object.Invoice !== undefined && object.Invoice !== null) {
            for (const e of object.Invoice) {
                message.Invoice.push(Invoice.fromJSON(e));
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
        if (message.Invoice) {
            obj.Invoice = message.Invoice.map((e) => (e ? Invoice.toJSON(e) : undefined));
        }
        else {
            obj.Invoice = [];
        }
        message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAllInvoiceResponse };
        message.Invoice = [];
        if (object.Invoice !== undefined && object.Invoice !== null) {
            for (const e of object.Invoice) {
                message.Invoice.push(Invoice.fromPartial(e));
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
    PlaceOrder(request) {
        const data = QueryGetPlaceOrderRequest.encode(request).finish();
        const promise = this.rpc.request('joltify.joltifychain.invoice.Query', 'PlaceOrder', data);
        return promise.then((data) => QueryGetPlaceOrderResponse.decode(new Reader(data)));
    }
    PlaceOrderAll(request) {
        const data = QueryAllPlaceOrderRequest.encode(request).finish();
        const promise = this.rpc.request('joltify.joltifychain.invoice.Query', 'PlaceOrderAll', data);
        return promise.then((data) => QueryAllPlaceOrderResponse.decode(new Reader(data)));
    }
    SellOrder(request) {
        const data = QueryGetSellOrderRequest.encode(request).finish();
        const promise = this.rpc.request('joltify.joltifychain.invoice.Query', 'SellOrder', data);
        return promise.then((data) => QueryGetSellOrderResponse.decode(new Reader(data)));
    }
    SellOrderAll(request) {
        const data = QueryAllSellOrderRequest.encode(request).finish();
        const promise = this.rpc.request('joltify.joltifychain.invoice.Query', 'SellOrderAll', data);
        return promise.then((data) => QueryAllSellOrderResponse.decode(new Reader(data)));
    }
    Invoice(request) {
        const data = QueryGetInvoiceRequest.encode(request).finish();
        const promise = this.rpc.request('joltify.joltifychain.invoice.Query', 'Invoice', data);
        return promise.then((data) => QueryGetInvoiceResponse.decode(new Reader(data)));
    }
    InvoiceAll(request) {
        const data = QueryAllInvoiceRequest.encode(request).finish();
        const promise = this.rpc.request('joltify.joltifychain.invoice.Query', 'InvoiceAll', data);
        return promise.then((data) => QueryAllInvoiceResponse.decode(new Reader(data)));
    }
}
