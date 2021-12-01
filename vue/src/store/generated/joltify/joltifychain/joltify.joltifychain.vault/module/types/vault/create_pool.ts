/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal'

export const protobufPackage = 'joltify.joltifychain.vault'

export interface PoolProposal {
  poolPubKey: string
  poolAddr: Uint8Array
  nodes: Uint8Array[]
}

export interface CreatePool {
  blockHeight: string
  validators: Uint8Array[]
  proposal: PoolProposal[]
}

const basePoolProposal: object = { poolPubKey: '' }

export const PoolProposal = {
  encode(message: PoolProposal, writer: Writer = Writer.create()): Writer {
    if (message.poolPubKey !== '') {
      writer.uint32(10).string(message.poolPubKey)
    }
    if (message.poolAddr.length !== 0) {
      writer.uint32(18).bytes(message.poolAddr)
    }
    for (const v of message.nodes) {
      writer.uint32(26).bytes(v!)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): PoolProposal {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...basePoolProposal } as PoolProposal
    message.nodes = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.poolPubKey = reader.string()
          break
        case 2:
          message.poolAddr = reader.bytes()
          break
        case 3:
          message.nodes.push(reader.bytes())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): PoolProposal {
    const message = { ...basePoolProposal } as PoolProposal
    message.nodes = []
    if (object.poolPubKey !== undefined && object.poolPubKey !== null) {
      message.poolPubKey = String(object.poolPubKey)
    } else {
      message.poolPubKey = ''
    }
    if (object.poolAddr !== undefined && object.poolAddr !== null) {
      message.poolAddr = bytesFromBase64(object.poolAddr)
    }
    if (object.nodes !== undefined && object.nodes !== null) {
      for (const e of object.nodes) {
        message.nodes.push(bytesFromBase64(e))
      }
    }
    return message
  },

  toJSON(message: PoolProposal): unknown {
    const obj: any = {}
    message.poolPubKey !== undefined && (obj.poolPubKey = message.poolPubKey)
    message.poolAddr !== undefined && (obj.poolAddr = base64FromBytes(message.poolAddr !== undefined ? message.poolAddr : new Uint8Array()))
    if (message.nodes) {
      obj.nodes = message.nodes.map((e) => base64FromBytes(e !== undefined ? e : new Uint8Array()))
    } else {
      obj.nodes = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<PoolProposal>): PoolProposal {
    const message = { ...basePoolProposal } as PoolProposal
    message.nodes = []
    if (object.poolPubKey !== undefined && object.poolPubKey !== null) {
      message.poolPubKey = object.poolPubKey
    } else {
      message.poolPubKey = ''
    }
    if (object.poolAddr !== undefined && object.poolAddr !== null) {
      message.poolAddr = object.poolAddr
    } else {
      message.poolAddr = new Uint8Array()
    }
    if (object.nodes !== undefined && object.nodes !== null) {
      for (const e of object.nodes) {
        message.nodes.push(e)
      }
    }
    return message
  }
}

const baseCreatePool: object = { blockHeight: '' }

export const CreatePool = {
  encode(message: CreatePool, writer: Writer = Writer.create()): Writer {
    if (message.blockHeight !== '') {
      writer.uint32(10).string(message.blockHeight)
    }
    for (const v of message.validators) {
      writer.uint32(18).bytes(v!)
    }
    for (const v of message.proposal) {
      PoolProposal.encode(v!, writer.uint32(26).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): CreatePool {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseCreatePool } as CreatePool
    message.validators = []
    message.proposal = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.blockHeight = reader.string()
          break
        case 2:
          message.validators.push(reader.bytes())
          break
        case 3:
          message.proposal.push(PoolProposal.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): CreatePool {
    const message = { ...baseCreatePool } as CreatePool
    message.validators = []
    message.proposal = []
    if (object.blockHeight !== undefined && object.blockHeight !== null) {
      message.blockHeight = String(object.blockHeight)
    } else {
      message.blockHeight = ''
    }
    if (object.validators !== undefined && object.validators !== null) {
      for (const e of object.validators) {
        message.validators.push(bytesFromBase64(e))
      }
    }
    if (object.proposal !== undefined && object.proposal !== null) {
      for (const e of object.proposal) {
        message.proposal.push(PoolProposal.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: CreatePool): unknown {
    const obj: any = {}
    message.blockHeight !== undefined && (obj.blockHeight = message.blockHeight)
    if (message.validators) {
      obj.validators = message.validators.map((e) => base64FromBytes(e !== undefined ? e : new Uint8Array()))
    } else {
      obj.validators = []
    }
    if (message.proposal) {
      obj.proposal = message.proposal.map((e) => (e ? PoolProposal.toJSON(e) : undefined))
    } else {
      obj.proposal = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<CreatePool>): CreatePool {
    const message = { ...baseCreatePool } as CreatePool
    message.validators = []
    message.proposal = []
    if (object.blockHeight !== undefined && object.blockHeight !== null) {
      message.blockHeight = object.blockHeight
    } else {
      message.blockHeight = ''
    }
    if (object.validators !== undefined && object.validators !== null) {
      for (const e of object.validators) {
        message.validators.push(e)
      }
    }
    if (object.proposal !== undefined && object.proposal !== null) {
      for (const e of object.proposal) {
        message.proposal.push(PoolProposal.fromPartial(e))
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
