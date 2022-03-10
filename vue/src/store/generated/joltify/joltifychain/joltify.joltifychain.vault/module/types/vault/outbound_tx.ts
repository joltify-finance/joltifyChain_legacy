/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal'

export const protobufPackage = 'joltify.joltifychain.vault'

export interface address {
  address: Uint8Array[]
}

export interface OutboundTx {
  index: string
  items: { [key: string]: address }
}

export interface OutboundTx_ItemsEntry {
  key: string
  value: address | undefined
}

const baseaddress: object = {}

export const address = {
  encode(message: address, writer: Writer = Writer.create()): Writer {
    for (const v of message.address) {
      writer.uint32(10).bytes(v!)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): address {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseaddress } as address
    message.address = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.address.push(reader.bytes())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): address {
    const message = { ...baseaddress } as address
    message.address = []
    if (object.address !== undefined && object.address !== null) {
      for (const e of object.address) {
        message.address.push(bytesFromBase64(e))
      }
    }
    return message
  },

  toJSON(message: address): unknown {
    const obj: any = {}
    if (message.address) {
      obj.address = message.address.map((e) => base64FromBytes(e !== undefined ? e : new Uint8Array()))
    } else {
      obj.address = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<address>): address {
    const message = { ...baseaddress } as address
    message.address = []
    if (object.address !== undefined && object.address !== null) {
      for (const e of object.address) {
        message.address.push(e)
      }
    }
    return message
  }
}

const baseOutboundTx: object = { index: '' }

export const OutboundTx = {
  encode(message: OutboundTx, writer: Writer = Writer.create()): Writer {
    if (message.index !== '') {
      writer.uint32(10).string(message.index)
    }
    Object.entries(message.items).forEach(([key, value]) => {
      OutboundTx_ItemsEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim()
    })
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): OutboundTx {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseOutboundTx } as OutboundTx
    message.items = {}
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string()
          break
        case 2:
          const entry2 = OutboundTx_ItemsEntry.decode(reader, reader.uint32())
          if (entry2.value !== undefined) {
            message.items[entry2.key] = entry2.value
          }
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): OutboundTx {
    const message = { ...baseOutboundTx } as OutboundTx
    message.items = {}
    if (object.index !== undefined && object.index !== null) {
      message.index = String(object.index)
    } else {
      message.index = ''
    }
    if (object.items !== undefined && object.items !== null) {
      Object.entries(object.items).forEach(([key, value]) => {
        message.items[key] = address.fromJSON(value)
      })
    }
    return message
  },

  toJSON(message: OutboundTx): unknown {
    const obj: any = {}
    message.index !== undefined && (obj.index = message.index)
    obj.items = {}
    if (message.items) {
      Object.entries(message.items).forEach(([k, v]) => {
        obj.items[k] = address.toJSON(v)
      })
    }
    return obj
  },

  fromPartial(object: DeepPartial<OutboundTx>): OutboundTx {
    const message = { ...baseOutboundTx } as OutboundTx
    message.items = {}
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index
    } else {
      message.index = ''
    }
    if (object.items !== undefined && object.items !== null) {
      Object.entries(object.items).forEach(([key, value]) => {
        if (value !== undefined) {
          message.items[key] = address.fromPartial(value)
        }
      })
    }
    return message
  }
}

const baseOutboundTx_ItemsEntry: object = { key: '' }

export const OutboundTx_ItemsEntry = {
  encode(message: OutboundTx_ItemsEntry, writer: Writer = Writer.create()): Writer {
    if (message.key !== '') {
      writer.uint32(10).string(message.key)
    }
    if (message.value !== undefined) {
      address.encode(message.value, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): OutboundTx_ItemsEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseOutboundTx_ItemsEntry } as OutboundTx_ItemsEntry
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string()
          break
        case 2:
          message.value = address.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): OutboundTx_ItemsEntry {
    const message = { ...baseOutboundTx_ItemsEntry } as OutboundTx_ItemsEntry
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key)
    } else {
      message.key = ''
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = address.fromJSON(object.value)
    } else {
      message.value = undefined
    }
    return message
  },

  toJSON(message: OutboundTx_ItemsEntry): unknown {
    const obj: any = {}
    message.key !== undefined && (obj.key = message.key)
    message.value !== undefined && (obj.value = message.value ? address.toJSON(message.value) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<OutboundTx_ItemsEntry>): OutboundTx_ItemsEntry {
    const message = { ...baseOutboundTx_ItemsEntry } as OutboundTx_ItemsEntry
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key
    } else {
      message.key = ''
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = address.fromPartial(object.value)
    } else {
      message.value = undefined
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
