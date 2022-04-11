/* eslint-disable */
import * as Long from 'long'
import { util, configure, Writer, Reader } from 'protobufjs/minimal'

export const protobufPackage = 'joltify.joltifychain.vault'

export interface Params {
  block_churn_interval: number
  power: number
  step: number
  candidate_ratio: string
}

const baseParams: object = { block_churn_interval: 0, power: 0, step: 0, candidate_ratio: '' }

export const Params = {
  encode(message: Params, writer: Writer = Writer.create()): Writer {
    if (message.block_churn_interval !== 0) {
      writer.uint32(8).int64(message.block_churn_interval)
    }
    if (message.power !== 0) {
      writer.uint32(16).int64(message.power)
    }
    if (message.step !== 0) {
      writer.uint32(24).int64(message.step)
    }
    if (message.candidate_ratio !== '') {
      writer.uint32(34).string(message.candidate_ratio)
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
          message.block_churn_interval = longToNumber(reader.int64() as Long)
          break
        case 2:
          message.power = longToNumber(reader.int64() as Long)
          break
        case 3:
          message.step = longToNumber(reader.int64() as Long)
          break
        case 4:
          message.candidate_ratio = reader.string()
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
    if (object.block_churn_interval !== undefined && object.block_churn_interval !== null) {
      message.block_churn_interval = Number(object.block_churn_interval)
    } else {
      message.block_churn_interval = 0
    }
    if (object.power !== undefined && object.power !== null) {
      message.power = Number(object.power)
    } else {
      message.power = 0
    }
    if (object.step !== undefined && object.step !== null) {
      message.step = Number(object.step)
    } else {
      message.step = 0
    }
    if (object.candidate_ratio !== undefined && object.candidate_ratio !== null) {
      message.candidate_ratio = String(object.candidate_ratio)
    } else {
      message.candidate_ratio = ''
    }
    return message
  },

  toJSON(message: Params): unknown {
    const obj: any = {}
    message.block_churn_interval !== undefined && (obj.block_churn_interval = message.block_churn_interval)
    message.power !== undefined && (obj.power = message.power)
    message.step !== undefined && (obj.step = message.step)
    message.candidate_ratio !== undefined && (obj.candidate_ratio = message.candidate_ratio)
    return obj
  },

  fromPartial(object: DeepPartial<Params>): Params {
    const message = { ...baseParams } as Params
    if (object.block_churn_interval !== undefined && object.block_churn_interval !== null) {
      message.block_churn_interval = object.block_churn_interval
    } else {
      message.block_churn_interval = 0
    }
    if (object.power !== undefined && object.power !== null) {
      message.power = object.power
    } else {
      message.power = 0
    }
    if (object.step !== undefined && object.step !== null) {
      message.step = object.step
    } else {
      message.step = 0
    }
    if (object.candidate_ratio !== undefined && object.candidate_ratio !== null) {
      message.candidate_ratio = object.candidate_ratio
    } else {
      message.candidate_ratio = ''
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
