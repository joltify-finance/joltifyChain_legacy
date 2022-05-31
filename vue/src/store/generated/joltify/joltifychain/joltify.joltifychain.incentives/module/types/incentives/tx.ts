/* eslint-disable */
import { Reader, util, configure, Writer } from 'protobufjs/minimal'
import { Timestamp } from '../google/protobuf/timestamp'
import * as Long from 'long'
import { QueryCondition } from '../lockup/lock'
import { Coin } from '../cosmos/base/v1beta1/coin'

export const protobufPackage = 'joltify.joltifychain.incentives'

export interface MsgCreateGauge {
  /** flag to show if it's perpetual or multi-epoch */
  is_perpetual: boolean
  /** distribution incentives by third party */
  owner: string
  /** distribute condition of a lock which meet one of these conditions */
  distribute_to: QueryCondition | undefined
  /** can distribute multiple coins */
  coins: Coin[]
  /** distribution start time */
  start_time: Date | undefined
  /** number of epochs distribution will be done */
  num_epochs_paid_over: number
}

export interface MsgCreateGaugeResponse {}

export interface MsgAddToGauge {
  owner: string
  gauge_id: number
  rewards: Coin[]
}

export interface MsgAddToGaugeResponse {}

const baseMsgCreateGauge: object = { is_perpetual: false, owner: '', num_epochs_paid_over: 0 }

export const MsgCreateGauge = {
  encode(message: MsgCreateGauge, writer: Writer = Writer.create()): Writer {
    if (message.is_perpetual === true) {
      writer.uint32(8).bool(message.is_perpetual)
    }
    if (message.owner !== '') {
      writer.uint32(18).string(message.owner)
    }
    if (message.distribute_to !== undefined) {
      QueryCondition.encode(message.distribute_to, writer.uint32(26).fork()).ldelim()
    }
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim()
    }
    if (message.start_time !== undefined) {
      Timestamp.encode(toTimestamp(message.start_time), writer.uint32(42).fork()).ldelim()
    }
    if (message.num_epochs_paid_over !== 0) {
      writer.uint32(48).uint64(message.num_epochs_paid_over)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateGauge {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgCreateGauge } as MsgCreateGauge
    message.coins = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.is_perpetual = reader.bool()
          break
        case 2:
          message.owner = reader.string()
          break
        case 3:
          message.distribute_to = QueryCondition.decode(reader, reader.uint32())
          break
        case 4:
          message.coins.push(Coin.decode(reader, reader.uint32()))
          break
        case 5:
          message.start_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()))
          break
        case 6:
          message.num_epochs_paid_over = longToNumber(reader.uint64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgCreateGauge {
    const message = { ...baseMsgCreateGauge } as MsgCreateGauge
    message.coins = []
    if (object.is_perpetual !== undefined && object.is_perpetual !== null) {
      message.is_perpetual = Boolean(object.is_perpetual)
    } else {
      message.is_perpetual = false
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner)
    } else {
      message.owner = ''
    }
    if (object.distribute_to !== undefined && object.distribute_to !== null) {
      message.distribute_to = QueryCondition.fromJSON(object.distribute_to)
    } else {
      message.distribute_to = undefined
    }
    if (object.coins !== undefined && object.coins !== null) {
      for (const e of object.coins) {
        message.coins.push(Coin.fromJSON(e))
      }
    }
    if (object.start_time !== undefined && object.start_time !== null) {
      message.start_time = fromJsonTimestamp(object.start_time)
    } else {
      message.start_time = undefined
    }
    if (object.num_epochs_paid_over !== undefined && object.num_epochs_paid_over !== null) {
      message.num_epochs_paid_over = Number(object.num_epochs_paid_over)
    } else {
      message.num_epochs_paid_over = 0
    }
    return message
  },

  toJSON(message: MsgCreateGauge): unknown {
    const obj: any = {}
    message.is_perpetual !== undefined && (obj.is_perpetual = message.is_perpetual)
    message.owner !== undefined && (obj.owner = message.owner)
    message.distribute_to !== undefined && (obj.distribute_to = message.distribute_to ? QueryCondition.toJSON(message.distribute_to) : undefined)
    if (message.coins) {
      obj.coins = message.coins.map((e) => (e ? Coin.toJSON(e) : undefined))
    } else {
      obj.coins = []
    }
    message.start_time !== undefined && (obj.start_time = message.start_time !== undefined ? message.start_time.toISOString() : null)
    message.num_epochs_paid_over !== undefined && (obj.num_epochs_paid_over = message.num_epochs_paid_over)
    return obj
  },

  fromPartial(object: DeepPartial<MsgCreateGauge>): MsgCreateGauge {
    const message = { ...baseMsgCreateGauge } as MsgCreateGauge
    message.coins = []
    if (object.is_perpetual !== undefined && object.is_perpetual !== null) {
      message.is_perpetual = object.is_perpetual
    } else {
      message.is_perpetual = false
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner
    } else {
      message.owner = ''
    }
    if (object.distribute_to !== undefined && object.distribute_to !== null) {
      message.distribute_to = QueryCondition.fromPartial(object.distribute_to)
    } else {
      message.distribute_to = undefined
    }
    if (object.coins !== undefined && object.coins !== null) {
      for (const e of object.coins) {
        message.coins.push(Coin.fromPartial(e))
      }
    }
    if (object.start_time !== undefined && object.start_time !== null) {
      message.start_time = object.start_time
    } else {
      message.start_time = undefined
    }
    if (object.num_epochs_paid_over !== undefined && object.num_epochs_paid_over !== null) {
      message.num_epochs_paid_over = object.num_epochs_paid_over
    } else {
      message.num_epochs_paid_over = 0
    }
    return message
  }
}

