/* eslint-disable */
import { Reader, Writer } from 'protobufjs/minimal'
import { Duration } from '../google/protobuf/duration'

export const protobufPackage = 'joltify.joltifychain.invoice'

/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgCreatePlaceOrder {
  creator: Uint8Array
  sellOrderID: string
  amount: Uint8Array
  price: Uint8Array
}

export interface MsgCreatePlaceOrderResponse {
  placeOrderID: string
}

export interface MsgCreateSellOrder {
  creator: Uint8Array
  sellInvoiceID: string
  amount: Uint8Array
  sellDuration: Duration | undefined
  price: Uint8Array
}

export interface MsgCreateSellOrderResponse {
  orderID: string
}

export interface MsgDeleteSellOrder {
  creator: Uint8Array
  sellOrderID: string
}

export interface MsgDeleteSellOrderResponse {}

export interface MsgCreateInvoice {
  creator: string
  origOwner: string
  name: string
  url: string
  amount: string
  apy: string
  isRootOwner: boolean
}

export interface MsgCreateInvoiceResponse {
  invoiceID: string
}

export interface MsgDeleteInvoice {
  creator: string
  origOwner: string
  name: string
}

export interface MsgDeleteInvoiceResponse {}

const baseMsgCreatePlaceOrder: object = { sellOrderID: '' }

export const MsgCreatePlaceOrder = {
  encode(message: MsgCreatePlaceOrder, writer: Writer = Writer.create()): Writer {
    if (message.creator.length !== 0) {
      writer.uint32(10).bytes(message.creator)
    }
    if (message.sellOrderID !== '') {
      writer.uint32(26).string(message.sellOrderID)
    }
    if (message.amount.length !== 0) {
      writer.uint32(34).bytes(message.amount)
    }
    if (message.price.length !== 0) {
      writer.uint32(42).bytes(message.price)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreatePlaceOrder {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgCreatePlaceOrder } as MsgCreatePlaceOrder
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.bytes()
          break
        case 3:
          message.sellOrderID = reader.string()
          break
        case 4:
          message.amount = reader.bytes()
          break
        case 5:
          message.price = reader.bytes()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgCreatePlaceOrder {
    const message = { ...baseMsgCreatePlaceOrder } as MsgCreatePlaceOrder
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = bytesFromBase64(object.creator)
    }
    if (object.sellOrderID !== undefined && object.sellOrderID !== null) {
      message.sellOrderID = String(object.sellOrderID)
    } else {
      message.sellOrderID = ''
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = bytesFromBase64(object.amount)
    }
    if (object.price !== undefined && object.price !== null) {
      message.price = bytesFromBase64(object.price)
    }
    return message
  },

  toJSON(message: MsgCreatePlaceOrder): unknown {
    const obj: any = {}
    message.creator !== undefined && (obj.creator = base64FromBytes(message.creator !== undefined ? message.creator : new Uint8Array()))
    message.sellOrderID !== undefined && (obj.sellOrderID = message.sellOrderID)
    message.amount !== undefined && (obj.amount = base64FromBytes(message.amount !== undefined ? message.amount : new Uint8Array()))
    message.price !== undefined && (obj.price = base64FromBytes(message.price !== undefined ? message.price : new Uint8Array()))
    return obj
  },

  fromPartial(object: DeepPartial<MsgCreatePlaceOrder>): MsgCreatePlaceOrder {
    const message = { ...baseMsgCreatePlaceOrder } as MsgCreatePlaceOrder
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = new Uint8Array()
    }
    if (object.sellOrderID !== undefined && object.sellOrderID !== null) {
      message.sellOrderID = object.sellOrderID
    } else {
      message.sellOrderID = ''
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount
    } else {
      message.amount = new Uint8Array()
    }
    if (object.price !== undefined && object.price !== null) {
      message.price = object.price
    } else {
      message.price = new Uint8Array()
    }
    return message
  }
}

const baseMsgCreatePlaceOrderResponse: object = { placeOrderID: '' }

