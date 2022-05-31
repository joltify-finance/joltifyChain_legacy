/* eslint-disable */
import { Reader, util, configure, Writer } from 'protobufjs/minimal'
import * as Long from 'long'
import { Duration } from '../google/protobuf/duration'
import { Coin } from '../cosmos/base/v1beta1/coin'
import { PeriodLock } from '../lockup/lock'

export const protobufPackage = 'joltify.joltifychain.lockup'

export interface MsgLockTokens {
  owner: string
  duration: Duration | undefined
  coins: Coin[]
}

export interface MsgLockTokensResponse {
  ID: number
}

export interface MsgBeginUnlockingAll {
  owner: string
}

export interface MsgBeginUnlockingAllResponse {
  unlocks: PeriodLock[]
}

export interface MsgBeginUnlocking {
  owner: string
  ID: number
  /** Amount of unlocking coins. Unlock all if not set. */
  coins: Coin[]
}

export interface MsgBeginUnlockingResponse {
  success: boolean
}

const baseMsgLockTokens: object = { owner: '' }

export const MsgLockTokens = {
  encode(message: MsgLockTokens, writer: Writer = Writer.create()): Writer {
    if (message.owner !== '') {
      writer.uint32(10).string(message.owner)
    }
    if (message.duration !== undefined) {
      Duration.encode(message.duration, writer.uint32(18).fork()).ldelim()
    }
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgLockTokens {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgLockTokens } as MsgLockTokens
    message.coins = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string()
          break
        case 2:
          message.duration = Duration.decode(reader, reader.uint32())
          break
        case 3:
          message.coins.push(Coin.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgLockTokens {
    const message = { ...baseMsgLockTokens } as MsgLockTokens
    message.coins = []
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
    if (object.coins !== undefined && object.coins !== null) {
      for (const e of object.coins) {
        message.coins.push(Coin.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: MsgLockTokens): unknown {
    const obj: any = {}
    message.owner !== undefined && (obj.owner = message.owner)
    message.duration !== undefined && (obj.duration = message.duration ? Duration.toJSON(message.duration) : undefined)
    if (message.coins) {
      obj.coins = message.coins.map((e) => (e ? Coin.toJSON(e) : undefined))
    } else {
      obj.coins = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<MsgLockTokens>): MsgLockTokens {
    const message = { ...baseMsgLockTokens } as MsgLockTokens
    message.coins = []
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
    if (object.coins !== undefined && object.coins !== null) {
      for (const e of object.coins) {
        message.coins.push(Coin.fromPartial(e))
      }
    }
    return message
  }
}

const baseMsgLockTokensResponse: object = { ID: 0 }

export const MsgLockTokensResponse = {
  encode(message: MsgLockTokensResponse, writer: Writer = Writer.create()): Writer {
    if (message.ID !== 0) {
      writer.uint32(8).uint64(message.ID)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgLockTokensResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgLockTokensResponse } as MsgLockTokensResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.ID = longToNumber(reader.uint64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgLockTokensResponse {
    const message = { ...baseMsgLockTokensResponse } as MsgLockTokensResponse
    if (object.ID !== undefined && object.ID !== null) {
      message.ID = Number(object.ID)
    } else {
      message.ID = 0
    }
    return message
  },

  toJSON(message: MsgLockTokensResponse): unknown {
    const obj: any = {}
    message.ID !== undefined && (obj.ID = message.ID)
    return obj
  },

  fromPartial(object: DeepPartial<MsgLockTokensResponse>): MsgLockTokensResponse {
    const message = { ...baseMsgLockTokensResponse } as MsgLockTokensResponse
    if (object.ID !== undefined && object.ID !== null) {
      message.ID = object.ID
    } else {
      message.ID = 0
    }
    return message
  }
}

const baseMsgBeginUnlockingAll: object = { owner: '' }

export const MsgBeginUnlockingAll = {
  encode(message: MsgBeginUnlockingAll, writer: Writer = Writer.create()): Writer {
    if (message.owner !== '') {
      writer.uint32(10).string(message.owner)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgBeginUnlockingAll {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgBeginUnlockingAll } as MsgBeginUnlockingAll
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgBeginUnlockingAll {
    const message = { ...baseMsgBeginUnlockingAll } as MsgBeginUnlockingAll
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner)
    } else {
      message.owner = ''
    }
    return message
  },

  toJSON(message: MsgBeginUnlockingAll): unknown {
    const obj: any = {}
    message.owner !== undefined && (obj.owner = message.owner)
    return obj
  },

  fromPartial(object: DeepPartial<MsgBeginUnlockingAll>): MsgBeginUnlockingAll {
    const message = { ...baseMsgBeginUnlockingAll } as MsgBeginUnlockingAll
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner
    } else {
      message.owner = ''
    }
    return message
  }
}

const baseMsgBeginUnlockingAllResponse: object = {}

export const MsgBeginUnlockingAllResponse = {
  encode(message: MsgBeginUnlockingAllResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.unlocks) {
      PeriodLock.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgBeginUnlockingAllResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgBeginUnlockingAllResponse } as MsgBeginUnlockingAllResponse
    message.unlocks = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.unlocks.push(PeriodLock.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgBeginUnlockingAllResponse {
    const message = { ...baseMsgBeginUnlockingAllResponse } as MsgBeginUnlockingAllResponse
    message.unlocks = []
    if (object.unlocks !== undefined && object.unlocks !== null) {
      for (const e of object.unlocks) {
        message.unlocks.push(PeriodLock.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: MsgBeginUnlockingAllResponse): unknown {
    const obj: any = {}
    if (message.unlocks) {
      obj.unlocks = message.unlocks.map((e) => (e ? PeriodLock.toJSON(e) : undefined))
    } else {
      obj.unlocks = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<MsgBeginUnlockingAllResponse>): MsgBeginUnlockingAllResponse {
    const message = { ...baseMsgBeginUnlockingAllResponse } as MsgBeginUnlockingAllResponse
    message.unlocks = []
    if (object.unlocks !== undefined && object.unlocks !== null) {
      for (const e of object.unlocks) {
        message.unlocks.push(PeriodLock.fromPartial(e))
      }
    }
    return message
  }
}

const baseMsgBeginUnlocking: object = { owner: '', ID: 0 }

export const MsgBeginUnlocking = {
  encode(message: MsgBeginUnlocking, writer: Writer = Writer.create()): Writer {
    if (message.owner !== '') {
      writer.uint32(10).string(message.owner)
    }
    if (message.ID !== 0) {
      writer.uint32(16).uint64(message.ID)
    }
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgBeginUnlocking {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgBeginUnlocking } as MsgBeginUnlocking
    message.coins = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string()
          break
        case 2:
          message.ID = longToNumber(reader.uint64() as Long)
          break
        case 3:
          message.coins.push(Coin.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgBeginUnlocking {
    const message = { ...baseMsgBeginUnlocking } as MsgBeginUnlocking
    message.coins = []
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner)
    } else {
      message.owner = ''
    }
    if (object.ID !== undefined && object.ID !== null) {
      message.ID = Number(object.ID)
    } else {
      message.ID = 0
    }
    if (object.coins !== undefined && object.coins !== null) {
      for (const e of object.coins) {
        message.coins.push(Coin.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: MsgBeginUnlocking): unknown {
    const obj: any = {}
    message.owner !== undefined && (obj.owner = message.owner)
    message.ID !== undefined && (obj.ID = message.ID)
    if (message.coins) {
      obj.coins = message.coins.map((e) => (e ? Coin.toJSON(e) : undefined))
    } else {
      obj.coins = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<MsgBeginUnlocking>): MsgBeginUnlocking {
    const message = { ...baseMsgBeginUnlocking } as MsgBeginUnlocking
    message.coins = []
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner
    } else {
      message.owner = ''
    }
    if (object.ID !== undefined && object.ID !== null) {
      message.ID = object.ID
    } else {
      message.ID = 0
    }
    if (object.coins !== undefined && object.coins !== null) {
      for (const e of object.coins) {
        message.coins.push(Coin.fromPartial(e))
      }
    }
    return message
  }
}

const baseMsgBeginUnlockingResponse: object = { success: false }

export const MsgBeginUnlockingResponse = {
  encode(message: MsgBeginUnlockingResponse, writer: Writer = Writer.create()): Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgBeginUnlockingResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgBeginUnlockingResponse } as MsgBeginUnlockingResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgBeginUnlockingResponse {
    const message = { ...baseMsgBeginUnlockingResponse } as MsgBeginUnlockingResponse
    if (object.success !== undefined && object.success !== null) {
      message.success = Boolean(object.success)
    } else {
      message.success = false
    }
    return message
  },

  toJSON(message: MsgBeginUnlockingResponse): unknown {
    const obj: any = {}
    message.success !== undefined && (obj.success = message.success)
    return obj
  },

  fromPartial(object: DeepPartial<MsgBeginUnlockingResponse>): MsgBeginUnlockingResponse {
    const message = { ...baseMsgBeginUnlockingResponse } as MsgBeginUnlockingResponse
    if (object.success !== undefined && object.success !== null) {
      message.success = object.success
    } else {
      message.success = false
    }
    return message
  }
}

/** Msg defines the Msg service. */
export interface Msg {
  /** LockTokens lock tokens */
  LockTokens(request: MsgLockTokens): Promise<MsgLockTokensResponse>
  /** BeginUnlockingAll begin unlocking all tokens */
  BeginUnlockingAll(request: MsgBeginUnlockingAll): Promise<MsgBeginUnlockingAllResponse>
  /** MsgBeginUnlocking begins unlocking tokens by lock ID */
  BeginUnlocking(request: MsgBeginUnlocking): Promise<MsgBeginUnlockingResponse>
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
  }
  LockTokens(request: MsgLockTokens): Promise<MsgLockTokensResponse> {
    const data = MsgLockTokens.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.lockup.Msg', 'LockTokens', data)
    return promise.then((data) => MsgLockTokensResponse.decode(new Reader(data)))
  }

  BeginUnlockingAll(request: MsgBeginUnlockingAll): Promise<MsgBeginUnlockingAllResponse> {
    const data = MsgBeginUnlockingAll.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.lockup.Msg', 'BeginUnlockingAll', data)
    return promise.then((data) => MsgBeginUnlockingAllResponse.decode(new Reader(data)))
  }

  BeginUnlocking(request: MsgBeginUnlocking): Promise<MsgBeginUnlockingResponse> {
    const data = MsgBeginUnlocking.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.lockup.Msg', 'BeginUnlocking', data)
    return promise.then((data) => MsgBeginUnlockingResponse.decode(new Reader(data)))
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
