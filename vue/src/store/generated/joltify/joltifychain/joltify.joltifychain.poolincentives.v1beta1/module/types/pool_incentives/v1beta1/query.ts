/* eslint-disable */
import { Reader, util, configure, Writer } from 'protobufjs/minimal'
import * as Long from 'long'
import { Duration } from '../../google/protobuf/duration'
import { DistrInfo, Params } from '../../pool_incentives/v1beta1/incentives'
import { Gauge } from '../../incentives/gauge'

export const protobufPackage = 'joltify.joltifychain.poolincentives.v1beta1'

export interface QueryGaugeIdsRequest {
  pool_id: number
}

export interface QueryGaugeIdsResponse {
  gauge_ids_with_duration: QueryGaugeIdsResponse_GaugeIdWithDuration[]
}

export interface QueryGaugeIdsResponse_GaugeIdWithDuration {
  gauge_id: number
  duration: Duration | undefined
}

export interface QueryDistrInfoRequest {}

export interface QueryDistrInfoResponse {
  distr_info: DistrInfo | undefined
}

export interface QueryParamsRequest {}

export interface QueryParamsResponse {
  params: Params | undefined
}

export interface QueryLockableDurationsRequest {}

export interface QueryLockableDurationsResponse {
  lockable_durations: Duration[]
}

export interface QueryIncentivizedPoolsRequest {}

export interface IncentivizedPool {
  pool_id: number
  lockable_duration: Duration | undefined
  gauge_id: number
}

export interface QueryIncentivizedPoolsResponse {
  incentivized_pools: IncentivizedPool[]
}

export interface QueryExternalIncentiveGaugesRequest {}

export interface QueryExternalIncentiveGaugesResponse {
  data: Gauge[]
}

const baseQueryGaugeIdsRequest: object = { pool_id: 0 }

export const QueryGaugeIdsRequest = {
  encode(message: QueryGaugeIdsRequest, writer: Writer = Writer.create()): Writer {
    if (message.pool_id !== 0) {
      writer.uint32(8).uint64(message.pool_id)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGaugeIdsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryGaugeIdsRequest } as QueryGaugeIdsRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.pool_id = longToNumber(reader.uint64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryGaugeIdsRequest {
    const message = { ...baseQueryGaugeIdsRequest } as QueryGaugeIdsRequest
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.pool_id = Number(object.pool_id)
    } else {
      message.pool_id = 0
    }
    return message
  },

  toJSON(message: QueryGaugeIdsRequest): unknown {
    const obj: any = {}
    message.pool_id !== undefined && (obj.pool_id = message.pool_id)
    return obj
  },

  fromPartial(object: DeepPartial<QueryGaugeIdsRequest>): QueryGaugeIdsRequest {
    const message = { ...baseQueryGaugeIdsRequest } as QueryGaugeIdsRequest
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.pool_id = object.pool_id
    } else {
      message.pool_id = 0
    }
    return message
  }
}

const baseQueryGaugeIdsResponse: object = {}

