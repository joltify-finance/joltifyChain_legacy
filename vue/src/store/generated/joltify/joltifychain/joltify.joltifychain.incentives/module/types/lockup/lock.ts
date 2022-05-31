/* eslint-disable */
import { Timestamp } from '../google/protobuf/timestamp'
import * as Long from 'long'
import { util, configure, Writer, Reader } from 'protobufjs/minimal'
import { Duration } from '../google/protobuf/duration'
import { Coin } from '../cosmos/base/v1beta1/coin'

export const protobufPackage = 'joltify.joltifychain.lockup'

export enum LockQueryType {
  /** ByDuration - Queries for locks that are longer than a certain duration */
  ByDuration = 0,
  /** ByTime - Queries for lockups that started before a specific time */
  ByTime = 1,
  UNRECOGNIZED = -1
}

export function lockQueryTypeFromJSON(object: any): LockQueryType {
  switch (object) {
    case 0:
    case 'ByDuration':
      return LockQueryType.ByDuration
    case 1:
    case 'ByTime':
      return LockQueryType.ByTime
    case -1:
    case 'UNRECOGNIZED':
    default:
      return LockQueryType.UNRECOGNIZED
  }
}

export function lockQueryTypeToJSON(object: LockQueryType): string {
  switch (object) {
    case LockQueryType.ByDuration:
      return 'ByDuration'
    case LockQueryType.ByTime:
      return 'ByTime'
    default:
      return 'UNKNOWN'
  }
}

/**
 * PeriodLock is a single unit of lock by period. It's a record of locked coin
 * at a specific time. It stores owner, duration, unlock time and the amount of
 * coins locked.
 */
export interface PeriodLock {
  ID: number
  owner: string
  duration: Duration | undefined
  end_time: Date | undefined
  coins: Coin[]
}

export interface QueryCondition {
  /** type of lock query, ByLockDuration | ByLockTime */
  lock_query_type: LockQueryType
  /** What token denomination are we looking for lockups of */
  denom: string
  /** valid when query condition is ByDuration */
  duration: Duration | undefined
  /** valid when query condition is ByTime */
  timestamp: Date | undefined
}

/**
 * SyntheticLock is a single unit of synthetic lockup
 * TODO: Change this to have
 * * underlying_lock_id
 * * synthetic_coin
 * * end_time
 * * duration
 * * owner
 * We then index synthetic locks by the denom, just like we do with normal
 * locks. Ideally we even get an interface, so we can re-use that same logic.
 * I currently have no idea how reward distribution is supposed to be working...
 * EVENTUALLY
 * we make a "constrained_coin" field, which is what the current "coins" field
 * is. Constrained coin field can be a #post-v7 feature, since we aren't
 * allowing partial unlocks of synthetic lockups.
 */
export interface SyntheticLock {
  /** underlying native lockup id for this synthetic lockup */
  underlying_lock_id: number
  synth_denom: string
  /**
   * used for unbonding synthetic lockups, for active synthetic lockups, this
   * value is set to uninitialized value
   */
  end_time: Date | undefined
  duration: Duration | undefined
}

const basePeriodLock: object = { ID: 0, owner: '' }

