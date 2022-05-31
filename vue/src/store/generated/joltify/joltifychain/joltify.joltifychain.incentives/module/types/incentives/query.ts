/* eslint-disable */
import { Reader, util, configure, Writer } from 'protobufjs/minimal'
import * as Long from 'long'
import { Coin } from '../cosmos/base/v1beta1/coin'
import { Gauge } from '../incentives/gauge'
import { PageRequest, PageResponse } from '../cosmos/base/query/v1beta1/pagination'
import { Duration } from '../google/protobuf/duration'

export const protobufPackage = 'joltify.joltifychain.incentives'

export interface ModuleToDistributeCoinsRequest {}

export interface ModuleToDistributeCoinsResponse {
  coins: Coin[]
}

export interface ModuleDistributedCoinsRequest {}

export interface ModuleDistributedCoinsResponse {
  coins: Coin[]
}

export interface GaugeByIDRequest {
  id: number
}

export interface GaugeByIDResponse {
  gauge: Gauge | undefined
}

export interface GaugesRequest {
  /** pagination defines an pagination for the request. */
  pagination: PageRequest | undefined
}

export interface GaugesResponse {
  data: Gauge[]
  /** pagination defines an pagination for the response. */
  pagination: PageResponse | undefined
}

export interface ActiveGaugesRequest {
  /** pagination defines an pagination for the request. */
  pagination: PageRequest | undefined
}

export interface ActiveGaugesResponse {
  data: Gauge[]
  /** pagination defines an pagination for the response. */
  pagination: PageResponse | undefined
}

export interface ActiveGaugesPerDenomRequest {
  denom: string
  /** pagination defines an pagination for the request. */
  pagination: PageRequest | undefined
}

export interface ActiveGaugesPerDenomResponse {
  data: Gauge[]
  /** pagination defines an pagination for the response. */
  pagination: PageResponse | undefined
}

export interface UpcomingGaugesRequest {
  /** pagination defines an pagination for the request. */
  pagination: PageRequest | undefined
}

export interface UpcomingGaugesResponse {
  data: Gauge[]
  /** pagination defines an pagination for the response. */
  pagination: PageResponse | undefined
}

export interface UpcomingGaugesPerDenomRequest {
  denom: string
  pagination: PageRequest | undefined
}

export interface UpcomingGaugesPerDenomResponse {
  upcoming_gauges: Gauge[]
  pagination: PageResponse | undefined
}

export interface RewardsEstRequest {
  owner: string
  lock_ids: number[]
  end_epoch: number
}

export interface RewardsEstResponse {
  coins: Coin[]
}

export interface QueryLockableDurationsRequest {}

export interface QueryLockableDurationsResponse {
  lockable_durations: Duration[]
}

const baseModuleToDistributeCoinsRequest: object = {}

export const ModuleToDistributeCoinsRequest = {
  encode(_: ModuleToDistributeCoinsRequest, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): ModuleToDistributeCoinsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseModuleToDistributeCoinsRequest } as ModuleToDistributeCoinsRequest
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

  fromJSON(_: any): ModuleToDistributeCoinsRequest {
    const message = { ...baseModuleToDistributeCoinsRequest } as ModuleToDistributeCoinsRequest
    return message
  },

  toJSON(_: ModuleToDistributeCoinsRequest): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<ModuleToDistributeCoinsRequest>): ModuleToDistributeCoinsRequest {
    const message = { ...baseModuleToDistributeCoinsRequest } as ModuleToDistributeCoinsRequest
    return message
  }
}

const baseModuleToDistributeCoinsResponse: object = {}