export const QueryGaugeIdsResponse = {
  encode(message: QueryGaugeIdsResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.gauge_ids_with_duration) {
      QueryGaugeIdsResponse_GaugeIdWithDuration.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGaugeIdsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryGaugeIdsResponse } as QueryGaugeIdsResponse
    message.gauge_ids_with_duration = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.gauge_ids_with_duration.push(QueryGaugeIdsResponse_GaugeIdWithDuration.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryGaugeIdsResponse {
    const message = { ...baseQueryGaugeIdsResponse } as QueryGaugeIdsResponse
    message.gauge_ids_with_duration = []
    if (object.gauge_ids_with_duration !== undefined && object.gauge_ids_with_duration !== null) {
      for (const e of object.gauge_ids_with_duration) {
        message.gauge_ids_with_duration.push(QueryGaugeIdsResponse_GaugeIdWithDuration.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: QueryGaugeIdsResponse): unknown {
    const obj: any = {}
    if (message.gauge_ids_with_duration) {
      obj.gauge_ids_with_duration = message.gauge_ids_with_duration.map((e) => (e ? QueryGaugeIdsResponse_GaugeIdWithDuration.toJSON(e) : undefined))
    } else {
      obj.gauge_ids_with_duration = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<QueryGaugeIdsResponse>): QueryGaugeIdsResponse {
    const message = { ...baseQueryGaugeIdsResponse } as QueryGaugeIdsResponse
    message.gauge_ids_with_duration = []
    if (object.gauge_ids_with_duration !== undefined && object.gauge_ids_with_duration !== null) {
      for (const e of object.gauge_ids_with_duration) {
        message.gauge_ids_with_duration.push(QueryGaugeIdsResponse_GaugeIdWithDuration.fromPartial(e))
      }
    }
    return message
  }
}

const baseQueryGaugeIdsResponse_GaugeIdWithDuration: object = { gauge_id: 0 }

export const QueryGaugeIdsResponse_GaugeIdWithDuration = {
  encode(message: QueryGaugeIdsResponse_GaugeIdWithDuration, writer: Writer = Writer.create()): Writer {
    if (message.gauge_id !== 0) {
      writer.uint32(8).uint64(message.gauge_id)
    }
    if (message.duration !== undefined) {
      Duration.encode(message.duration, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGaugeIdsResponse_GaugeIdWithDuration {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryGaugeIdsResponse_GaugeIdWithDuration } as QueryGaugeIdsResponse_GaugeIdWithDuration
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.gauge_id = longToNumber(reader.uint64() as Long)
          break
        case 2:
          message.duration = Duration.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryGaugeIdsResponse_GaugeIdWithDuration {
    const message = { ...baseQueryGaugeIdsResponse_GaugeIdWithDuration } as QueryGaugeIdsResponse_GaugeIdWithDuration
    if (object.gauge_id !== undefined && object.gauge_id !== null) {
      message.gauge_id = Number(object.gauge_id)
    } else {
      message.gauge_id = 0
    }
    if (object.duration !== undefined && object.duration !== null) {
      message.duration = Duration.fromJSON(object.duration)
    } else {
      message.duration = undefined
    }
    return message
  },

  toJSON(message: QueryGaugeIdsResponse_GaugeIdWithDuration): unknown {
    const obj: any = {}
    message.gauge_id !== undefined && (obj.gauge_id = message.gauge_id)
    message.duration !== undefined && (obj.duration = message.duration ? Duration.toJSON(message.duration) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryGaugeIdsResponse_GaugeIdWithDuration>): QueryGaugeIdsResponse_GaugeIdWithDuration {
    const message = { ...baseQueryGaugeIdsResponse_GaugeIdWithDuration } as QueryGaugeIdsResponse_GaugeIdWithDuration
    if (object.gauge_id !== undefined && object.gauge_id !== null) {
      message.gauge_id = object.gauge_id
    } else {
      message.gauge_id = 0
    }
    if (object.duration !== undefined && object.duration !== null) {
      message.duration = Duration.fromPartial(object.duration)
    } else {
      message.duration = undefined
    }
    return message
  }
}

const baseQueryDistrInfoRequest: object = {}

export const QueryDistrInfoRequest = {
  encode(_: QueryDistrInfoRequest, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryDistrInfoRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryDistrInfoRequest } as QueryDistrInfoRequest
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

  fromJSON(_: any): QueryDistrInfoRequest {
    const message = { ...baseQueryDistrInfoRequest } as QueryDistrInfoRequest
    return message
  },

  toJSON(_: QueryDistrInfoRequest): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<QueryDistrInfoRequest>): QueryDistrInfoRequest {
    const message = { ...baseQueryDistrInfoRequest } as QueryDistrInfoRequest
    return message
  }
}

const baseQueryDistrInfoResponse: object = {}

export const QueryDistrInfoResponse = {
  encode(message: QueryDistrInfoResponse, writer: Writer = Writer.create()): Writer {
    if (message.distr_info !== undefined) {
      DistrInfo.encode(message.distr_info, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryDistrInfoResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryDistrInfoResponse } as QueryDistrInfoResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.distr_info = DistrInfo.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryDistrInfoResponse {
    const message = { ...baseQueryDistrInfoResponse } as QueryDistrInfoResponse
    if (object.distr_info !== undefined && object.distr_info !== null) {
      message.distr_info = DistrInfo.fromJSON(object.distr_info)
    } else {
      message.distr_info = undefined
    }
    return message
  },

  toJSON(message: QueryDistrInfoResponse): unknown {
    const obj: any = {}
    message.distr_info !== undefined && (obj.distr_info = message.distr_info ? DistrInfo.toJSON(message.distr_info) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryDistrInfoResponse>): QueryDistrInfoResponse {
    const message = { ...baseQueryDistrInfoResponse } as QueryDistrInfoResponse
    if (object.distr_info !== undefined && object.distr_info !== null) {
      message.distr_info = DistrInfo.fromPartial(object.distr_info)
    } else {
      message.distr_info = undefined
    }
    return message
  }
}

const baseQueryParamsRequest: object = {}

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest
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

  fromJSON(_: any): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest
    return message
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest
    return message
  }
}

const baseQueryParamsResponse: object = {}

export const QueryParamsResponse = {
  encode(message: QueryParamsResponse, writer: Writer = Writer.create()): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params)
    } else {
      message.params = undefined
    }
    return message
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {}
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params)
    } else {
      message.params = undefined
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

const baseQueryIncentivizedPoolsRequest: object = {}

export const QueryIncentivizedPoolsRequest = {
  encode(_: QueryIncentivizedPoolsRequest, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryIncentivizedPoolsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryIncentivizedPoolsRequest } as QueryIncentivizedPoolsRequest
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

  fromJSON(_: any): QueryIncentivizedPoolsRequest {
    const message = { ...baseQueryIncentivizedPoolsRequest } as QueryIncentivizedPoolsRequest
    return message
  },

  toJSON(_: QueryIncentivizedPoolsRequest): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<QueryIncentivizedPoolsRequest>): QueryIncentivizedPoolsRequest {
    const message = { ...baseQueryIncentivizedPoolsRequest } as QueryIncentivizedPoolsRequest
    return message
  }
}

const baseIncentivizedPool: object = { pool_id: 0, gauge_id: 0 }

export const IncentivizedPool = {
  encode(message: IncentivizedPool, writer: Writer = Writer.create()): Writer {
    if (message.pool_id !== 0) {
      writer.uint32(8).uint64(message.pool_id)
    }
    if (message.lockable_duration !== undefined) {
      Duration.encode(message.lockable_duration, writer.uint32(18).fork()).ldelim()
    }
    if (message.gauge_id !== 0) {
      writer.uint32(24).uint64(message.gauge_id)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): IncentivizedPool {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseIncentivizedPool } as IncentivizedPool
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.pool_id = longToNumber(reader.uint64() as Long)
          break
        case 2:
          message.lockable_duration = Duration.decode(reader, reader.uint32())
          break
        case 3:
          message.gauge_id = longToNumber(reader.uint64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): IncentivizedPool {
    const message = { ...baseIncentivizedPool } as IncentivizedPool
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.pool_id = Number(object.pool_id)
    } else {
      message.pool_id = 0
    }
    if (object.lockable_duration !== undefined && object.lockable_duration !== null) {
      message.lockable_duration = Duration.fromJSON(object.lockable_duration)
    } else {
      message.lockable_duration = undefined
    }
    if (object.gauge_id !== undefined && object.gauge_id !== null) {
      message.gauge_id = Number(object.gauge_id)
    } else {
      message.gauge_id = 0
    }
    return message
  },

  toJSON(message: IncentivizedPool): unknown {
    const obj: any = {}
    message.pool_id !== undefined && (obj.pool_id = message.pool_id)
    message.lockable_duration !== undefined && (obj.lockable_duration = message.lockable_duration ? Duration.toJSON(message.lockable_duration) : undefined)
    message.gauge_id !== undefined && (obj.gauge_id = message.gauge_id)
    return obj
  },

  fromPartial(object: DeepPartial<IncentivizedPool>): IncentivizedPool {
    const message = { ...baseIncentivizedPool } as IncentivizedPool
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.pool_id = object.pool_id
    } else {
      message.pool_id = 0
    }
    if (object.lockable_duration !== undefined && object.lockable_duration !== null) {
      message.lockable_duration = Duration.fromPartial(object.lockable_duration)
    } else {
      message.lockable_duration = undefined
    }
    if (object.gauge_id !== undefined && object.gauge_id !== null) {
      message.gauge_id = object.gauge_id
    } else {
      message.gauge_id = 0
    }
    return message
  }
}

const baseQueryIncentivizedPoolsResponse: object = {}

export const QueryIncentivizedPoolsResponse = {
  encode(message: QueryIncentivizedPoolsResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.incentivized_pools) {
      IncentivizedPool.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryIncentivizedPoolsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryIncentivizedPoolsResponse } as QueryIncentivizedPoolsResponse
    message.incentivized_pools = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.incentivized_pools.push(IncentivizedPool.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryIncentivizedPoolsResponse {
    const message = { ...baseQueryIncentivizedPoolsResponse } as QueryIncentivizedPoolsResponse
    message.incentivized_pools = []
    if (object.incentivized_pools !== undefined && object.incentivized_pools !== null) {
      for (const e of object.incentivized_pools) {
        message.incentivized_pools.push(IncentivizedPool.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: QueryIncentivizedPoolsResponse): unknown {
    const obj: any = {}
    if (message.incentivized_pools) {
      obj.incentivized_pools = message.incentivized_pools.map((e) => (e ? IncentivizedPool.toJSON(e) : undefined))
    } else {
      obj.incentivized_pools = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<QueryIncentivizedPoolsResponse>): QueryIncentivizedPoolsResponse {
    const message = { ...baseQueryIncentivizedPoolsResponse } as QueryIncentivizedPoolsResponse
    message.incentivized_pools = []
    if (object.incentivized_pools !== undefined && object.incentivized_pools !== null) {
      for (const e of object.incentivized_pools) {
        message.incentivized_pools.push(IncentivizedPool.fromPartial(e))
      }
    }
    return message
  }
}

const baseQueryExternalIncentiveGaugesRequest: object = {}

export const QueryExternalIncentiveGaugesRequest = {
  encode(_: QueryExternalIncentiveGaugesRequest, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryExternalIncentiveGaugesRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryExternalIncentiveGaugesRequest } as QueryExternalIncentiveGaugesRequest
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

  fromJSON(_: any): QueryExternalIncentiveGaugesRequest {
    const message = { ...baseQueryExternalIncentiveGaugesRequest } as QueryExternalIncentiveGaugesRequest
    return message
  },

  toJSON(_: QueryExternalIncentiveGaugesRequest): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<QueryExternalIncentiveGaugesRequest>): QueryExternalIncentiveGaugesRequest {
    const message = { ...baseQueryExternalIncentiveGaugesRequest } as QueryExternalIncentiveGaugesRequest
    return message
  }
}

const baseQueryExternalIncentiveGaugesResponse: object = {}

export const QueryExternalIncentiveGaugesResponse = {
  encode(message: QueryExternalIncentiveGaugesResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.data) {
      Gauge.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryExternalIncentiveGaugesResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryExternalIncentiveGaugesResponse } as QueryExternalIncentiveGaugesResponse
    message.data = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.data.push(Gauge.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryExternalIncentiveGaugesResponse {
    const message = { ...baseQueryExternalIncentiveGaugesResponse } as QueryExternalIncentiveGaugesResponse
    message.data = []
    if (object.data !== undefined && object.data !== null) {
      for (const e of object.data) {
        message.data.push(Gauge.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: QueryExternalIncentiveGaugesResponse): unknown {
    const obj: any = {}
    if (message.data) {
      obj.data = message.data.map((e) => (e ? Gauge.toJSON(e) : undefined))
    } else {
      obj.data = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<QueryExternalIncentiveGaugesResponse>): QueryExternalIncentiveGaugesResponse {
    const message = { ...baseQueryExternalIncentiveGaugesResponse } as QueryExternalIncentiveGaugesResponse
    message.data = []
    if (object.data !== undefined && object.data !== null) {
      for (const e of object.data) {
        message.data.push(Gauge.fromPartial(e))
      }
    }
    return message
  }
}

export interface Query {
  /** GaugeIds takes the pool id and returns the matching gauge ids and durations */
  GaugeIds(request: QueryGaugeIdsRequest): Promise<QueryGaugeIdsResponse>
  DistrInfo(request: QueryDistrInfoRequest): Promise<QueryDistrInfoResponse>
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>
  LockableDurations(request: QueryLockableDurationsRequest): Promise<QueryLockableDurationsResponse>
  IncentivizedPools(request: QueryIncentivizedPoolsRequest): Promise<QueryIncentivizedPoolsResponse>
  ExternalIncentiveGauges(request: QueryExternalIncentiveGaugesRequest): Promise<QueryExternalIncentiveGaugesResponse>
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
  }
  GaugeIds(request: QueryGaugeIdsRequest): Promise<QueryGaugeIdsResponse> {
    const data = QueryGaugeIdsRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.poolincentives.v1beta1.Query', 'GaugeIds', data)
    return promise.then((data) => QueryGaugeIdsResponse.decode(new Reader(data)))
  }

  DistrInfo(request: QueryDistrInfoRequest): Promise<QueryDistrInfoResponse> {
    const data = QueryDistrInfoRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.poolincentives.v1beta1.Query', 'DistrInfo', data)
    return promise.then((data) => QueryDistrInfoResponse.decode(new Reader(data)))
  }

  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.poolincentives.v1beta1.Query', 'Params', data)
    return promise.then((data) => QueryParamsResponse.decode(new Reader(data)))
  }

  LockableDurations(request: QueryLockableDurationsRequest): Promise<QueryLockableDurationsResponse> {
    const data = QueryLockableDurationsRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.poolincentives.v1beta1.Query', 'LockableDurations', data)
    return promise.then((data) => QueryLockableDurationsResponse.decode(new Reader(data)))
  }

  IncentivizedPools(request: QueryIncentivizedPoolsRequest): Promise<QueryIncentivizedPoolsResponse> {
    const data = QueryIncentivizedPoolsRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.poolincentives.v1beta1.Query', 'IncentivizedPools', data)
    return promise.then((data) => QueryIncentivizedPoolsResponse.decode(new Reader(data)))
  }

  ExternalIncentiveGauges(request: QueryExternalIncentiveGaugesRequest): Promise<QueryExternalIncentiveGaugesResponse> {
    const data = QueryExternalIncentiveGaugesRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.poolincentives.v1beta1.Query', 'ExternalIncentiveGauges', data)
    return promise.then((data) => QueryExternalIncentiveGaugesResponse.decode(new Reader(data)))
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
