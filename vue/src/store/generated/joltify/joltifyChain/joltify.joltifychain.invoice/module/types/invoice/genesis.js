/* eslint-disable */
import { PlaceOrder } from '../invoice/place_order';
import { SellOrder } from '../invoice/sell_order';
import { Invoice } from '../invoice/invoice';
import { Writer, Reader } from 'protobufjs/minimal';
export const protobufPackage = 'joltify.joltifychain.invoice';
const baseGenesisState = {};
export const GenesisState = {
    encode(message, writer = Writer.create()) {
        for (const v of message.placeOrderList) {
            PlaceOrder.encode(v, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.sellOrderList) {
            SellOrder.encode(v, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.invoiceList) {
            Invoice.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseGenesisState };
        message.placeOrderList = [];
        message.sellOrderList = [];
        message.invoiceList = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 3:
                    message.placeOrderList.push(PlaceOrder.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.sellOrderList.push(SellOrder.decode(reader, reader.uint32()));
                    break;
                case 1:
                    message.invoiceList.push(Invoice.decode(reader, reader.uint32()));
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
        message.placeOrderList = [];
        message.sellOrderList = [];
        message.invoiceList = [];
        if (object.placeOrderList !== undefined && object.placeOrderList !== null) {
            for (const e of object.placeOrderList) {
                message.placeOrderList.push(PlaceOrder.fromJSON(e));
            }
        }
        if (object.sellOrderList !== undefined && object.sellOrderList !== null) {
            for (const e of object.sellOrderList) {
                message.sellOrderList.push(SellOrder.fromJSON(e));
            }
        }
        if (object.invoiceList !== undefined && object.invoiceList !== null) {
            for (const e of object.invoiceList) {
                message.invoiceList.push(Invoice.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.placeOrderList) {
            obj.placeOrderList = message.placeOrderList.map((e) => (e ? PlaceOrder.toJSON(e) : undefined));
        }
        else {
            obj.placeOrderList = [];
        }
        if (message.sellOrderList) {
            obj.sellOrderList = message.sellOrderList.map((e) => (e ? SellOrder.toJSON(e) : undefined));
        }
        else {
            obj.sellOrderList = [];
        }
        if (message.invoiceList) {
            obj.invoiceList = message.invoiceList.map((e) => (e ? Invoice.toJSON(e) : undefined));
        }
        else {
            obj.invoiceList = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseGenesisState };
        message.placeOrderList = [];
        message.sellOrderList = [];
        message.invoiceList = [];
        if (object.placeOrderList !== undefined && object.placeOrderList !== null) {
            for (const e of object.placeOrderList) {
                message.placeOrderList.push(PlaceOrder.fromPartial(e));
            }
        }
        if (object.sellOrderList !== undefined && object.sellOrderList !== null) {
            for (const e of object.sellOrderList) {
                message.sellOrderList.push(SellOrder.fromPartial(e));
            }
        }
        if (object.invoiceList !== undefined && object.invoiceList !== null) {
            for (const e of object.invoiceList) {
                message.invoiceList.push(Invoice.fromPartial(e));
            }
        }
        return message;
    }
};
