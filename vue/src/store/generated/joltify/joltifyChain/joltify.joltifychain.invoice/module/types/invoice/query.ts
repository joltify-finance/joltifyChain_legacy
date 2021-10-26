/* eslint-disable */
import { Reader, Writer } from 'protobufjs/minimal'
import { PlaceOrder } from '../invoice/place_order'
import { PageRequest, PageResponse } from '../cosmos/base/query/v1beta1/pagination'
import { SellOrder } from '../invoice/sell_order'
import { Invoice } from '../invoice/invoice'

export const protobufPackage = 'joltify.joltifychain.invoice'

/** this line is used by starport scaffolding # 3 */
export interface QueryGetPlaceOrderRequest {
  index: string
}

export interface QueryGetPlaceOrderResponse {
  PlaceOrder: PlaceOrder | undefined
}

export interface QueryAllPlaceOrderRequest {
  pagination: PageRequest | undefined
}

export interface QueryAllPlaceOrderResponse {
  PlaceOrder: PlaceOrder[]
  pagination: PageResponse | undefined
}

export interface QueryGetSellOrderRequest {
  index: string
}

export interface QueryGetSellOrderResponse {
  SellOrder: SellOrder | undefined
}

export interface QueryAllSellOrderRequest {
  pagination: PageRequest | undefined
}

export interface QueryAllSellOrderResponse {
  SellOrder: SellOrder[]
  pagination: PageResponse | undefined
}

export interface QueryGetInvoiceRequest {
  index: string
}

export interface QueryGetInvoiceResponse {
  Invoice: Invoice | undefined
}

export interface QueryAllInvoiceRequest {
  pagination: PageRequest | undefined
}

export interface QueryAllInvoiceResponse {
  Invoice: Invoice[]
  pagination: PageResponse | undefined
}

const baseQueryGetPlaceOrderRequest: object = { index: '' }

export const QueryGetPlaceOrderRequest = {
  encode(message: QueryGetPlaceOrderRequest, writer: Writer = Writer.create()): Writer {
    if (message.index !== '') {
      writer.uint32(10).string(message.index)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetPlaceOrderRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryGetPlaceOrderRequest } as QueryGetPlaceOrderRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryGetPlaceOrderRequest {
    const message = { ...baseQueryGetPlaceOrderRequest } as QueryGetPlaceOrderRequest
    if (object.index !== undefined && object.index !== null) {
      message.index = String(object.index)
    } else {
      message.index = ''
    }
    return message
  },

  toJSON(message: QueryGetPlaceOrderRequest): unknown {
    const obj: any = {}
    message.index !== undefined && (obj.index = message.index)
    return obj
  },

  fromPartial(object: DeepPartial<QueryGetPlaceOrderRequest>): QueryGetPlaceOrderRequest {
    const message = { ...baseQueryGetPlaceOrderRequest } as QueryGetPlaceOrderRequest
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index
    } else {
      message.index = ''
    }
    return message
  }
}

const baseQueryGetPlaceOrderResponse: object = {}