export const ModuleToDistributeCoinsResponse = {
  encode(message: ModuleToDistributeCoinsResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): ModuleToDistributeCoinsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseModuleToDistributeCoinsResponse } as ModuleToDistributeCoinsResponse
    message.coins = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.coins.push(Coin.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): ModuleToDistributeCoinsResponse {
    const message = { ...baseModuleToDistributeCoinsResponse } as ModuleToDistributeCoinsResponse
    message.coins = []
    if (object.coins !== undefined && object.coins !== null) {
      for (const e of object.coins) {
        message.coins.push(Coin.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: ModuleToDistributeCoinsResponse): unknown {
    const obj: any = {}
    if (message.coins) {
      obj.coins = message.coins.map((e) => (e ? Coin.toJSON(e) : undefined))
    } else {
      obj.coins = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<ModuleToDistributeCoinsResponse>): ModuleToDistributeCoinsResponse {
    const message = { ...baseModuleToDistributeCoinsResponse } as ModuleToDistributeCoinsResponse
    message.coins = []
    if (object.coins !== undefined && object.coins !== null) {
      for (const e of object.coins) {
        message.coins.push(Coin.fromPartial(e))
      }
    }
    return message
  }
}

const baseModuleDistributedCoinsRequest: object = {}

export const ModuleDistributedCoinsRequest = {
  encode(_: ModuleDistributedCoinsRequest, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): ModuleDistributedCoinsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseModuleDistributedCoinsRequest } as ModuleDistributedCoinsRequest
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

  fromJSON(_: any): ModuleDistributedCoinsRequest {
    const message = { ...baseModuleDistributedCoinsRequest } as ModuleDistributedCoinsRequest
    return message
  },

  toJSON(_: ModuleDistributedCoinsRequest): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<ModuleDistributedCoinsRequest>): ModuleDistributedCoinsRequest {
    const message = { ...baseModuleDistributedCoinsRequest } as ModuleDistributedCoinsRequest
    return message
  }
}

const baseModuleDistributedCoinsResponse: object = {}

export const ModuleDistributedCoinsResponse = {
  encode(message: ModuleDistributedCoinsResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): ModuleDistributedCoinsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseModuleDistributedCoinsResponse } as ModuleDistributedCoinsResponse
    message.coins = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.coins.push(Coin.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): ModuleDistributedCoinsResponse {
    const message = { ...baseModuleDistributedCoinsResponse } as ModuleDistributedCoinsResponse
    message.coins = []
    if (object.coins !== undefined && object.coins !== null) {
      for (const e of object.coins) {
        message.coins.push(Coin.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: ModuleDistributedCoinsResponse): unknown {
    const obj: any = {}
    if (message.coins) {
      obj.coins = message.coins.map((e) => (e ? Coin.toJSON(e) : undefined))
    } else {
      obj.coins = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<ModuleDistributedCoinsResponse>): ModuleDistributedCoinsResponse {
    const message = { ...baseModuleDistributedCoinsResponse } as ModuleDistributedCoinsResponse
    message.coins = []
    if (object.coins !== undefined && object.coins !== null) {
      for (const e of object.coins) {
        message.coins.push(Coin.fromPartial(e))
      }
    }
    return message
  }
}

const baseGaugeByIDRequest: object = { id: 0 }

export const GaugeByIDRequest = {
  encode(message: GaugeByIDRequest, writer: Writer = Writer.create()): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): GaugeByIDRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseGaugeByIDRequest } as GaugeByIDRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): GaugeByIDRequest {
    const message = { ...baseGaugeByIDRequest } as GaugeByIDRequest
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id)
    } else {
      message.id = 0
    }
    return message
  },

  toJSON(message: GaugeByIDRequest): unknown {
    const obj: any = {}
    message.id !== undefined && (obj.id = message.id)
    return obj
  },

  fromPartial(object: DeepPartial<GaugeByIDRequest>): GaugeByIDRequest {
    const message = { ...baseGaugeByIDRequest } as GaugeByIDRequest
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id
    } else {
      message.id = 0
    }
    return message
  }
}

const baseGaugeByIDResponse: object = {}