export const PeriodLock = {
  encode(message: PeriodLock, writer: Writer = Writer.create()): Writer {
    if (message.ID !== 0) {
      writer.uint32(8).uint64(message.ID)
    }
    if (message.owner !== '') {
      writer.uint32(18).string(message.owner)
    }
    if (message.duration !== undefined) {
      Duration.encode(message.duration, writer.uint32(26).fork()).ldelim()
    }
    if (message.end_time !== undefined) {
      Timestamp.encode(toTimestamp(message.end_time), writer.uint32(34).fork()).ldelim()
    }
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(42).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): PeriodLock {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...basePeriodLock } as PeriodLock
    message.coins = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.ID = longToNumber(reader.uint64() as Long)
          break
        case 2:
          message.owner = reader.string()
          break
        case 3:
          message.duration = Duration.decode(reader, reader.uint32())
          break
        case 4:
          message.end_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()))
          break
        case 5:
          message.coins.push(Coin.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): PeriodLock {
    const message = { ...basePeriodLock } as PeriodLock
    message.coins = []
    if (object.ID !== undefined && object.ID !== null) {
      message.ID = Number(object.ID)
    } else {
      message.ID = 0
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner)
    } else {
      message.owner = ''
    }
    if (object.duration !== undefined && object.duration !== null) {
      message.duration = Duration.fromJSON(object.duration)
    } else {
      message.duration = undefined
    }
    if (object.end_time !== undefined && object.end_time !== null) {
      message.end_time = fromJsonTimestamp(object.end_time)
    } else {
      message.end_time = undefined
    }
    if (object.coins !== undefined && object.coins !== null) {
      for (const e of object.coins) {
        message.coins.push(Coin.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: PeriodLock): unknown {
    const obj: any = {}
    message.ID !== undefined && (obj.ID = message.ID)
    message.owner !== undefined && (obj.owner = message.owner)
    message.duration !== undefined && (obj.duration = message.duration ? Duration.toJSON(message.duration) : undefined)
    message.end_time !== undefined && (obj.end_time = message.end_time !== undefined ? message.end_time.toISOString() : null)
    if (message.coins) {
      obj.coins = message.coins.map((e) => (e ? Coin.toJSON(e) : undefined))
    } else {
      obj.coins = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<PeriodLock>): PeriodLock {
    const message = { ...basePeriodLock } as PeriodLock
    message.coins = []
    if (object.ID !== undefined && object.ID !== null) {
      message.ID = object.ID
    } else {
      message.ID = 0
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner
    } else {
      message.owner = ''
    }
    if (object.duration !== undefined && object.duration !== null) {
      message.duration = Duration.fromPartial(object.duration)
    } else {
      message.duration = undefined
    }
    if (object.end_time !== undefined && object.end_time !== null) {
      message.end_time = object.end_time
    } else {
      message.end_time = undefined
    }
    if (object.coins !== undefined && object.coins !== null) {
      for (const e of object.coins) {
        message.coins.push(Coin.fromPartial(e))
      }
    }
    return message
  }
}

const baseQueryCondition: object = { lock_query_type: 0, denom: '' }

export const QueryCondition = {
  encode(message: QueryCondition, writer: Writer = Writer.create()): Writer {
    if (message.lock_query_type !== 0) {
      writer.uint32(8).int32(message.lock_query_type)
    }
    if (message.denom !== '') {
      writer.uint32(18).string(message.denom)
    }
    if (message.duration !== undefined) {
      Duration.encode(message.duration, writer.uint32(26).fork()).ldelim()
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(34).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryCondition {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryCondition } as QueryCondition
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.lock_query_type = reader.int32() as any
          break
        case 2:
          message.denom = reader.string()
          break
        case 3:
          message.duration = Duration.decode(reader, reader.uint32())
          break
        case 4:
          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryCondition {
    const message = { ...baseQueryCondition } as QueryCondition
    if (object.lock_query_type !== undefined && object.lock_query_type !== null) {
      message.lock_query_type = lockQueryTypeFromJSON(object.lock_query_type)
    } else {
      message.lock_query_type = 0
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = String(object.denom)
    } else {
      message.denom = ''
    }
    if (object.duration !== undefined && object.duration !== null) {
      message.duration = Duration.fromJSON(object.duration)
    } else {
      message.duration = undefined
    }
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = fromJsonTimestamp(object.timestamp)
    } else {
      message.timestamp = undefined
    }
    return message
  },

  toJSON(message: QueryCondition): unknown {
    const obj: any = {}
    message.lock_query_type !== undefined && (obj.lock_query_type = lockQueryTypeToJSON(message.lock_query_type))
    message.denom !== undefined && (obj.denom = message.denom)
    message.duration !== undefined && (obj.duration = message.duration ? Duration.toJSON(message.duration) : undefined)
    message.timestamp !== undefined && (obj.timestamp = message.timestamp !== undefined ? message.timestamp.toISOString() : null)
    return obj
  },

  fromPartial(object: DeepPartial<QueryCondition>): QueryCondition {
    const message = { ...baseQueryCondition } as QueryCondition
    if (object.lock_query_type !== undefined && object.lock_query_type !== null) {
      message.lock_query_type = object.lock_query_type
    } else {
      message.lock_query_type = 0
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom
    } else {
      message.denom = ''
    }
    if (object.duration !== undefined && object.duration !== null) {
      message.duration = Duration.fromPartial(object.duration)
    } else {
      message.duration = undefined
    }
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = object.timestamp
    } else {
      message.timestamp = undefined
    }
    return message
  }
}

const baseSyntheticLock: object = { underlying_lock_id: 0, synth_denom: '' }

export const SyntheticLock = {
  encode(message: SyntheticLock, writer: Writer = Writer.create()): Writer {
    if (message.underlying_lock_id !== 0) {
      writer.uint32(8).uint64(message.underlying_lock_id)
    }
    if (message.synth_denom !== '') {
      writer.uint32(18).string(message.synth_denom)
    }
    if (message.end_time !== undefined) {
      Timestamp.encode(toTimestamp(message.end_time), writer.uint32(26).fork()).ldelim()
    }
    if (message.duration !== undefined) {
      Duration.encode(message.duration, writer.uint32(34).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): SyntheticLock {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseSyntheticLock } as SyntheticLock
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.underlying_lock_id = longToNumber(reader.uint64() as Long)
          break
        case 2:
          message.synth_denom = reader.string()
          break
        case 3:
          message.end_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()))
          break
        case 4:
          message.duration = Duration.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): SyntheticLock {
    const message = { ...baseSyntheticLock } as SyntheticLock
    if (object.underlying_lock_id !== undefined && object.underlying_lock_id !== null) {
      message.underlying_lock_id = Number(object.underlying_lock_id)
    } else {
      message.underlying_lock_id = 0
    }
    if (object.synth_denom !== undefined && object.synth_denom !== null) {
      message.synth_denom = String(object.synth_denom)
    } else {
      message.synth_denom = ''
    }
    if (object.end_time !== undefined && object.end_time !== null) {
      message.end_time = fromJsonTimestamp(object.end_time)
    } else {
      message.end_time = undefined
    }
    if (object.duration !== undefined && object.duration !== null) {
      message.duration = Duration.fromJSON(object.duration)
    } else {
      message.duration = undefined
    }
    return message
  },

  toJSON(message: SyntheticLock): unknown {
    const obj: any = {}
    message.underlying_lock_id !== undefined && (obj.underlying_lock_id = message.underlying_lock_id)
    message.synth_denom !== undefined && (obj.synth_denom = message.synth_denom)
    message.end_time !== undefined && (obj.end_time = message.end_time !== undefined ? message.end_time.toISOString() : null)
    message.duration !== undefined && (obj.duration = message.duration ? Duration.toJSON(message.duration) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<SyntheticLock>): SyntheticLock {
    const message = { ...baseSyntheticLock } as SyntheticLock
    if (object.underlying_lock_id !== undefined && object.underlying_lock_id !== null) {
      message.underlying_lock_id = object.underlying_lock_id
    } else {
      message.underlying_lock_id = 0
    }
    if (object.synth_denom !== undefined && object.synth_denom !== null) {
      message.synth_denom = object.synth_denom
    } else {
      message.synth_denom = ''
    }
    if (object.end_time !== undefined && object.end_time !== null) {
      message.end_time = object.end_time
    } else {
      message.end_time = undefined
    }
    if (object.duration !== undefined && object.duration !== null) {
      message.duration = Duration.fromPartial(object.duration)
    } else {
      message.duration = undefined
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
