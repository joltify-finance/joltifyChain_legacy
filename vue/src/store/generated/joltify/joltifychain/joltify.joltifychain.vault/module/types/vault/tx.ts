/* eslint-disable */
import { Reader, Writer } from 'protobufjs/minimal'

export const protobufPackage = 'joltify.joltifychain.vault'

export interface MsgCreateOutboundTx {
  creator: Uint8Array
  requestID: string
  outboundTx: string
  blockHeight: string
}

export interface MsgCreateOutboundTxResponse {
  successful: boolean
}

/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgCreateIssueToken {
  creator: Uint8Array
  index: string
  coin: Uint8Array
  receiver: Uint8Array
}

export interface MsgCreateIssueTokenResponse {
  successful: boolean
}

export interface MsgCreateCreatePool {
  creator: Uint8Array
  poolPubKey: string
  blockHeight: string
}

export interface MsgCreateCreatePoolResponse {
  successful: boolean
}

const baseMsgCreateOutboundTx: object = { requestID: '', outboundTx: '', blockHeight: '' }

export const MsgCreateOutboundTx = {
  encode(message: MsgCreateOutboundTx, writer: Writer = Writer.create()): Writer {
    if (message.creator.length !== 0) {
      writer.uint32(10).bytes(message.creator)
    }
    if (message.requestID !== '') {
      writer.uint32(18).string(message.requestID)
    }
    if (message.outboundTx !== '') {
      writer.uint32(26).string(message.outboundTx)
    }
    if (message.blockHeight !== '') {
      writer.uint32(34).string(message.blockHeight)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateOutboundTx {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgCreateOutboundTx } as MsgCreateOutboundTx
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.bytes()
          break
        case 2:
          message.requestID = reader.string()
          break
        case 3:
          message.outboundTx = reader.string()
          break
        case 4:
          message.blockHeight = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgCreateOutboundTx {
    const message = { ...baseMsgCreateOutboundTx } as MsgCreateOutboundTx
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = bytesFromBase64(object.creator)
    }
    if (object.requestID !== undefined && object.requestID !== null) {
      message.requestID = String(object.requestID)
    } else {
      message.requestID = ''
    }
    if (object.outboundTx !== undefined && object.outboundTx !== null) {
      message.outboundTx = String(object.outboundTx)
    } else {
      message.outboundTx = ''
    }
    if (object.blockHeight !== undefined && object.blockHeight !== null) {
      message.blockHeight = String(object.blockHeight)
    } else {
      message.blockHeight = ''
    }
    return message
  },

  toJSON(message: MsgCreateOutboundTx): unknown {
    const obj: any = {}
    message.creator !== undefined && (obj.creator = base64FromBytes(message.creator !== undefined ? message.creator : new Uint8Array()))
    message.requestID !== undefined && (obj.requestID = message.requestID)
    message.outboundTx !== undefined && (obj.outboundTx = message.outboundTx)
    message.blockHeight !== undefined && (obj.blockHeight = message.blockHeight)
    return obj
  },

  fromPartial(object: DeepPartial<MsgCreateOutboundTx>): MsgCreateOutboundTx {
    const message = { ...baseMsgCreateOutboundTx } as MsgCreateOutboundTx
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = new Uint8Array()
    }
    if (object.requestID !== undefined && object.requestID !== null) {
      message.requestID = object.requestID
    } else {
      message.requestID = ''
    }
    if (object.outboundTx !== undefined && object.outboundTx !== null) {
      message.outboundTx = object.outboundTx
    } else {
      message.outboundTx = ''
    }
    if (object.blockHeight !== undefined && object.blockHeight !== null) {
      message.blockHeight = object.blockHeight
    } else {
      message.blockHeight = ''
    }
    return message
  }
}

const baseMsgCreateOutboundTxResponse: object = { successful: false }

