/* eslint-disable */
import { PlaceOrder } from '../invoice/place_order'
import { SellOrder } from '../invoice/sell_order'
import { Invoice } from '../invoice/invoice'
import { Writer, Reader } from 'protobufjs/minimal'

export const protobufPackage = 'joltify.joltifychain.invoice'

/** GenesisState defines the invoice module's genesis state. */
export interface GenesisState {
  /** this line is used by starport scaffolding # genesis/proto/state */
  placeOrderList: PlaceOrder[]
  /** this line is used by starport scaffolding # genesis/proto/stateField */
  sellOrderList: SellOrder[]
  /** this line is used by starport scaffolding # genesis/proto/stateField */
  invoiceList: Invoice[]
}

const baseGenesisState: object = {}

export const GenesisState = {
  encode(message: GenesisState, writer: Writer = Writer.create()): Writer {
    for (const v of message.placeOrderList) {
      PlaceOrder.encode(v!, writer.uint32(26).fork()).ldelim()
    }
    for (const v of message.sellOrderList) {
      SellOrder.encode(v!, writer.uint32(18).fork()).ldelim()
    }
    for (const v of message.invoiceList) {
      Invoice.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseGenesisState } as GenesisState
    message.placeOrderList = []
    message.sellOrderList = []
    message.invoiceList = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 3:
          message.placeOrderList.push(PlaceOrder.decode(reader, reader.uint32()))
          break
        case 2:
          message.sellOrderList.push(SellOrder.decode(reader, reader.uint32()))
          break
        case 1:
          message.invoiceList.push(Invoice.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): GenesisState {
    const message = { ...baseGenesisState } as GenesisState
    message.placeOrderList = []
    message.sellOrderList = []
    message.invoiceList = []
    if (object.placeOrderList !== undefined && object.placeOrderList !== null) {
      for (const e of object.placeOrderList) {
        message.placeOrderList.push(PlaceOrder.fromJSON(e))
      }
    }
    if (object.sellOrderList !== undefined && object.sellOrderList !== null) {
      for (const e of object.sellOrderList) {
        message.sellOrderList.push(SellOrder.fromJSON(e))
      }
    }
    if (object.invoiceList !== undefined && object.invoiceList !== null) {
      for (const e of object.invoiceList) {
        message.invoiceList.push(Invoice.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {}
    if (message.placeOrderList) {
      obj.placeOrderList = message.placeOrderList.map((e) => (e ? PlaceOrder.toJSON(e) : undefined))
    } else {
      obj.placeOrderList = []
    }
    if (message.sellOrderList) {
      obj.sellOrderList = message.sellOrderList.map((e) => (e ? SellOrder.toJSON(e) : undefined))
    } else {
      obj.sellOrderList = []
    }
    if (message.invoiceList) {
      obj.invoiceList = message.invoiceList.map((e) => (e ? Invoice.toJSON(e) : undefined))
    } else {
      obj.invoiceList = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState
    message.placeOrderList = []
    message.sellOrderList = []
    message.invoiceList = []
    if (object.placeOrderList !== undefined && object.placeOrderList !== null) {
      for (const e of object.placeOrderList) {
        message.placeOrderList.push(PlaceOrder.fromPartial(e))
      }
    }
    if (object.sellOrderList !== undefined && object.sellOrderList !== null) {
      for (const e of object.sellOrderList) {
        message.sellOrderList.push(SellOrder.fromPartial(e))
      }
    }
    if (object.invoiceList !== undefined && object.invoiceList !== null) {
      for (const e of object.invoiceList) {
        message.invoiceList.push(Invoice.fromPartial(e))
      }
    }
    return message
  }
}

type Builtin = Date | Function | Uint8Array | string | number | undefined
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>
