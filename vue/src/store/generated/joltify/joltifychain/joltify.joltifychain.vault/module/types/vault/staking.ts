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

export interface Validator {
  pubkey: Uint8Array
  power: number
}

export interface Validators {
  all_validators: Validator[]
  height: number
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

const baseValidator: object = { power: 0 }

export const Validator = {
  encode(message: Validator, writer: Writer = Writer.create()): Writer {
    if (message.pubkey.length !== 0) {
      writer.uint32(10).bytes(message.pubkey)
    }
    if (message.power !== 0) {
      writer.uint32(16).int64(message.power)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): Validator {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseValidator } as Validator
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.pubkey = reader.bytes()
          break
        case 2:
          message.power = longToNumber(reader.int64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): Validator {
    const message = { ...baseValidator } as Validator
    if (object.pubkey !== undefined && object.pubkey !== null) {
      message.pubkey = bytesFromBase64(object.pubkey)
    }
    if (object.power !== undefined && object.power !== null) {
      message.power = Number(object.power)
    } else {
      message.power = 0
    }
    return message
  },

  toJSON(message: Validator): unknown {
    const obj: any = {}
    message.pubkey !== undefined && (obj.pubkey = base64FromBytes(message.pubkey !== undefined ? message.pubkey : new Uint8Array()))
    message.power !== undefined && (obj.power = message.power)
    return obj
  },

  fromPartial(object: DeepPartial<Validator>): Validator {
    const message = { ...baseValidator } as Validator
    if (object.pubkey !== undefined && object.pubkey !== null) {
      message.pubkey = object.pubkey
    } else {
      message.pubkey = new Uint8Array()
    }
    if (object.power !== undefined && object.power !== null) {
      message.power = object.power
    } else {
      message.power = 0
    }
    return message
  }
}

const baseValidators: object = { height: 0 }

export const Validators = {
  encode(message: Validators, writer: Writer = Writer.create()): Writer {
    for (const v of message.all_validators) {
      Validator.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    if (message.height !== 0) {
      writer.uint32(16).int64(message.height)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): Validators {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseValidators } as Validators
    message.all_validators = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.all_validators.push(Validator.decode(reader, reader.uint32()))
          break
        case 2:
          message.height = longToNumber(reader.int64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): Validators {
    const message = { ...baseValidators } as Validators
    message.all_validators = []
    if (object.all_validators !== undefined && object.all_validators !== null) {
      for (const e of object.all_validators) {
        message.all_validators.push(Validator.fromJSON(e))
      }
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = Number(object.height)
    } else {
      message.height = 0
    }
    return message
  },

  toJSON(message: Validators): unknown {
    const obj: any = {}
    if (message.all_validators) {
      obj.all_validators = message.all_validators.map((e) => (e ? Validator.toJSON(e) : undefined))
    } else {
      obj.all_validators = []
    }
    message.height !== undefined && (obj.height = message.height)
    return obj
  },

  fromPartial(object: DeepPartial<Validators>): Validators {
    const message = { ...baseValidators } as Validators
    message.all_validators = []
    if (object.all_validators !== undefined && object.all_validators !== null) {
      for (const e of object.all_validators) {
        message.all_validators.push(Validator.fromPartial(e))
      }
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = object.height
    } else {
      message.height = 0
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

const atob: (b64: string) => string = globalThis.atob || ((b64) => globalThis.Buffer.from(b64, 'base64').toString('binary'))
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64)
  const arr = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i)
  }
  return arr
}

const btoa: (bin: string) => string = globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, 'binary').toString('base64'))
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = []
  for (let i = 0; i < arr.byteLength; ++i) {
    bin.push(String.fromCharCode(arr[i]))
  }
  return btoa(bin.join(''))
}

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