export const MsgCreateOutboundTxResponse = {
  encode(message: MsgCreateOutboundTxResponse, writer: Writer = Writer.create()): Writer {
    if (message.successful === true) {
      writer.uint32(8).bool(message.successful)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateOutboundTxResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgCreateOutboundTxResponse } as MsgCreateOutboundTxResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.successful = reader.bool()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgCreateOutboundTxResponse {
    const message = { ...baseMsgCreateOutboundTxResponse } as MsgCreateOutboundTxResponse
    if (object.successful !== undefined && object.successful !== null) {
      message.successful = Boolean(object.successful)
    } else {
      message.successful = false
    }
    return message
  },

  toJSON(message: MsgCreateOutboundTxResponse): unknown {
    const obj: any = {}
    message.successful !== undefined && (obj.successful = message.successful)
    return obj
  },

  fromPartial(object: DeepPartial<MsgCreateOutboundTxResponse>): MsgCreateOutboundTxResponse {
    const message = { ...baseMsgCreateOutboundTxResponse } as MsgCreateOutboundTxResponse
    if (object.successful !== undefined && object.successful !== null) {
      message.successful = object.successful
    } else {
      message.successful = false
    }
    return message
  }
}

const baseMsgCreateIssueToken: object = { index: '' }

export const MsgCreateIssueToken = {
  encode(message: MsgCreateIssueToken, writer: Writer = Writer.create()): Writer {
    if (message.creator.length !== 0) {
      writer.uint32(10).bytes(message.creator)
    }
    if (message.index !== '') {
      writer.uint32(18).string(message.index)
    }
    if (message.coin.length !== 0) {
      writer.uint32(26).bytes(message.coin)
    }
    if (message.receiver.length !== 0) {
      writer.uint32(34).bytes(message.receiver)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateIssueToken {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgCreateIssueToken } as MsgCreateIssueToken
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.bytes()
          break
        case 2:
          message.index = reader.string()
          break
        case 3:
          message.coin = reader.bytes()
          break
        case 4:
          message.receiver = reader.bytes()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgCreateIssueToken {
    const message = { ...baseMsgCreateIssueToken } as MsgCreateIssueToken
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = bytesFromBase64(object.creator)
    }
    if (object.index !== undefined && object.index !== null) {
      message.index = String(object.index)
    } else {
      message.index = ''
    }
    if (object.coin !== undefined && object.coin !== null) {
      message.coin = bytesFromBase64(object.coin)
    }
    if (object.receiver !== undefined && object.receiver !== null) {
      message.receiver = bytesFromBase64(object.receiver)
    }
    return message
  },

  toJSON(message: MsgCreateIssueToken): unknown {
    const obj: any = {}
    message.creator !== undefined && (obj.creator = base64FromBytes(message.creator !== undefined ? message.creator : new Uint8Array()))
    message.index !== undefined && (obj.index = message.index)
    message.coin !== undefined && (obj.coin = base64FromBytes(message.coin !== undefined ? message.coin : new Uint8Array()))
    message.receiver !== undefined && (obj.receiver = base64FromBytes(message.receiver !== undefined ? message.receiver : new Uint8Array()))
    return obj
  },

  fromPartial(object: DeepPartial<MsgCreateIssueToken>): MsgCreateIssueToken {
    const message = { ...baseMsgCreateIssueToken } as MsgCreateIssueToken
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = new Uint8Array()
    }
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index
    } else {
      message.index = ''
    }
    if (object.coin !== undefined && object.coin !== null) {
      message.coin = object.coin
    } else {
      message.coin = new Uint8Array()
    }
    if (object.receiver !== undefined && object.receiver !== null) {
      message.receiver = object.receiver
    } else {
      message.receiver = new Uint8Array()
    }
    return message
  }
}

const baseMsgCreateIssueTokenResponse: object = { successful: false }