export const QueryGetPlaceOrderResponse = {
  encode(message: QueryGetPlaceOrderResponse, writer: Writer = Writer.create()): Writer {
    if (message.PlaceOrder !== undefined) {
      PlaceOrder.encode(message.PlaceOrder, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetPlaceOrderResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryGetPlaceOrderResponse } as QueryGetPlaceOrderResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.PlaceOrder = PlaceOrder.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryGetPlaceOrderResponse {
    const message = { ...baseQueryGetPlaceOrderResponse } as QueryGetPlaceOrderResponse
    if (object.PlaceOrder !== undefined && object.PlaceOrder !== null) {
      message.PlaceOrder = PlaceOrder.fromJSON(object.PlaceOrder)
    } else {
      message.PlaceOrder = undefined
    }
    return message
  },

  toJSON(message: QueryGetPlaceOrderResponse): unknown {
    const obj: any = {}
    message.PlaceOrder !== undefined && (obj.PlaceOrder = message.PlaceOrder ? PlaceOrder.toJSON(message.PlaceOrder) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryGetPlaceOrderResponse>): QueryGetPlaceOrderResponse {
    const message = { ...baseQueryGetPlaceOrderResponse } as QueryGetPlaceOrderResponse
    if (object.PlaceOrder !== undefined && object.PlaceOrder !== null) {
      message.PlaceOrder = PlaceOrder.fromPartial(object.PlaceOrder)
    } else {
      message.PlaceOrder = undefined
    }
    return message
  }
}

const baseQueryAllPlaceOrderRequest: object = {}

export const QueryAllPlaceOrderRequest = {
  encode(message: QueryAllPlaceOrderRequest, writer: Writer = Writer.create()): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllPlaceOrderRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryAllPlaceOrderRequest } as QueryAllPlaceOrderRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryAllPlaceOrderRequest {
    const message = { ...baseQueryAllPlaceOrderRequest } as QueryAllPlaceOrderRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryAllPlaceOrderRequest): unknown {
    const obj: any = {}
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryAllPlaceOrderRequest>): QueryAllPlaceOrderRequest {
    const message = { ...baseQueryAllPlaceOrderRequest } as QueryAllPlaceOrderRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

const baseQueryAllPlaceOrderResponse: object = {}

export const QueryAllPlaceOrderResponse = {
  encode(message: QueryAllPlaceOrderResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.PlaceOrder) {
      PlaceOrder.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllPlaceOrderResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryAllPlaceOrderResponse } as QueryAllPlaceOrderResponse
    message.PlaceOrder = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.PlaceOrder.push(PlaceOrder.decode(reader, reader.uint32()))
          break
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryAllPlaceOrderResponse {
    const message = { ...baseQueryAllPlaceOrderResponse } as QueryAllPlaceOrderResponse
    message.PlaceOrder = []
    if (object.PlaceOrder !== undefined && object.PlaceOrder !== null) {
      for (const e of object.PlaceOrder) {
        message.PlaceOrder.push(PlaceOrder.fromJSON(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryAllPlaceOrderResponse): unknown {
    const obj: any = {}
    if (message.PlaceOrder) {
      obj.PlaceOrder = message.PlaceOrder.map((e) => (e ? PlaceOrder.toJSON(e) : undefined))
    } else {
      obj.PlaceOrder = []
    }
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryAllPlaceOrderResponse>): QueryAllPlaceOrderResponse {
    const message = { ...baseQueryAllPlaceOrderResponse } as QueryAllPlaceOrderResponse
    message.PlaceOrder = []
    if (object.PlaceOrder !== undefined && object.PlaceOrder !== null) {
      for (const e of object.PlaceOrder) {
        message.PlaceOrder.push(PlaceOrder.fromPartial(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

const baseQueryGetSellOrderRequest: object = { index: '' }

export const QueryGetSellOrderRequest = {
  encode(message: QueryGetSellOrderRequest, writer: Writer = Writer.create()): Writer {
    if (message.index !== '') {
      writer.uint32(10).string(message.index)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetSellOrderRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryGetSellOrderRequest } as QueryGetSellOrderRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryGetSellOrderRequest {
    const message = { ...baseQueryGetSellOrderRequest } as QueryGetSellOrderRequest
    if (object.index !== undefined && object.index !== null) {
      message.index = String(object.index)
    } else {
      message.index = ''
    }
    return message
  },

  toJSON(message: QueryGetSellOrderRequest): unknown {
    const obj: any = {}
    message.index !== undefined && (obj.index = message.index)
    return obj
  },

  fromPartial(object: DeepPartial<QueryGetSellOrderRequest>): QueryGetSellOrderRequest {
    const message = { ...baseQueryGetSellOrderRequest } as QueryGetSellOrderRequest
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index
    } else {
      message.index = ''
    }
    return message
  }
}

const baseQueryGetSellOrderResponse: object = {}

export const QueryGetSellOrderResponse = {
  encode(message: QueryGetSellOrderResponse, writer: Writer = Writer.create()): Writer {
    if (message.SellOrder !== undefined) {
      SellOrder.encode(message.SellOrder, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetSellOrderResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryGetSellOrderResponse } as QueryGetSellOrderResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.SellOrder = SellOrder.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryGetSellOrderResponse {
    const message = { ...baseQueryGetSellOrderResponse } as QueryGetSellOrderResponse
    if (object.SellOrder !== undefined && object.SellOrder !== null) {
      message.SellOrder = SellOrder.fromJSON(object.SellOrder)
    } else {
      message.SellOrder = undefined
    }
    return message
  },

  toJSON(message: QueryGetSellOrderResponse): unknown {
    const obj: any = {}
    message.SellOrder !== undefined && (obj.SellOrder = message.SellOrder ? SellOrder.toJSON(message.SellOrder) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryGetSellOrderResponse>): QueryGetSellOrderResponse {
    const message = { ...baseQueryGetSellOrderResponse } as QueryGetSellOrderResponse
    if (object.SellOrder !== undefined && object.SellOrder !== null) {
      message.SellOrder = SellOrder.fromPartial(object.SellOrder)
    } else {
      message.SellOrder = undefined
    }
    return message
  }
}

const baseQueryAllSellOrderRequest: object = {}

export const QueryAllSellOrderRequest = {
  encode(message: QueryAllSellOrderRequest, writer: Writer = Writer.create()): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllSellOrderRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryAllSellOrderRequest } as QueryAllSellOrderRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryAllSellOrderRequest {
    const message = { ...baseQueryAllSellOrderRequest } as QueryAllSellOrderRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryAllSellOrderRequest): unknown {
    const obj: any = {}
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryAllSellOrderRequest>): QueryAllSellOrderRequest {
    const message = { ...baseQueryAllSellOrderRequest } as QueryAllSellOrderRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

const baseQueryAllSellOrderResponse: object = {}

export const QueryAllSellOrderResponse = {
  encode(message: QueryAllSellOrderResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.SellOrder) {
      SellOrder.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllSellOrderResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryAllSellOrderResponse } as QueryAllSellOrderResponse
    message.SellOrder = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.SellOrder.push(SellOrder.decode(reader, reader.uint32()))
          break
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryAllSellOrderResponse {
    const message = { ...baseQueryAllSellOrderResponse } as QueryAllSellOrderResponse
    message.SellOrder = []
    if (object.SellOrder !== undefined && object.SellOrder !== null) {
      for (const e of object.SellOrder) {
        message.SellOrder.push(SellOrder.fromJSON(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryAllSellOrderResponse): unknown {
    const obj: any = {}
    if (message.SellOrder) {
      obj.SellOrder = message.SellOrder.map((e) => (e ? SellOrder.toJSON(e) : undefined))
    } else {
      obj.SellOrder = []
    }
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryAllSellOrderResponse>): QueryAllSellOrderResponse {
    const message = { ...baseQueryAllSellOrderResponse } as QueryAllSellOrderResponse
    message.SellOrder = []
    if (object.SellOrder !== undefined && object.SellOrder !== null) {
      for (const e of object.SellOrder) {
        message.SellOrder.push(SellOrder.fromPartial(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

const baseQueryGetInvoiceRequest: object = { index: '' }

export const QueryGetInvoiceRequest = {
  encode(message: QueryGetInvoiceRequest, writer: Writer = Writer.create()): Writer {
    if (message.index !== '') {
      writer.uint32(10).string(message.index)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetInvoiceRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryGetInvoiceRequest } as QueryGetInvoiceRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryGetInvoiceRequest {
    const message = { ...baseQueryGetInvoiceRequest } as QueryGetInvoiceRequest
    if (object.index !== undefined && object.index !== null) {
      message.index = String(object.index)
    } else {
      message.index = ''
    }
    return message
  },

  toJSON(message: QueryGetInvoiceRequest): unknown {
    const obj: any = {}
    message.index !== undefined && (obj.index = message.index)
    return obj
  },

  fromPartial(object: DeepPartial<QueryGetInvoiceRequest>): QueryGetInvoiceRequest {
    const message = { ...baseQueryGetInvoiceRequest } as QueryGetInvoiceRequest
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index
    } else {
      message.index = ''
    }
    return message
  }
}

const baseQueryGetInvoiceResponse: object = {}

export const QueryGetInvoiceResponse = {
  encode(message: QueryGetInvoiceResponse, writer: Writer = Writer.create()): Writer {
    if (message.Invoice !== undefined) {
      Invoice.encode(message.Invoice, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetInvoiceResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryGetInvoiceResponse } as QueryGetInvoiceResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.Invoice = Invoice.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryGetInvoiceResponse {
    const message = { ...baseQueryGetInvoiceResponse } as QueryGetInvoiceResponse
    if (object.Invoice !== undefined && object.Invoice !== null) {
      message.Invoice = Invoice.fromJSON(object.Invoice)
    } else {
      message.Invoice = undefined
    }
    return message
  },

  toJSON(message: QueryGetInvoiceResponse): unknown {
    const obj: any = {}
    message.Invoice !== undefined && (obj.Invoice = message.Invoice ? Invoice.toJSON(message.Invoice) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryGetInvoiceResponse>): QueryGetInvoiceResponse {
    const message = { ...baseQueryGetInvoiceResponse } as QueryGetInvoiceResponse
    if (object.Invoice !== undefined && object.Invoice !== null) {
      message.Invoice = Invoice.fromPartial(object.Invoice)
    } else {
      message.Invoice = undefined
    }
    return message
  }
}

const baseQueryAllInvoiceRequest: object = {}

export const QueryAllInvoiceRequest = {
  encode(message: QueryAllInvoiceRequest, writer: Writer = Writer.create()): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllInvoiceRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryAllInvoiceRequest } as QueryAllInvoiceRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryAllInvoiceRequest {
    const message = { ...baseQueryAllInvoiceRequest } as QueryAllInvoiceRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryAllInvoiceRequest): unknown {
    const obj: any = {}
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryAllInvoiceRequest>): QueryAllInvoiceRequest {
    const message = { ...baseQueryAllInvoiceRequest } as QueryAllInvoiceRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

const baseQueryAllInvoiceResponse: object = {}

export const QueryAllInvoiceResponse = {
  encode(message: QueryAllInvoiceResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.Invoice) {
      Invoice.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllInvoiceResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryAllInvoiceResponse } as QueryAllInvoiceResponse
    message.Invoice = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.Invoice.push(Invoice.decode(reader, reader.uint32()))
          break
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryAllInvoiceResponse {
    const message = { ...baseQueryAllInvoiceResponse } as QueryAllInvoiceResponse
    message.Invoice = []
    if (object.Invoice !== undefined && object.Invoice !== null) {
      for (const e of object.Invoice) {
        message.Invoice.push(Invoice.fromJSON(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryAllInvoiceResponse): unknown {
    const obj: any = {}
    if (message.Invoice) {
      obj.Invoice = message.Invoice.map((e) => (e ? Invoice.toJSON(e) : undefined))
    } else {
      obj.Invoice = []
    }
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryAllInvoiceResponse>): QueryAllInvoiceResponse {
    const message = { ...baseQueryAllInvoiceResponse } as QueryAllInvoiceResponse
    message.Invoice = []
    if (object.Invoice !== undefined && object.Invoice !== null) {
      for (const e of object.Invoice) {
        message.Invoice.push(Invoice.fromPartial(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

/** Query defines the gRPC querier service. */
export interface Query {
  /** Queries a placeOrder by index. */
  PlaceOrder(request: QueryGetPlaceOrderRequest): Promise<QueryGetPlaceOrderResponse>
  /** Queries a list of placeOrder items. */
  PlaceOrderAll(request: QueryAllPlaceOrderRequest): Promise<QueryAllPlaceOrderResponse>
  /** Queries a sellOrder by index. */
  SellOrder(request: QueryGetSellOrderRequest): Promise<QueryGetSellOrderResponse>
  /** Queries a list of sellOrder items. */
  SellOrderAll(request: QueryAllSellOrderRequest): Promise<QueryAllSellOrderResponse>
  /** Queries a invoice by index. */
  Invoice(request: QueryGetInvoiceRequest): Promise<QueryGetInvoiceResponse>
  /** Queries a list of invoice items. */
  InvoiceAll(request: QueryAllInvoiceRequest): Promise<QueryAllInvoiceResponse>
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
  }
  PlaceOrder(request: QueryGetPlaceOrderRequest): Promise<QueryGetPlaceOrderResponse> {
    const data = QueryGetPlaceOrderRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.invoice.Query', 'PlaceOrder', data)
    return promise.then((data) => QueryGetPlaceOrderResponse.decode(new Reader(data)))
  }

  PlaceOrderAll(request: QueryAllPlaceOrderRequest): Promise<QueryAllPlaceOrderResponse> {
    const data = QueryAllPlaceOrderRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.invoice.Query', 'PlaceOrderAll', data)
    return promise.then((data) => QueryAllPlaceOrderResponse.decode(new Reader(data)))
  }

  SellOrder(request: QueryGetSellOrderRequest): Promise<QueryGetSellOrderResponse> {
    const data = QueryGetSellOrderRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.invoice.Query', 'SellOrder', data)
    return promise.then((data) => QueryGetSellOrderResponse.decode(new Reader(data)))
  }

  SellOrderAll(request: QueryAllSellOrderRequest): Promise<QueryAllSellOrderResponse> {
    const data = QueryAllSellOrderRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.invoice.Query', 'SellOrderAll', data)
    return promise.then((data) => QueryAllSellOrderResponse.decode(new Reader(data)))
  }

  Invoice(request: QueryGetInvoiceRequest): Promise<QueryGetInvoiceResponse> {
    const data = QueryGetInvoiceRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.invoice.Query', 'Invoice', data)
    return promise.then((data) => QueryGetInvoiceResponse.decode(new Reader(data)))
  }

  InvoiceAll(request: QueryAllInvoiceRequest): Promise<QueryAllInvoiceResponse> {
    const data = QueryAllInvoiceRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.invoice.Query', 'InvoiceAll', data)
    return promise.then((data) => QueryAllInvoiceResponse.decode(new Reader(data)))
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>
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