export const MsgCreatePlaceOrderResponse = {
  encode(message: MsgCreatePlaceOrderResponse, writer: Writer = Writer.create()): Writer {
    if (message.placeOrderID !== '') {
      writer.uint32(10).string(message.placeOrderID)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreatePlaceOrderResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgCreatePlaceOrderResponse } as MsgCreatePlaceOrderResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.placeOrderID = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgCreatePlaceOrderResponse {
    const message = { ...baseMsgCreatePlaceOrderResponse } as MsgCreatePlaceOrderResponse
    if (object.placeOrderID !== undefined && object.placeOrderID !== null) {
      message.placeOrderID = String(object.placeOrderID)
    } else {
      message.placeOrderID = ''
    }
    return message
  },

  toJSON(message: MsgCreatePlaceOrderResponse): unknown {
    const obj: any = {}
    message.placeOrderID !== undefined && (obj.placeOrderID = message.placeOrderID)
    return obj
  },

  fromPartial(object: DeepPartial<MsgCreatePlaceOrderResponse>): MsgCreatePlaceOrderResponse {
    const message = { ...baseMsgCreatePlaceOrderResponse } as MsgCreatePlaceOrderResponse
    if (object.placeOrderID !== undefined && object.placeOrderID !== null) {
      message.placeOrderID = object.placeOrderID
    } else {
      message.placeOrderID = ''
    }
    return message
  }
}

const baseMsgCreateSellOrder: object = { sellInvoiceID: '' }

export const MsgCreateSellOrder = {
  encode(message: MsgCreateSellOrder, writer: Writer = Writer.create()): Writer {
    if (message.creator.length !== 0) {
      writer.uint32(10).bytes(message.creator)
    }
    if (message.sellInvoiceID !== '') {
      writer.uint32(18).string(message.sellInvoiceID)
    }
    if (message.amount.length !== 0) {
      writer.uint32(26).bytes(message.amount)
    }
    if (message.sellDuration !== undefined) {
      Duration.encode(message.sellDuration, writer.uint32(34).fork()).ldelim()
    }
    if (message.price.length !== 0) {
      writer.uint32(42).bytes(message.price)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateSellOrder {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgCreateSellOrder } as MsgCreateSellOrder
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.bytes()
          break
        case 2:
          message.sellInvoiceID = reader.string()
          break
        case 3:
          message.amount = reader.bytes()
          break
        case 4:
          message.sellDuration = Duration.decode(reader, reader.uint32())
          break
        case 5:
          message.price = reader.bytes()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgCreateSellOrder {
    const message = { ...baseMsgCreateSellOrder } as MsgCreateSellOrder
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = bytesFromBase64(object.creator)
    }
    if (object.sellInvoiceID !== undefined && object.sellInvoiceID !== null) {
      message.sellInvoiceID = String(object.sellInvoiceID)
    } else {
      message.sellInvoiceID = ''
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = bytesFromBase64(object.amount)
    }
    if (object.sellDuration !== undefined && object.sellDuration !== null) {
      message.sellDuration = Duration.fromJSON(object.sellDuration)
    } else {
      message.sellDuration = undefined
    }
    if (object.price !== undefined && object.price !== null) {
      message.price = bytesFromBase64(object.price)
    }
    return message
  },

  toJSON(message: MsgCreateSellOrder): unknown {
    const obj: any = {}
    message.creator !== undefined && (obj.creator = base64FromBytes(message.creator !== undefined ? message.creator : new Uint8Array()))
    message.sellInvoiceID !== undefined && (obj.sellInvoiceID = message.sellInvoiceID)
    message.amount !== undefined && (obj.amount = base64FromBytes(message.amount !== undefined ? message.amount : new Uint8Array()))
    message.sellDuration !== undefined && (obj.sellDuration = message.sellDuration ? Duration.toJSON(message.sellDuration) : undefined)
    message.price !== undefined && (obj.price = base64FromBytes(message.price !== undefined ? message.price : new Uint8Array()))
    return obj
  },

  fromPartial(object: DeepPartial<MsgCreateSellOrder>): MsgCreateSellOrder {
    const message = { ...baseMsgCreateSellOrder } as MsgCreateSellOrder
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = new Uint8Array()
    }
    if (object.sellInvoiceID !== undefined && object.sellInvoiceID !== null) {
      message.sellInvoiceID = object.sellInvoiceID
    } else {
      message.sellInvoiceID = ''
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount
    } else {
      message.amount = new Uint8Array()
    }
    if (object.sellDuration !== undefined && object.sellDuration !== null) {
      message.sellDuration = Duration.fromPartial(object.sellDuration)
    } else {
      message.sellDuration = undefined
    }
    if (object.price !== undefined && object.price !== null) {
      message.price = object.price
    } else {
      message.price = new Uint8Array()
    }
    return message
  }
}

const baseMsgCreateSellOrderResponse: object = { orderID: '' }

export const MsgCreateSellOrderResponse = {
  encode(message: MsgCreateSellOrderResponse, writer: Writer = Writer.create()): Writer {
    if (message.orderID !== '') {
      writer.uint32(10).string(message.orderID)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateSellOrderResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgCreateSellOrderResponse } as MsgCreateSellOrderResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.orderID = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgCreateSellOrderResponse {
    const message = { ...baseMsgCreateSellOrderResponse } as MsgCreateSellOrderResponse
    if (object.orderID !== undefined && object.orderID !== null) {
      message.orderID = String(object.orderID)
    } else {
      message.orderID = ''
    }
    return message
  },

  toJSON(message: MsgCreateSellOrderResponse): unknown {
    const obj: any = {}
    message.orderID !== undefined && (obj.orderID = message.orderID)
    return obj
  },

  fromPartial(object: DeepPartial<MsgCreateSellOrderResponse>): MsgCreateSellOrderResponse {
    const message = { ...baseMsgCreateSellOrderResponse } as MsgCreateSellOrderResponse
    if (object.orderID !== undefined && object.orderID !== null) {
      message.orderID = object.orderID
    } else {
      message.orderID = ''
    }
    return message
  }
}

const baseMsgDeleteSellOrder: object = { sellOrderID: '' }

export const MsgDeleteSellOrder = {
  encode(message: MsgDeleteSellOrder, writer: Writer = Writer.create()): Writer {
    if (message.creator.length !== 0) {
      writer.uint32(10).bytes(message.creator)
    }
    if (message.sellOrderID !== '') {
      writer.uint32(18).string(message.sellOrderID)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteSellOrder {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgDeleteSellOrder } as MsgDeleteSellOrder
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.bytes()
          break
        case 2:
          message.sellOrderID = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgDeleteSellOrder {
    const message = { ...baseMsgDeleteSellOrder } as MsgDeleteSellOrder
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = bytesFromBase64(object.creator)
    }
    if (object.sellOrderID !== undefined && object.sellOrderID !== null) {
      message.sellOrderID = String(object.sellOrderID)
    } else {
      message.sellOrderID = ''
    }
    return message
  },

  toJSON(message: MsgDeleteSellOrder): unknown {
    const obj: any = {}
    message.creator !== undefined && (obj.creator = base64FromBytes(message.creator !== undefined ? message.creator : new Uint8Array()))
    message.sellOrderID !== undefined && (obj.sellOrderID = message.sellOrderID)
    return obj
  },

  fromPartial(object: DeepPartial<MsgDeleteSellOrder>): MsgDeleteSellOrder {
    const message = { ...baseMsgDeleteSellOrder } as MsgDeleteSellOrder
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = new Uint8Array()
    }
    if (object.sellOrderID !== undefined && object.sellOrderID !== null) {
      message.sellOrderID = object.sellOrderID
    } else {
      message.sellOrderID = ''
    }
    return message
  }
}

const baseMsgDeleteSellOrderResponse: object = {}

export const MsgDeleteSellOrderResponse = {
  encode(_: MsgDeleteSellOrderResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteSellOrderResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgDeleteSellOrderResponse } as MsgDeleteSellOrderResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(_: any): MsgDeleteSellOrderResponse {
    const message = { ...baseMsgDeleteSellOrderResponse } as MsgDeleteSellOrderResponse
    return message
  },

  toJSON(_: MsgDeleteSellOrderResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgDeleteSellOrderResponse>): MsgDeleteSellOrderResponse {
    const message = { ...baseMsgDeleteSellOrderResponse } as MsgDeleteSellOrderResponse
    return message
  }
}

const baseMsgCreateInvoice: object = { creator: '', origOwner: '', name: '', url: '', amount: '', apy: '', isRootOwner: false }

export const MsgCreateInvoice = {
  encode(message: MsgCreateInvoice, writer: Writer = Writer.create()): Writer {
    if (message.creator !== '') {
      writer.uint32(10).string(message.creator)
    }
    if (message.origOwner !== '') {
      writer.uint32(18).string(message.origOwner)
    }
    if (message.name !== '') {
      writer.uint32(26).string(message.name)
    }
    if (message.url !== '') {
      writer.uint32(34).string(message.url)
    }
    if (message.amount !== '') {
      writer.uint32(42).string(message.amount)
    }
    if (message.apy !== '') {
      writer.uint32(50).string(message.apy)
    }
    if (message.isRootOwner === true) {
      writer.uint32(56).bool(message.isRootOwner)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateInvoice {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgCreateInvoice } as MsgCreateInvoice
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string()
          break
        case 2:
          message.origOwner = reader.string()
          break
        case 3:
          message.name = reader.string()
          break
        case 4:
          message.url = reader.string()
          break
        case 5:
          message.amount = reader.string()
          break
        case 6:
          message.apy = reader.string()
          break
        case 7:
          message.isRootOwner = reader.bool()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgCreateInvoice {
    const message = { ...baseMsgCreateInvoice } as MsgCreateInvoice
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    if (object.origOwner !== undefined && object.origOwner !== null) {
      message.origOwner = String(object.origOwner)
    } else {
      message.origOwner = ''
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name)
    } else {
      message.name = ''
    }
    if (object.url !== undefined && object.url !== null) {
      message.url = String(object.url)
    } else {
      message.url = ''
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = String(object.amount)
    } else {
      message.amount = ''
    }
    if (object.apy !== undefined && object.apy !== null) {
      message.apy = String(object.apy)
    } else {
      message.apy = ''
    }
    if (object.isRootOwner !== undefined && object.isRootOwner !== null) {
      message.isRootOwner = Boolean(object.isRootOwner)
    } else {
      message.isRootOwner = false
    }
    return message
  },

  toJSON(message: MsgCreateInvoice): unknown {
    const obj: any = {}
    message.creator !== undefined && (obj.creator = message.creator)
    message.origOwner !== undefined && (obj.origOwner = message.origOwner)
    message.name !== undefined && (obj.name = message.name)
    message.url !== undefined && (obj.url = message.url)
    message.amount !== undefined && (obj.amount = message.amount)
    message.apy !== undefined && (obj.apy = message.apy)
    message.isRootOwner !== undefined && (obj.isRootOwner = message.isRootOwner)
    return obj
  },

  fromPartial(object: DeepPartial<MsgCreateInvoice>): MsgCreateInvoice {
    const message = { ...baseMsgCreateInvoice } as MsgCreateInvoice
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    if (object.origOwner !== undefined && object.origOwner !== null) {
      message.origOwner = object.origOwner
    } else {
      message.origOwner = ''
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name
    } else {
      message.name = ''
    }
    if (object.url !== undefined && object.url !== null) {
      message.url = object.url
    } else {
      message.url = ''
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount
    } else {
      message.amount = ''
    }
    if (object.apy !== undefined && object.apy !== null) {
      message.apy = object.apy
    } else {
      message.apy = ''
    }
    if (object.isRootOwner !== undefined && object.isRootOwner !== null) {
      message.isRootOwner = object.isRootOwner
    } else {
      message.isRootOwner = false
    }
    return message
  }
}

const baseMsgCreateInvoiceResponse: object = { invoiceID: '' }

export const MsgCreateInvoiceResponse = {
  encode(message: MsgCreateInvoiceResponse, writer: Writer = Writer.create()): Writer {
    if (message.invoiceID !== '') {
      writer.uint32(10).string(message.invoiceID)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateInvoiceResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgCreateInvoiceResponse } as MsgCreateInvoiceResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.invoiceID = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgCreateInvoiceResponse {
    const message = { ...baseMsgCreateInvoiceResponse } as MsgCreateInvoiceResponse
    if (object.invoiceID !== undefined && object.invoiceID !== null) {
      message.invoiceID = String(object.invoiceID)
    } else {
      message.invoiceID = ''
    }
    return message
  },

  toJSON(message: MsgCreateInvoiceResponse): unknown {
    const obj: any = {}
    message.invoiceID !== undefined && (obj.invoiceID = message.invoiceID)
    return obj
  },

  fromPartial(object: DeepPartial<MsgCreateInvoiceResponse>): MsgCreateInvoiceResponse {
    const message = { ...baseMsgCreateInvoiceResponse } as MsgCreateInvoiceResponse
    if (object.invoiceID !== undefined && object.invoiceID !== null) {
      message.invoiceID = object.invoiceID
    } else {
      message.invoiceID = ''
    }
    return message
  }
}

const baseMsgDeleteInvoice: object = { creator: '', origOwner: '', name: '' }

export const MsgDeleteInvoice = {
  encode(message: MsgDeleteInvoice, writer: Writer = Writer.create()): Writer {
    if (message.creator !== '') {
      writer.uint32(10).string(message.creator)
    }
    if (message.origOwner !== '') {
      writer.uint32(18).string(message.origOwner)
    }
    if (message.name !== '') {
      writer.uint32(26).string(message.name)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteInvoice {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgDeleteInvoice } as MsgDeleteInvoice
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string()
          break
        case 2:
          message.origOwner = reader.string()
          break
        case 3:
          message.name = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgDeleteInvoice {
    const message = { ...baseMsgDeleteInvoice } as MsgDeleteInvoice
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    if (object.origOwner !== undefined && object.origOwner !== null) {
      message.origOwner = String(object.origOwner)
    } else {
      message.origOwner = ''
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name)
    } else {
      message.name = ''
    }
    return message
  },

  toJSON(message: MsgDeleteInvoice): unknown {
    const obj: any = {}
    message.creator !== undefined && (obj.creator = message.creator)
    message.origOwner !== undefined && (obj.origOwner = message.origOwner)
    message.name !== undefined && (obj.name = message.name)
    return obj
  },

  fromPartial(object: DeepPartial<MsgDeleteInvoice>): MsgDeleteInvoice {
    const message = { ...baseMsgDeleteInvoice } as MsgDeleteInvoice
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    if (object.origOwner !== undefined && object.origOwner !== null) {
      message.origOwner = object.origOwner
    } else {
      message.origOwner = ''
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name
    } else {
      message.name = ''
    }
    return message
  }
}

const baseMsgDeleteInvoiceResponse: object = {}

export const MsgDeleteInvoiceResponse = {
  encode(_: MsgDeleteInvoiceResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteInvoiceResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgDeleteInvoiceResponse } as MsgDeleteInvoiceResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(_: any): MsgDeleteInvoiceResponse {
    const message = { ...baseMsgDeleteInvoiceResponse } as MsgDeleteInvoiceResponse
    return message
  },

  toJSON(_: MsgDeleteInvoiceResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgDeleteInvoiceResponse>): MsgDeleteInvoiceResponse {
    const message = { ...baseMsgDeleteInvoiceResponse } as MsgDeleteInvoiceResponse
    return message
  }
}

/** Msg defines the Msg service. */
export interface Msg {
  /** this line is used by starport scaffolding # proto/tx/rpc */
  CreatePlaceOrder(request: MsgCreatePlaceOrder): Promise<MsgCreatePlaceOrderResponse>
  CreateSellOrder(request: MsgCreateSellOrder): Promise<MsgCreateSellOrderResponse>
  DeleteSellOrder(request: MsgDeleteSellOrder): Promise<MsgDeleteSellOrderResponse>
  CreateInvoice(request: MsgCreateInvoice): Promise<MsgCreateInvoiceResponse>
  DeleteInvoice(request: MsgDeleteInvoice): Promise<MsgDeleteInvoiceResponse>
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
  }
  CreatePlaceOrder(request: MsgCreatePlaceOrder): Promise<MsgCreatePlaceOrderResponse> {
    const data = MsgCreatePlaceOrder.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.invoice.Msg', 'CreatePlaceOrder', data)
    return promise.then((data) => MsgCreatePlaceOrderResponse.decode(new Reader(data)))
  }

  CreateSellOrder(request: MsgCreateSellOrder): Promise<MsgCreateSellOrderResponse> {
    const data = MsgCreateSellOrder.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.invoice.Msg', 'CreateSellOrder', data)
    return promise.then((data) => MsgCreateSellOrderResponse.decode(new Reader(data)))
  }

  DeleteSellOrder(request: MsgDeleteSellOrder): Promise<MsgDeleteSellOrderResponse> {
    const data = MsgDeleteSellOrder.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.invoice.Msg', 'DeleteSellOrder', data)
    return promise.then((data) => MsgDeleteSellOrderResponse.decode(new Reader(data)))
  }

  CreateInvoice(request: MsgCreateInvoice): Promise<MsgCreateInvoiceResponse> {
    const data = MsgCreateInvoice.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.invoice.Msg', 'CreateInvoice', data)
    return promise.then((data) => MsgCreateInvoiceResponse.decode(new Reader(data)))
  }

  DeleteInvoice(request: MsgDeleteInvoice): Promise<MsgDeleteInvoiceResponse> {
    const data = MsgDeleteInvoice.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.invoice.Msg', 'DeleteInvoice', data)
    return promise.then((data) => MsgDeleteInvoiceResponse.decode(new Reader(data)))
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>
}

declare var self: any | undefined
declare var window: any | undefined
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis
  if (typeof self !== 'undefined') return self
  if (typeof window !== 'undefined') return window
  if (typeof global !== 'undefined') return global
  throw 'Unable to locate global object'
})()

const atob: (b64: string) => string = globalThis.atob || ((b64) => globalThis.Buffer.from(b64, 'base64').toString('binary'))
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64)
  const arr = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i)
  }
  return arr
}

const btoa: (bin: string) => string = globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, 'binary').toString('base64'))
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = []
  for (let i = 0; i < arr.byteLength; ++i) {
    bin.push(String.fromCharCode(arr[i]))
  }
  return btoa(bin.join(''))
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
