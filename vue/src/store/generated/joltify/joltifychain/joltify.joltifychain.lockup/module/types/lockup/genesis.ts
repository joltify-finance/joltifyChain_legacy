/* eslint-disable */
import * as Long from 'long'
import { util, configure, Writer, Reader } from 'protobufjs/minimal'
import { PeriodLock, SyntheticLock } from '../lockup/lock'

export const protobufPackage = 'joltify.joltifychain.lockup'

/** GenesisState defines the lockup module's genesis state. */
export interface GenesisState {
  last_lock_id: number
  locks: PeriodLock[]
  synthetic_locks: SyntheticLock[]
}

const baseGenesisState: object = { last_lock_id: 0 }

export const GenesisState = {
  encode(message: GenesisState, writer: Writer = Writer.create()): Writer {
    if (message.last_lock_id !== 0) {
      writer.uint32(8).uint64(message.last_lock_id)
    }
    for (const v of message.locks) {
      PeriodLock.encode(v!, writer.uint32(18).fork()).ldelim()
    }
    for (const v of message.synthetic_locks) {
      SyntheticLock.encode(v!, writer.uint32(26).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseGenesisState } as GenesisState
    message.locks = []
    message.synthetic_locks = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.last_lock_id = longToNumber(reader.uint64() as Long)
          break
        case 2:
          message.locks.push(PeriodLock.decode(reader, reader.uint32()))
          break
        case 3:
          message.synthetic_locks.push(SyntheticLock.decode(reader, reader.uint32()))
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
    message.locks = []
    message.synthetic_locks = []
    if (object.last_lock_id !== undefined && object.last_lock_id !== null) {
      message.last_lock_id = Number(object.last_lock_id)
    } else {
      message.last_lock_id = 0
    }
    if (object.locks !== undefined && object.locks !== null) {
      for (const e of object.locks) {
        message.locks.push(PeriodLock.fromJSON(e))
      }
    }
    if (object.synthetic_locks !== undefined && object.synthetic_locks !== null) {
      for (const e of object.synthetic_locks) {
        message.synthetic_locks.push(SyntheticLock.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {}
    message.last_lock_id !== undefined && (obj.last_lock_id = message.last_lock_id)
    if (message.locks) {
      obj.locks = message.locks.map((e) => (e ? PeriodLock.toJSON(e) : undefined))
    } else {
      obj.locks = []
    }
    if (message.synthetic_locks) {
      obj.synthetic_locks = message.synthetic_locks.map((e) => (e ? SyntheticLock.toJSON(e) : undefined))
    } else {
      obj.synthetic_locks = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState
    message.locks = []
    message.synthetic_locks = []
    if (object.last_lock_id !== undefined && object.last_lock_id !== null) {
      message.last_lock_id = object.last_lock_id
    } else {
      message.last_lock_id = 0
    }
    if (object.locks !== undefined && object.locks !== null) {
      for (const e of object.locks) {
        message.locks.push(PeriodLock.fromPartial(e))
      }
    }
    if (object.synthetic_locks !== undefined && object.synthetic_locks !== null) {
      for (const e of object.synthetic_locks) {
        message.synthetic_locks.push(SyntheticLock.fromPartial(e))
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