export const MsgCreateIssueTokenResponse = {
  encode(message: MsgCreateIssueTokenResponse, writer: Writer = Writer.create()): Writer {
    if (message.successful === true) {
      writer.uint32(8).bool(message.successful)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateIssueTokenResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgCreateIssueTokenResponse } as MsgCreateIssueTokenResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.successful = reader.bool()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgCreateIssueTokenResponse {
    const message = { ...baseMsgCreateIssueTokenResponse } as MsgCreateIssueTokenResponse
    if (object.successful !== undefined && object.successful !== null) {
      message.successful = Boolean(object.successful)
    } else {
      message.successful = false
    }
    return message
  },

  toJSON(message: MsgCreateIssueTokenResponse): unknown {
    const obj: any = {}
    message.successful !== undefined && (obj.successful = message.successful)
    return obj
  },

  fromPartial(object: DeepPartial<MsgCreateIssueTokenResponse>): MsgCreateIssueTokenResponse {
    const message = { ...baseMsgCreateIssueTokenResponse } as MsgCreateIssueTokenResponse
    if (object.successful !== undefined && object.successful !== null) {
      message.successful = object.successful
    } else {
      message.successful = false
    }
    return message
  }
}

const baseMsgCreateCreatePool: object = { poolPubKey: '', blockHeight: '' }

export const MsgCreateCreatePool = {
  encode(message: MsgCreateCreatePool, writer: Writer = Writer.create()): Writer {
    if (message.creator.length !== 0) {
      writer.uint32(10).bytes(message.creator)
    }
    if (message.poolPubKey !== '') {
      writer.uint32(18).string(message.poolPubKey)
    }
    if (message.blockHeight !== '') {
      writer.uint32(26).string(message.blockHeight)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateCreatePool {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgCreateCreatePool } as MsgCreateCreatePool
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.bytes()
          break
        case 2:
          message.poolPubKey = reader.string()
          break
        case 3:
          message.blockHeight = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgCreateCreatePool {
    const message = { ...baseMsgCreateCreatePool } as MsgCreateCreatePool
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = bytesFromBase64(object.creator)
    }
    if (object.poolPubKey !== undefined && object.poolPubKey !== null) {
      message.poolPubKey = String(object.poolPubKey)
    } else {
      message.poolPubKey = ''
    }
    if (object.blockHeight !== undefined && object.blockHeight !== null) {
      message.blockHeight = String(object.blockHeight)
    } else {
      message.blockHeight = ''
    }
    return message
  },

  toJSON(message: MsgCreateCreatePool): unknown {
    const obj: any = {}
    message.creator !== undefined && (obj.creator = base64FromBytes(message.creator !== undefined ? message.creator : new Uint8Array()))
    message.poolPubKey !== undefined && (obj.poolPubKey = message.poolPubKey)
    message.blockHeight !== undefined && (obj.blockHeight = message.blockHeight)
    return obj
  },

  fromPartial(object: DeepPartial<MsgCreateCreatePool>): MsgCreateCreatePool {
    const message = { ...baseMsgCreateCreatePool } as MsgCreateCreatePool
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = new Uint8Array()
    }
    if (object.poolPubKey !== undefined && object.poolPubKey !== null) {
      message.poolPubKey = object.poolPubKey
    } else {
      message.poolPubKey = ''
    }
    if (object.blockHeight !== undefined && object.blockHeight !== null) {
      message.blockHeight = object.blockHeight
    } else {
      message.blockHeight = ''
    }
    return message
  }
}

const baseMsgCreateCreatePoolResponse: object = { successful: false }

export const MsgCreateCreatePoolResponse = {
  encode(message: MsgCreateCreatePoolResponse, writer: Writer = Writer.create()): Writer {
    if (message.successful === true) {
      writer.uint32(8).bool(message.successful)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateCreatePoolResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgCreateCreatePoolResponse } as MsgCreateCreatePoolResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.successful = reader.bool()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgCreateCreatePoolResponse {
    const message = { ...baseMsgCreateCreatePoolResponse } as MsgCreateCreatePoolResponse
    if (object.successful !== undefined && object.successful !== null) {
      message.successful = Boolean(object.successful)
    } else {
      message.successful = false
    }
    return message
  },

  toJSON(message: MsgCreateCreatePoolResponse): unknown {
    const obj: any = {}
    message.successful !== undefined && (obj.successful = message.successful)
    return obj
  },

  fromPartial(object: DeepPartial<MsgCreateCreatePoolResponse>): MsgCreateCreatePoolResponse {
    const message = { ...baseMsgCreateCreatePoolResponse } as MsgCreateCreatePoolResponse
    if (object.successful !== undefined && object.successful !== null) {
      message.successful = object.successful
    } else {
      message.successful = false
    }
    return message
  }
}

/** Msg defines the Msg service. */
export interface Msg {
  CreateOutboundTx(request: MsgCreateOutboundTx): Promise<MsgCreateOutboundTxResponse>
  /** this line is used by starport scaffolding # proto/tx/rpc */
  CreateIssueToken(request: MsgCreateIssueToken): Promise<MsgCreateIssueTokenResponse>
  CreateCreatePool(request: MsgCreateCreatePool): Promise<MsgCreateCreatePoolResponse>
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
  }
  CreateOutboundTx(request: MsgCreateOutboundTx): Promise<MsgCreateOutboundTxResponse> {
    const data = MsgCreateOutboundTx.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.vault.Msg', 'CreateOutboundTx', data)
    return promise.then((data) => MsgCreateOutboundTxResponse.decode(new Reader(data)))
  }

  CreateIssueToken(request: MsgCreateIssueToken): Promise<MsgCreateIssueTokenResponse> {
    const data = MsgCreateIssueToken.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.vault.Msg', 'CreateIssueToken', data)
    return promise.then((data) => MsgCreateIssueTokenResponse.decode(new Reader(data)))
  }

  CreateCreatePool(request: MsgCreateCreatePool): Promise<MsgCreateCreatePoolResponse> {
    const data = MsgCreateCreatePool.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.vault.Msg', 'CreateCreatePool', data)
    return promise.then((data) => MsgCreateCreatePoolResponse.decode(new Reader(data)))
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>
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
