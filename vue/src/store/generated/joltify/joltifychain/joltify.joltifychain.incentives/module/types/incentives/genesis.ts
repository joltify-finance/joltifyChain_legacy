/* eslint-disable */
import * as Long from 'long'
import { util, configure, Writer, Reader } from 'protobufjs/minimal'
import { Params } from '../incentives/params'
import { Gauge } from '../incentives/gauge'
import { Duration } from '../google/protobuf/duration'

export const protobufPackage = 'joltify.joltifychain.incentives'

/** GenesisState defines the incentives module's genesis state. */
export interface GenesisState {
  /** params defines all the parameters of the module */
  params: Params | undefined
  gauges: Gauge[]
  lockable_durations: Duration[]
  last_gauge_id: number
}

const baseGenesisState: object = { last_gauge_id: 0 }

export const GenesisState = {
  encode(message: GenesisState, writer: Writer = Writer.create()): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim()
    }
    for (const v of message.gauges) {
      Gauge.encode(v!, writer.uint32(18).fork()).ldelim()
    }
    for (const v of message.lockable_durations) {
      Duration.encode(v!, writer.uint32(26).fork()).ldelim()
    }
    if (message.last_gauge_id !== 0) {
      writer.uint32(32).uint64(message.last_gauge_id)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseGenesisState } as GenesisState
    message.gauges = []
    message.lockable_durations = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32())
          break
        case 2:
          message.gauges.push(Gauge.decode(reader, reader.uint32()))
          break
        case 3:
          message.lockable_durations.push(Duration.decode(reader, reader.uint32()))
          break
        case 4:
          message.last_gauge_id = longToNumber(reader.uint64() as Long)
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
    message.gauges = []
    message.lockable_durations = []
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params)
    } else {
      message.params = undefined
    }
    if (object.gauges !== undefined && object.gauges !== null) {
      for (const e of object.gauges) {
        message.gauges.push(Gauge.fromJSON(e))
      }
    }
    if (object.lockable_durations !== undefined && object.lockable_durations !== null) {
      for (const e of object.lockable_durations) {
        message.lockable_durations.push(Duration.fromJSON(e))
      }
    }
    if (object.last_gauge_id !== undefined && object.last_gauge_id !== null) {
      message.last_gauge_id = Number(object.last_gauge_id)
    } else {
      message.last_gauge_id = 0
    }
    return message
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {}
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined)
    if (message.gauges) {
      obj.gauges = message.gauges.map((e) => (e ? Gauge.toJSON(e) : undefined))
    } else {
      obj.gauges = []
    }
    if (message.lockable_durations) {
      obj.lockable_durations = message.lockable_durations.map((e) => (e ? Duration.toJSON(e) : undefined))
    } else {
      obj.lockable_durations = []
    }
    message.last_gauge_id !== undefined && (obj.last_gauge_id = message.last_gauge_id)
    return obj
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState
    message.gauges = []
    message.lockable_durations = []
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params)
    } else {
      message.params = undefined
    }
    if (object.gauges !== undefined && object.gauges !== null) {
      for (const e of object.gauges) {
        message.gauges.push(Gauge.fromPartial(e))
      }
    }
    if (object.lockable_durations !== undefined && object.lockable_durations !== null) {
      for (const e of object.lockable_durations) {
        message.lockable_durations.push(Duration.fromPartial(e))
      }
    }
    if (object.last_gauge_id !== undefined && object.last_gauge_id !== null) {
      message.last_gauge_id = object.last_gauge_id
    } else {
      message.last_gauge_id = 0
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
