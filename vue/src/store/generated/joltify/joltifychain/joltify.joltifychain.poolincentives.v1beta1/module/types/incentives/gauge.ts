/* eslint-disable */
import { Timestamp } from '../google/protobuf/timestamp'
import * as Long from 'long'
import { util, configure, Writer, Reader } from 'protobufjs/minimal'
import { QueryCondition } from '../lockup/lock'
import { Coin } from '../cosmos/base/v1beta1/coin'
import { Duration } from '../google/protobuf/duration'

export const protobufPackage = 'joltify.joltifychain.incentives'

export interface Gauge {
  /** unique ID of a Gauge */
  id: number
  /** flag to show if it's perpetual or multi-epoch */
  is_perpetual: boolean
  /**
   * distribution incentives by third party
   * Rewards are distributed to lockups that are are returned by at least one of
   * these queries
   */
  distribute_to: QueryCondition | undefined
  /** total amount of Coins that has been in the gauge. */
  coins: Coin[]
  /** distribution start time */
  start_time: Date | undefined
  /** number of epochs distribution will be done */
  num_epochs_paid_over: number
  /** number of epochs distributed already */
  filled_epochs: number
  /** already distributed coins */
  distributed_coins: Coin[]
}

export interface LockableDurationsInfo {
  lockable_durations: Duration[]
}

const baseGauge: object = { id: 0, is_perpetual: false, num_epochs_paid_over: 0, filled_epochs: 0 }

export const Gauge = {
  encode(message: Gauge, writer: Writer = Writer.create()): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id)
    }
    if (message.is_perpetual === true) {
      writer.uint32(16).bool(message.is_perpetual)
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
    if (message.filled_epochs !== 0) {
      writer.uint32(56).uint64(message.filled_epochs)
    }
    for (const v of message.distributed_coins) {
      Coin.encode(v!, writer.uint32(66).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): Gauge {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseGauge } as Gauge
    message.coins = []
    message.distributed_coins = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long)
          break
        case 2:
          message.is_perpetual = reader.bool()
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
        case 7:
          message.filled_epochs = longToNumber(reader.uint64() as Long)
          break
        case 8:
          message.distributed_coins.push(Coin.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): Gauge {
    const message = { ...baseGauge } as Gauge
    message.coins = []
    message.distributed_coins = []
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id)
    } else {
      message.id = 0
    }
    if (object.is_perpetual !== undefined && object.is_perpetual !== null) {
      message.is_perpetual = Boolean(object.is_perpetual)
    } else {
      message.is_perpetual = false
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
    if (object.filled_epochs !== undefined && object.filled_epochs !== null) {
      message.filled_epochs = Number(object.filled_epochs)
    } else {
      message.filled_epochs = 0
    }
    if (object.distributed_coins !== undefined && object.distributed_coins !== null) {
      for (const e of object.distributed_coins) {
        message.distributed_coins.push(Coin.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: Gauge): unknown {
    const obj: any = {}
    message.id !== undefined && (obj.id = message.id)
    message.is_perpetual !== undefined && (obj.is_perpetual = message.is_perpetual)
    message.distribute_to !== undefined && (obj.distribute_to = message.distribute_to ? QueryCondition.toJSON(message.distribute_to) : undefined)
    if (message.coins) {
      obj.coins = message.coins.map((e) => (e ? Coin.toJSON(e) : undefined))
    } else {
      obj.coins = []
    }
    message.start_time !== undefined && (obj.start_time = message.start_time !== undefined ? message.start_time.toISOString() : null)
    message.num_epochs_paid_over !== undefined && (obj.num_epochs_paid_over = message.num_epochs_paid_over)
    message.filled_epochs !== undefined && (obj.filled_epochs = message.filled_epochs)
    if (message.distributed_coins) {
      obj.distributed_coins = message.distributed_coins.map((e) => (e ? Coin.toJSON(e) : undefined))
    } else {
      obj.distributed_coins = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<Gauge>): Gauge {
    const message = { ...baseGauge } as Gauge
    message.coins = []
    message.distributed_coins = []
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id
    } else {
      message.id = 0
    }
    if (object.is_perpetual !== undefined && object.is_perpetual !== null) {
      message.is_perpetual = object.is_perpetual
    } else {
      message.is_perpetual = false
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
    if (object.filled_epochs !== undefined && object.filled_epochs !== null) {
      message.filled_epochs = object.filled_epochs
    } else {
      message.filled_epochs = 0
    }
    if (object.distributed_coins !== undefined && object.distributed_coins !== null) {
      for (const e of object.distributed_coins) {
        message.distributed_coins.push(Coin.fromPartial(e))
      }
    }
    return message
  }
}

const baseLockableDurationsInfo: object = {}

export const LockableDurationsInfo = {
  encode(message: LockableDurationsInfo, writer: Writer = Writer.create()): Writer {
    for (const v of message.lockable_durations) {
      Duration.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): LockableDurationsInfo {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseLockableDurationsInfo } as LockableDurationsInfo
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

  fromJSON(object: any): LockableDurationsInfo {
    const message = { ...baseLockableDurationsInfo } as LockableDurationsInfo
    message.lockable_durations = []
    if (object.lockable_durations !== undefined && object.lockable_durations !== null) {
      for (const e of object.lockable_durations) {
        message.lockable_durations.push(Duration.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: LockableDurationsInfo): unknown {
    const obj: any = {}
    if (message.lockable_durations) {
      obj.lockable_durations = message.lockable_durations.map((e) => (e ? Duration.toJSON(e) : undefined))
    } else {
      obj.lockable_durations = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<LockableDurationsInfo>): LockableDurationsInfo {
    const message = { ...baseLockableDurationsInfo } as LockableDurationsInfo
    message.lockable_durations = []
    if (object.lockable_durations !== undefined && object.lockable_durations !== null) {
      for (const e of object.lockable_durations) {
        message.lockable_durations.push(Duration.fromPartial(e))
      }
    }
    return message
  }
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
