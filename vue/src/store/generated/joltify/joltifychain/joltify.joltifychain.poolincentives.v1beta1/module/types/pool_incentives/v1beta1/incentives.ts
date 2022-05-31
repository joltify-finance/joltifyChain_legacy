/* eslint-disable */
import * as Long from 'long'
import { util, configure, Writer, Reader } from 'protobufjs/minimal'
import { Duration } from '../../google/protobuf/duration'

export const protobufPackage = 'joltify.joltifychain.poolincentives.v1beta1'

export interface Params {
  /**
   * minted_denom is the denomination of the coin expected to be minted by the
   * minting module. Pool-incentives module doesn’t actually mint the coin
   * itself, but rather manages the distribution of coins that matches the
   * defined minted_denom.
   */
  minted_denom: string
}

export interface LockableDurationsInfo {
  lockable_durations: Duration[]
}

export interface DistrInfo {
  total_weight: string
  records: DistrRecord[]
}

export interface DistrRecord {
  gauge_id: number
  weight: string
}

const baseParams: object = { minted_denom: '' }

export const Params = {
  encode(message: Params, writer: Writer = Writer.create()): Writer {
    if (message.minted_denom !== '') {
      writer.uint32(10).string(message.minted_denom)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseParams } as Params
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.minted_denom = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): Params {
    const message = { ...baseParams } as Params
    if (object.minted_denom !== undefined && object.minted_denom !== null) {
      message.minted_denom = String(object.minted_denom)
    } else {
      message.minted_denom = ''
    }
    return message
  },

  toJSON(message: Params): unknown {
    const obj: any = {}
    message.minted_denom !== undefined && (obj.minted_denom = message.minted_denom)
    return obj
  },

  fromPartial(object: DeepPartial<Params>): Params {
    const message = { ...baseParams } as Params
    if (object.minted_denom !== undefined && object.minted_denom !== null) {
      message.minted_denom = object.minted_denom
    } else {
      message.minted_denom = ''
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

const baseDistrInfo: object = { total_weight: '' }

export const DistrInfo = {
  encode(message: DistrInfo, writer: Writer = Writer.create()): Writer {
    if (message.total_weight !== '') {
      writer.uint32(10).string(message.total_weight)
    }
    for (const v of message.records) {
      DistrRecord.encode(v!, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): DistrInfo {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseDistrInfo } as DistrInfo
    message.records = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.total_weight = reader.string()
          break
        case 2:
          message.records.push(DistrRecord.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): DistrInfo {
    const message = { ...baseDistrInfo } as DistrInfo
    message.records = []
    if (object.total_weight !== undefined && object.total_weight !== null) {
      message.total_weight = String(object.total_weight)
    } else {
      message.total_weight = ''
    }
    if (object.records !== undefined && object.records !== null) {
      for (const e of object.records) {
        message.records.push(DistrRecord.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: DistrInfo): unknown {
    const obj: any = {}
    message.total_weight !== undefined && (obj.total_weight = message.total_weight)
    if (message.records) {
      obj.records = message.records.map((e) => (e ? DistrRecord.toJSON(e) : undefined))
    } else {
      obj.records = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<DistrInfo>): DistrInfo {
    const message = { ...baseDistrInfo } as DistrInfo
    message.records = []
    if (object.total_weight !== undefined && object.total_weight !== null) {
      message.total_weight = object.total_weight
    } else {
      message.total_weight = ''
    }
    if (object.records !== undefined && object.records !== null) {
      for (const e of object.records) {
        message.records.push(DistrRecord.fromPartial(e))
      }
    }
    return message
  }
}

const baseDistrRecord: object = { gauge_id: 0, weight: '' }

export const DistrRecord = {
  encode(message: DistrRecord, writer: Writer = Writer.create()): Writer {
    if (message.gauge_id !== 0) {
      writer.uint32(8).uint64(message.gauge_id)
    }
    if (message.weight !== '') {
      writer.uint32(18).string(message.weight)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): DistrRecord {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseDistrRecord } as DistrRecord
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.gauge_id = longToNumber(reader.uint64() as Long)
          break
        case 2:
          message.weight = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): DistrRecord {
    const message = { ...baseDistrRecord } as DistrRecord
    if (object.gauge_id !== undefined && object.gauge_id !== null) {
      message.gauge_id = Number(object.gauge_id)
    } else {
      message.gauge_id = 0
    }
    if (object.weight !== undefined && object.weight !== null) {
      message.weight = String(object.weight)
    } else {
      message.weight = ''
    }
    return message
  },

  toJSON(message: DistrRecord): unknown {
    const obj: any = {}
    message.gauge_id !== undefined && (obj.gauge_id = message.gauge_id)
    message.weight !== undefined && (obj.weight = message.weight)
    return obj
  },

  fromPartial(object: DeepPartial<DistrRecord>): DistrRecord {
    const message = { ...baseDistrRecord } as DistrRecord
    if (object.gauge_id !== undefined && object.gauge_id !== null) {
      message.gauge_id = object.gauge_id
    } else {
      message.gauge_id = 0
    }
    if (object.weight !== undefined && object.weight !== null) {
      message.weight = object.weight
    } else {
      message.weight = ''
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