export const GaugeByIDResponse = {
  encode(message: GaugeByIDResponse, writer: Writer = Writer.create()): Writer {
    if (message.gauge !== undefined) {
      Gauge.encode(message.gauge, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): GaugeByIDResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseGaugeByIDResponse } as GaugeByIDResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.gauge = Gauge.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): GaugeByIDResponse {
    const message = { ...baseGaugeByIDResponse } as GaugeByIDResponse
    if (object.gauge !== undefined && object.gauge !== null) {
      message.gauge = Gauge.fromJSON(object.gauge)
    } else {
      message.gauge = undefined
    }
    return message
  },

  toJSON(message: GaugeByIDResponse): unknown {
    const obj: any = {}
    message.gauge !== undefined && (obj.gauge = message.gauge ? Gauge.toJSON(message.gauge) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<GaugeByIDResponse>): GaugeByIDResponse {
    const message = { ...baseGaugeByIDResponse } as GaugeByIDResponse
    if (object.gauge !== undefined && object.gauge !== null) {
      message.gauge = Gauge.fromPartial(object.gauge)
    } else {
      message.gauge = undefined
    }
    return message
  }
}

const baseGaugesRequest: object = {}

export const GaugesRequest = {
  encode(message: GaugesRequest, writer: Writer = Writer.create()): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): GaugesRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseGaugesRequest } as GaugesRequest
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

  fromJSON(object: any): GaugesRequest {
    const message = { ...baseGaugesRequest } as GaugesRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: GaugesRequest): unknown {
    const obj: any = {}
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<GaugesRequest>): GaugesRequest {
    const message = { ...baseGaugesRequest } as GaugesRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

const baseGaugesResponse: object = {}

export const GaugesResponse = {
  encode(message: GaugesResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.data) {
      Gauge.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): GaugesResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseGaugesResponse } as GaugesResponse
    message.data = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.data.push(Gauge.decode(reader, reader.uint32()))
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

  fromJSON(object: any): GaugesResponse {
    const message = { ...baseGaugesResponse } as GaugesResponse
    message.data = []
    if (object.data !== undefined && object.data !== null) {
      for (const e of object.data) {
        message.data.push(Gauge.fromJSON(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: GaugesResponse): unknown {
    const obj: any = {}
    if (message.data) {
      obj.data = message.data.map((e) => (e ? Gauge.toJSON(e) : undefined))
    } else {
      obj.data = []
    }
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<GaugesResponse>): GaugesResponse {
    const message = { ...baseGaugesResponse } as GaugesResponse
    message.data = []
    if (object.data !== undefined && object.data !== null) {
      for (const e of object.data) {
        message.data.push(Gauge.fromPartial(e))
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

const baseActiveGaugesRequest: object = {}

export const ActiveGaugesRequest = {
  encode(message: ActiveGaugesRequest, writer: Writer = Writer.create()): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): ActiveGaugesRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseActiveGaugesRequest } as ActiveGaugesRequest
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

  fromJSON(object: any): ActiveGaugesRequest {
    const message = { ...baseActiveGaugesRequest } as ActiveGaugesRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: ActiveGaugesRequest): unknown {
    const obj: any = {}
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<ActiveGaugesRequest>): ActiveGaugesRequest {
    const message = { ...baseActiveGaugesRequest } as ActiveGaugesRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

const baseActiveGaugesResponse: object = {}

export const ActiveGaugesResponse = {
  encode(message: ActiveGaugesResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.data) {
      Gauge.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): ActiveGaugesResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseActiveGaugesResponse } as ActiveGaugesResponse
    message.data = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.data.push(Gauge.decode(reader, reader.uint32()))
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

  fromJSON(object: any): ActiveGaugesResponse {
    const message = { ...baseActiveGaugesResponse } as ActiveGaugesResponse
    message.data = []
    if (object.data !== undefined && object.data !== null) {
      for (const e of object.data) {
        message.data.push(Gauge.fromJSON(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: ActiveGaugesResponse): unknown {
    const obj: any = {}
    if (message.data) {
      obj.data = message.data.map((e) => (e ? Gauge.toJSON(e) : undefined))
    } else {
      obj.data = []
    }
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<ActiveGaugesResponse>): ActiveGaugesResponse {
    const message = { ...baseActiveGaugesResponse } as ActiveGaugesResponse
    message.data = []
    if (object.data !== undefined && object.data !== null) {
      for (const e of object.data) {
        message.data.push(Gauge.fromPartial(e))
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

const baseActiveGaugesPerDenomRequest: object = { denom: '' }

export const ActiveGaugesPerDenomRequest = {
  encode(message: ActiveGaugesPerDenomRequest, writer: Writer = Writer.create()): Writer {
    if (message.denom !== '') {
      writer.uint32(10).string(message.denom)
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): ActiveGaugesPerDenomRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseActiveGaugesPerDenomRequest } as ActiveGaugesPerDenomRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string()
          break
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): ActiveGaugesPerDenomRequest {
    const message = { ...baseActiveGaugesPerDenomRequest } as ActiveGaugesPerDenomRequest
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = String(object.denom)
    } else {
      message.denom = ''
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: ActiveGaugesPerDenomRequest): unknown {
    const obj: any = {}
    message.denom !== undefined && (obj.denom = message.denom)
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<ActiveGaugesPerDenomRequest>): ActiveGaugesPerDenomRequest {
    const message = { ...baseActiveGaugesPerDenomRequest } as ActiveGaugesPerDenomRequest
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom
    } else {
      message.denom = ''
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

const baseActiveGaugesPerDenomResponse: object = {}

export const ActiveGaugesPerDenomResponse = {
  encode(message: ActiveGaugesPerDenomResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.data) {
      Gauge.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): ActiveGaugesPerDenomResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseActiveGaugesPerDenomResponse } as ActiveGaugesPerDenomResponse
    message.data = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.data.push(Gauge.decode(reader, reader.uint32()))
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

  fromJSON(object: any): ActiveGaugesPerDenomResponse {
    const message = { ...baseActiveGaugesPerDenomResponse } as ActiveGaugesPerDenomResponse
    message.data = []
    if (object.data !== undefined && object.data !== null) {
      for (const e of object.data) {
        message.data.push(Gauge.fromJSON(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: ActiveGaugesPerDenomResponse): unknown {
    const obj: any = {}
    if (message.data) {
      obj.data = message.data.map((e) => (e ? Gauge.toJSON(e) : undefined))
    } else {
      obj.data = []
    }
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<ActiveGaugesPerDenomResponse>): ActiveGaugesPerDenomResponse {
    const message = { ...baseActiveGaugesPerDenomResponse } as ActiveGaugesPerDenomResponse
    message.data = []
    if (object.data !== undefined && object.data !== null) {
      for (const e of object.data) {
        message.data.push(Gauge.fromPartial(e))
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

const baseUpcomingGaugesRequest: object = {}

export const UpcomingGaugesRequest = {
  encode(message: UpcomingGaugesRequest, writer: Writer = Writer.create()): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): UpcomingGaugesRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseUpcomingGaugesRequest } as UpcomingGaugesRequest
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

  fromJSON(object: any): UpcomingGaugesRequest {
    const message = { ...baseUpcomingGaugesRequest } as UpcomingGaugesRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: UpcomingGaugesRequest): unknown {
    const obj: any = {}
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<UpcomingGaugesRequest>): UpcomingGaugesRequest {
    const message = { ...baseUpcomingGaugesRequest } as UpcomingGaugesRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

const baseUpcomingGaugesResponse: object = {}

export const UpcomingGaugesResponse = {
  encode(message: UpcomingGaugesResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.data) {
      Gauge.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): UpcomingGaugesResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseUpcomingGaugesResponse } as UpcomingGaugesResponse
    message.data = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.data.push(Gauge.decode(reader, reader.uint32()))
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

  fromJSON(object: any): UpcomingGaugesResponse {
    const message = { ...baseUpcomingGaugesResponse } as UpcomingGaugesResponse
    message.data = []
    if (object.data !== undefined && object.data !== null) {
      for (const e of object.data) {
        message.data.push(Gauge.fromJSON(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: UpcomingGaugesResponse): unknown {
    const obj: any = {}
    if (message.data) {
      obj.data = message.data.map((e) => (e ? Gauge.toJSON(e) : undefined))
    } else {
      obj.data = []
    }
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<UpcomingGaugesResponse>): UpcomingGaugesResponse {
    const message = { ...baseUpcomingGaugesResponse } as UpcomingGaugesResponse
    message.data = []
    if (object.data !== undefined && object.data !== null) {
      for (const e of object.data) {
        message.data.push(Gauge.fromPartial(e))
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

const baseUpcomingGaugesPerDenomRequest: object = { denom: '' }

export const UpcomingGaugesPerDenomRequest = {
  encode(message: UpcomingGaugesPerDenomRequest, writer: Writer = Writer.create()): Writer {
    if (message.denom !== '') {
      writer.uint32(10).string(message.denom)
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): UpcomingGaugesPerDenomRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseUpcomingGaugesPerDenomRequest } as UpcomingGaugesPerDenomRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string()
          break
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): UpcomingGaugesPerDenomRequest {
    const message = { ...baseUpcomingGaugesPerDenomRequest } as UpcomingGaugesPerDenomRequest
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = String(object.denom)
    } else {
      message.denom = ''
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: UpcomingGaugesPerDenomRequest): unknown {
    const obj: any = {}
    message.denom !== undefined && (obj.denom = message.denom)
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<UpcomingGaugesPerDenomRequest>): UpcomingGaugesPerDenomRequest {
    const message = { ...baseUpcomingGaugesPerDenomRequest } as UpcomingGaugesPerDenomRequest
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom
    } else {
      message.denom = ''
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

const baseUpcomingGaugesPerDenomResponse: object = {}

export const UpcomingGaugesPerDenomResponse = {
  encode(message: UpcomingGaugesPerDenomResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.upcoming_gauges) {
      Gauge.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): UpcomingGaugesPerDenomResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseUpcomingGaugesPerDenomResponse } as UpcomingGaugesPerDenomResponse
    message.upcoming_gauges = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.upcoming_gauges.push(Gauge.decode(reader, reader.uint32()))
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

  fromJSON(object: any): UpcomingGaugesPerDenomResponse {
    const message = { ...baseUpcomingGaugesPerDenomResponse } as UpcomingGaugesPerDenomResponse
    message.upcoming_gauges = []
    if (object.upcoming_gauges !== undefined && object.upcoming_gauges !== null) {
      for (const e of object.upcoming_gauges) {
        message.upcoming_gauges.push(Gauge.fromJSON(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: UpcomingGaugesPerDenomResponse): unknown {
    const obj: any = {}
    if (message.upcoming_gauges) {
      obj.upcoming_gauges = message.upcoming_gauges.map((e) => (e ? Gauge.toJSON(e) : undefined))
    } else {
      obj.upcoming_gauges = []
    }
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<UpcomingGaugesPerDenomResponse>): UpcomingGaugesPerDenomResponse {
    const message = { ...baseUpcomingGaugesPerDenomResponse } as UpcomingGaugesPerDenomResponse
    message.upcoming_gauges = []
    if (object.upcoming_gauges !== undefined && object.upcoming_gauges !== null) {
      for (const e of object.upcoming_gauges) {
        message.upcoming_gauges.push(Gauge.fromPartial(e))
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

const baseRewardsEstRequest: object = { owner: '', lock_ids: 0, end_epoch: 0 }

export const RewardsEstRequest = {
  encode(message: RewardsEstRequest, writer: Writer = Writer.create()): Writer {
    if (message.owner !== '') {
      writer.uint32(10).string(message.owner)
    }
    writer.uint32(18).fork()
    for (const v of message.lock_ids) {
      writer.uint64(v)
    }
    writer.ldelim()
    if (message.end_epoch !== 0) {
      writer.uint32(24).int64(message.end_epoch)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): RewardsEstRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseRewardsEstRequest } as RewardsEstRequest
    message.lock_ids = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string()
          break
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos
            while (reader.pos < end2) {
              message.lock_ids.push(longToNumber(reader.uint64() as Long))
            }
          } else {
            message.lock_ids.push(longToNumber(reader.uint64() as Long))
          }
          break
        case 3:
          message.end_epoch = longToNumber(reader.int64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): RewardsEstRequest {
    const message = { ...baseRewardsEstRequest } as RewardsEstRequest
    message.lock_ids = []
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner)
    } else {
      message.owner = ''
    }
    if (object.lock_ids !== undefined && object.lock_ids !== null) {
      for (const e of object.lock_ids) {
        message.lock_ids.push(Number(e))
      }
    }
    if (object.end_epoch !== undefined && object.end_epoch !== null) {
      message.end_epoch = Number(object.end_epoch)
    } else {
      message.end_epoch = 0
    }
    return message
  },

  toJSON(message: RewardsEstRequest): unknown {
    const obj: any = {}
    message.owner !== undefined && (obj.owner = message.owner)
    if (message.lock_ids) {
      obj.lock_ids = message.lock_ids.map((e) => e)
    } else {
      obj.lock_ids = []
    }
    message.end_epoch !== undefined && (obj.end_epoch = message.end_epoch)
    return obj
  },

  fromPartial(object: DeepPartial<RewardsEstRequest>): RewardsEstRequest {
    const message = { ...baseRewardsEstRequest } as RewardsEstRequest
    message.lock_ids = []
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner
    } else {
      message.owner = ''
    }
    if (object.lock_ids !== undefined && object.lock_ids !== null) {
      for (const e of object.lock_ids) {
        message.lock_ids.push(e)
      }
    }
    if (object.end_epoch !== undefined && object.end_epoch !== null) {
      message.end_epoch = object.end_epoch
    } else {
      message.end_epoch = 0
    }
    return message
  }
}

const baseRewardsEstResponse: object = {}

export const RewardsEstResponse = {
  encode(message: RewardsEstResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): RewardsEstResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseRewardsEstResponse } as RewardsEstResponse
    message.coins = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.coins.push(Coin.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): RewardsEstResponse {
    const message = { ...baseRewardsEstResponse } as RewardsEstResponse
    message.coins = []
    if (object.coins !== undefined && object.coins !== null) {
      for (const e of object.coins) {
        message.coins.push(Coin.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: RewardsEstResponse): unknown {
    const obj: any = {}
    if (message.coins) {
      obj.coins = message.coins.map((e) => (e ? Coin.toJSON(e) : undefined))
    } else {
      obj.coins = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<RewardsEstResponse>): RewardsEstResponse {
    const message = { ...baseRewardsEstResponse } as RewardsEstResponse
    message.coins = []
    if (object.coins !== undefined && object.coins !== null) {
      for (const e of object.coins) {
        message.coins.push(Coin.fromPartial(e))
      }
    }
    return message
  }
}

const baseQueryLockableDurationsRequest: object = {}

export const QueryLockableDurationsRequest = {
  encode(_: QueryLockableDurationsRequest, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryLockableDurationsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryLockableDurationsRequest } as QueryLockableDurationsRequest
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

  fromJSON(_: any): QueryLockableDurationsRequest {
    const message = { ...baseQueryLockableDurationsRequest } as QueryLockableDurationsRequest
    return message
  },

  toJSON(_: QueryLockableDurationsRequest): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<QueryLockableDurationsRequest>): QueryLockableDurationsRequest {
    const message = { ...baseQueryLockableDurationsRequest } as QueryLockableDurationsRequest
    return message
  }
}

const baseQueryLockableDurationsResponse: object = {}

export const QueryLockableDurationsResponse = {
  encode(message: QueryLockableDurationsResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.lockable_durations) {
      Duration.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryLockableDurationsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryLockableDurationsResponse } as QueryLockableDurationsResponse
    message.lockable_durations = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.lockable_durations.push(Duration.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryLockableDurationsResponse {
    const message = { ...baseQueryLockableDurationsResponse } as QueryLockableDurationsResponse
    message.lockable_durations = []
    if (object.lockable_durations !== undefined && object.lockable_durations !== null) {
      for (const e of object.lockable_durations) {
        message.lockable_durations.push(Duration.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: QueryLockableDurationsResponse): unknown {
    const obj: any = {}
    if (message.lockable_durations) {
      obj.lockable_durations = message.lockable_durations.map((e) => (e ? Duration.toJSON(e) : undefined))
    } else {
      obj.lockable_durations = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<QueryLockableDurationsResponse>): QueryLockableDurationsResponse {
    const message = { ...baseQueryLockableDurationsResponse } as QueryLockableDurationsResponse
    message.lockable_durations = []
    if (object.lockable_durations !== undefined && object.lockable_durations !== null) {
      for (const e of object.lockable_durations) {
        message.lockable_durations.push(Duration.fromPartial(e))
      }
    }
    return message
  }
}

/** Query defines the gRPC querier service. */
export interface Query {
  /** returns coins that is going to be distributed */
  ModuleToDistributeCoins(request: ModuleToDistributeCoinsRequest): Promise<ModuleToDistributeCoinsResponse>
  /** returns coins that are distributed by module so far */
  ModuleDistributedCoins(request: ModuleDistributedCoinsRequest): Promise<ModuleDistributedCoinsResponse>
  /** returns Gauge by id */
  GaugeByID(request: GaugeByIDRequest): Promise<GaugeByIDResponse>
  /** returns gauges both upcoming and active */
  Gauges(request: GaugesRequest): Promise<GaugesResponse>
  /** returns active gauges */
  ActiveGauges(request: ActiveGaugesRequest): Promise<ActiveGaugesResponse>
  /** returns active gauges per denom */
  ActiveGaugesPerDenom(request: ActiveGaugesPerDenomRequest): Promise<ActiveGaugesPerDenomResponse>
  /** returns scheduled gauges */
  UpcomingGauges(request: UpcomingGaugesRequest): Promise<UpcomingGaugesResponse>
  /** returns scheduled gauges per denom */
  UpcomingGaugesPerDenom(request: UpcomingGaugesPerDenomRequest): Promise<UpcomingGaugesPerDenomResponse>
  /**
   * RewardsEst returns an estimate of the rewards at a future specific time.
   * The querier either provides an address or a set of locks
   * for which they want to find the associated rewards.
   */
  RewardsEst(request: RewardsEstRequest): Promise<RewardsEstResponse>
  /** returns lockable durations that are valid to give incentives */
  LockableDurations(request: QueryLockableDurationsRequest): Promise<QueryLockableDurationsResponse>
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
  }
  ModuleToDistributeCoins(request: ModuleToDistributeCoinsRequest): Promise<ModuleToDistributeCoinsResponse> {
    const data = ModuleToDistributeCoinsRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.incentives.Query', 'ModuleToDistributeCoins', data)
    return promise.then((data) => ModuleToDistributeCoinsResponse.decode(new Reader(data)))
  }

  ModuleDistributedCoins(request: ModuleDistributedCoinsRequest): Promise<ModuleDistributedCoinsResponse> {
    const data = ModuleDistributedCoinsRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.incentives.Query', 'ModuleDistributedCoins', data)
    return promise.then((data) => ModuleDistributedCoinsResponse.decode(new Reader(data)))
  }

  GaugeByID(request: GaugeByIDRequest): Promise<GaugeByIDResponse> {
    const data = GaugeByIDRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.incentives.Query', 'GaugeByID', data)
    return promise.then((data) => GaugeByIDResponse.decode(new Reader(data)))
  }

  Gauges(request: GaugesRequest): Promise<GaugesResponse> {
    const data = GaugesRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.incentives.Query', 'Gauges', data)
    return promise.then((data) => GaugesResponse.decode(new Reader(data)))
  }

  ActiveGauges(request: ActiveGaugesRequest): Promise<ActiveGaugesResponse> {
    const data = ActiveGaugesRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.incentives.Query', 'ActiveGauges', data)
    return promise.then((data) => ActiveGaugesResponse.decode(new Reader(data)))
  }

  ActiveGaugesPerDenom(request: ActiveGaugesPerDenomRequest): Promise<ActiveGaugesPerDenomResponse> {
    const data = ActiveGaugesPerDenomRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.incentives.Query', 'ActiveGaugesPerDenom', data)
    return promise.then((data) => ActiveGaugesPerDenomResponse.decode(new Reader(data)))
  }

  UpcomingGauges(request: UpcomingGaugesRequest): Promise<UpcomingGaugesResponse> {
    const data = UpcomingGaugesRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.incentives.Query', 'UpcomingGauges', data)
    return promise.then((data) => UpcomingGaugesResponse.decode(new Reader(data)))
  }

  UpcomingGaugesPerDenom(request: UpcomingGaugesPerDenomRequest): Promise<UpcomingGaugesPerDenomResponse> {
    const data = UpcomingGaugesPerDenomRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.incentives.Query', 'UpcomingGaugesPerDenom', data)
    return promise.then((data) => UpcomingGaugesPerDenomResponse.decode(new Reader(data)))
  }

  RewardsEst(request: RewardsEstRequest): Promise<RewardsEstResponse> {
    const data = RewardsEstRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.incentives.Query', 'RewardsEst', data)
    return promise.then((data) => RewardsEstResponse.decode(new Reader(data)))
  }

  LockableDurations(request: QueryLockableDurationsRequest): Promise<QueryLockableDurationsResponse> {
    const data = QueryLockableDurationsRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.incentives.Query', 'LockableDurations', data)
    return promise.then((data) => QueryLockableDurationsResponse.decode(new Reader(data)))
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

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER')
  }
  return long.toNumber()
}

if (util.Long !== Long) {
  util.Long = Long as any
  configure()
}