const baseMsgCreateGaugeResponse: object = {}

export const MsgCreateGaugeResponse = {
  encode(_: MsgCreateGaugeResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateGaugeResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgCreateGaugeResponse } as MsgCreateGaugeResponse
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

  fromJSON(_: any): MsgCreateGaugeResponse {
    const message = { ...baseMsgCreateGaugeResponse } as MsgCreateGaugeResponse
    return message
  },

  toJSON(_: MsgCreateGaugeResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgCreateGaugeResponse>): MsgCreateGaugeResponse {
    const message = { ...baseMsgCreateGaugeResponse } as MsgCreateGaugeResponse
    return message
  }
}

const baseMsgAddToGauge: object = { owner: '', gauge_id: 0 }

export const MsgAddToGauge = {
  encode(message: MsgAddToGauge, writer: Writer = Writer.create()): Writer {
    if (message.owner !== '') {
      writer.uint32(10).string(message.owner)
    }
    if (message.gauge_id !== 0) {
      writer.uint32(16).uint64(message.gauge_id)
    }
    for (const v of message.rewards) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgAddToGauge {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgAddToGauge } as MsgAddToGauge
    message.rewards = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string()
          break
        case 2:
          message.gauge_id = longToNumber(reader.uint64() as Long)
          break
        case 3:
          message.rewards.push(Coin.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgAddToGauge {
    const message = { ...baseMsgAddToGauge } as MsgAddToGauge
    message.rewards = []
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner)
    } else {
      message.owner = ''
    }
    if (object.gauge_id !== undefined && object.gauge_id !== null) {
      message.gauge_id = Number(object.gauge_id)
    } else {
      message.gauge_id = 0
    }
    if (object.rewards !== undefined && object.rewards !== null) {
      for (const e of object.rewards) {
        message.rewards.push(Coin.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: MsgAddToGauge): unknown {
    const obj: any = {}
    message.owner !== undefined && (obj.owner = message.owner)
    message.gauge_id !== undefined && (obj.gauge_id = message.gauge_id)
    if (message.rewards) {
      obj.rewards = message.rewards.map((e) => (e ? Coin.toJSON(e) : undefined))
    } else {
      obj.rewards = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<MsgAddToGauge>): MsgAddToGauge {
    const message = { ...baseMsgAddToGauge } as MsgAddToGauge
    message.rewards = []
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner
    } else {
      message.owner = ''
    }
    if (object.gauge_id !== undefined && object.gauge_id !== null) {
      message.gauge_id = object.gauge_id
    } else {
      message.gauge_id = 0
    }
    if (object.rewards !== undefined && object.rewards !== null) {
      for (const e of object.rewards) {
        message.rewards.push(Coin.fromPartial(e))
      }
    }
    return message
  }
}

const baseMsgAddToGaugeResponse: object = {}

export const MsgAddToGaugeResponse = {
  encode(_: MsgAddToGaugeResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgAddToGaugeResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgAddToGaugeResponse } as MsgAddToGaugeResponse
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

  fromJSON(_: any): MsgAddToGaugeResponse {
    const message = { ...baseMsgAddToGaugeResponse } as MsgAddToGaugeResponse
    return message
  },

  toJSON(_: MsgAddToGaugeResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgAddToGaugeResponse>): MsgAddToGaugeResponse {
    const message = { ...baseMsgAddToGaugeResponse } as MsgAddToGaugeResponse
    return message
  }
}

export interface Msg {
  CreateGauge(request: MsgCreateGauge): Promise<MsgCreateGaugeResponse>
  AddToGauge(request: MsgAddToGauge): Promise<MsgAddToGaugeResponse>
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
  }
  CreateGauge(request: MsgCreateGauge): Promise<MsgCreateGaugeResponse> {
    const data = MsgCreateGauge.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.incentives.Msg', 'CreateGauge', data)
    return promise.then((data) => MsgCreateGaugeResponse.decode(new Reader(data)))
  }

  AddToGauge(request: MsgAddToGauge): Promise<MsgAddToGaugeResponse> {
    const data = MsgAddToGauge.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.incentives.Msg', 'AddToGauge', data)
    return promise.then((data) => MsgAddToGaugeResponse.decode(new Reader(data)))
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

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000
  const nanos = (date.getTime() % 1_000) * 1_000_000
  return { seconds, nanos }
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000
  millis += t.nanos / 1_000_000
  return new Date(millis)
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o
  } else if (typeof o === 'string') {
    return new Date(o)
  } else {
    return fromTimestamp(Timestamp.fromJSON(o))
  }
}

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
