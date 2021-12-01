/* eslint-disable */
import * as Long from 'long'
import { util, configure, Writer, Reader } from 'protobufjs/minimal'

export const protobufPackage = 'joltify.joltifychain.vault'

export interface Params {
  blockChurnInterval: number
  power: number
  step: number
  candidateRatio: string
}

const baseParams: object = { blockChurnInterval: 0, power: 0, step: 0, candidateRatio: '' }

export const Params = {
  encode(message: Params, writer: Writer = Writer.create()): Writer {
    if (message.blockChurnInterval !== 0) {
      writer.uint32(8).int64(message.blockChurnInterval)
    }
    if (message.power !== 0) {
      writer.uint32(16).int64(message.power)
    }
    if (message.step !== 0) {
      writer.uint32(24).int64(message.step)
    }
    if (message.candidateRatio !== '') {
      writer.uint32(34).string(message.candidateRatio)
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
          message.blockChurnInterval = longToNumber(reader.int64() as Long)
          break
        case 2:
          message.power = longToNumber(reader.int64() as Long)
          break
        case 3:
          message.step = longToNumber(reader.int64() as Long)
          break
        case 4:
          message.candidateRatio = reader.string()
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
    if (object.blockChurnInterval !== undefined && object.blockChurnInterval !== null) {
      message.blockChurnInterval = Number(object.blockChurnInterval)
    } else {
      message.blockChurnInterval = 0
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
    if (object.candidateRatio !== undefined && object.candidateRatio !== null) {
      message.candidateRatio = String(object.candidateRatio)
    } else {
      message.candidateRatio = ''
    }
    return message
  },

  toJSON(message: Params): unknown {
    const obj: any = {}
    message.blockChurnInterval !== undefined && (obj.blockChurnInterval = message.blockChurnInterval)
    message.power !== undefined && (obj.power = message.power)
    message.step !== undefined && (obj.step = message.step)
    message.candidateRatio !== undefined && (obj.candidateRatio = message.candidateRatio)
    return obj
  },

  fromPartial(object: DeepPartial<Params>): Params {
    const message = { ...baseParams } as Params
    if (object.blockChurnInterval !== undefined && object.blockChurnInterval !== null) {
      message.blockChurnInterval = object.blockChurnInterval
    } else {
      message.blockChurnInterval = 0
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
    if (object.candidateRatio !== undefined && object.candidateRatio !== null) {
      message.candidateRatio = object.candidateRatio
    } else {
      message.candidateRatio = ''
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
