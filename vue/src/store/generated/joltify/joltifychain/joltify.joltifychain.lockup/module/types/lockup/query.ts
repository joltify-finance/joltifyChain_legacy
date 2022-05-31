/* eslint-disable */
import { Reader, util, configure, Writer } from 'protobufjs/minimal'
import { Timestamp } from '../google/protobuf/timestamp'
import * as Long from 'long'
import { Coin } from '../cosmos/base/v1beta1/coin'
import { PeriodLock, SyntheticLock } from '../lockup/lock'
import { Duration } from '../google/protobuf/duration'

export const protobufPackage = 'joltify.joltifychain.lockup'

export interface ModuleBalanceRequest {}

export interface ModuleBalanceResponse {
  coins: Coin[]
}

export interface ModuleLockedAmountRequest {}

export interface ModuleLockedAmountResponse {
  coins: Coin[]
}

export interface AccountUnlockableCoinsRequest {
  owner: string
}

export interface AccountUnlockableCoinsResponse {
  coins: Coin[]
}

export interface AccountUnlockingCoinsRequest {
  owner: string
}

export interface AccountUnlockingCoinsResponse {
  coins: Coin[]
}

export interface AccountLockedCoinsRequest {
  owner: string
}

export interface AccountLockedCoinsResponse {
  coins: Coin[]
}

export interface AccountLockedPastTimeRequest {
  owner: string
  timestamp: Date | undefined
}

export interface AccountLockedPastTimeResponse {
  locks: PeriodLock[]
}

export interface AccountLockedPastTimeNotUnlockingOnlyRequest {
  owner: string
  timestamp: Date | undefined
}

export interface AccountLockedPastTimeNotUnlockingOnlyResponse {
  locks: PeriodLock[]
}

export interface AccountUnlockedBeforeTimeRequest {
  owner: string
  timestamp: Date | undefined
}

export interface AccountUnlockedBeforeTimeResponse {
  locks: PeriodLock[]
}

export interface AccountLockedPastTimeDenomRequest {
  owner: string
  timestamp: Date | undefined
  denom: string
}

export interface AccountLockedPastTimeDenomResponse {
  locks: PeriodLock[]
}

export interface LockedDenomRequest {
  denom: string
  duration: Duration | undefined
}

export interface LockedDenomResponse {
  amount: string
}

export interface LockedRequest {
  lock_id: number
}

export interface LockedResponse {
  lock: PeriodLock | undefined
}

export interface SyntheticLockupsByLockupIDRequest {
  lock_id: number
}

export interface SyntheticLockupsByLockupIDResponse {
  synthetic_locks: SyntheticLock[]
}

export interface AccountLockedLongerDurationRequest {
  owner: string
  duration: Duration | undefined
}

export interface AccountLockedLongerDurationResponse {
  locks: PeriodLock[]
}

export interface AccountLockedLongerDurationNotUnlockingOnlyRequest {
  owner: string
  duration: Duration | undefined
}

export interface AccountLockedLongerDurationNotUnlockingOnlyResponse {
  locks: PeriodLock[]
}

export interface AccountLockedLongerDurationDenomRequest {
  owner: string
  duration: Duration | undefined
  denom: string
}

export interface AccountLockedLongerDurationDenomResponse {
  locks: PeriodLock[]
}

const baseModuleBalanceRequest: object = {}

export const ModuleBalanceRequest = {
  encode(_: ModuleBalanceRequest, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): ModuleBalanceRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseModuleBalanceRequest } as ModuleBalanceRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(_: any): ModuleBalanceRequest {
    const message = { ...baseModuleBalanceRequest } as ModuleBalanceRequest
    return message
  },

  toJSON(_: ModuleBalanceRequest): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<ModuleBalanceRequest>): ModuleBalanceRequest {
    const message = { ...baseModuleBalanceRequest } as ModuleBalanceRequest
    return message
  }
}

const baseModuleBalanceResponse: object = {}

export const ModuleBalanceResponse = {
  encode(message: ModuleBalanceResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): ModuleBalanceResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseModuleBalanceResponse } as ModuleBalanceResponse
    message.coins = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.coins.push(Coin.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): ModuleBalanceResponse {
    const message = { ...baseModuleBalanceResponse } as ModuleBalanceResponse
    message.coins = []
    if (object.coins !== undefined && object.coins !== null) {
      for (const e of object.coins) {
        message.coins.push(Coin.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: ModuleBalanceResponse): unknown {
    const obj: any = {}
    if (message.coins) {
      obj.coins = message.coins.map((e) => (e ? Coin.toJSON(e) : undefined))
    } else {
      obj.coins = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<ModuleBalanceResponse>): ModuleBalanceResponse {
    const message = { ...baseModuleBalanceResponse } as ModuleBalanceResponse
    message.coins = []
    if (object.coins !== undefined && object.coins !== null) {
      for (const e of object.coins) {
        message.coins.push(Coin.fromPartial(e))
      }
    }
    return message
  }
}

const baseModuleLockedAmountRequest: object = {}

export const ModuleLockedAmountRequest = {
  encode(_: ModuleLockedAmountRequest, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): ModuleLockedAmountRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseModuleLockedAmountRequest } as ModuleLockedAmountRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(_: any): ModuleLockedAmountRequest {
    const message = { ...baseModuleLockedAmountRequest } as ModuleLockedAmountRequest
    return message
  },

  toJSON(_: ModuleLockedAmountRequest): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<ModuleLockedAmountRequest>): ModuleLockedAmountRequest {
    const message = { ...baseModuleLockedAmountRequest } as ModuleLockedAmountRequest
    return message
  }
}

const baseModuleLockedAmountResponse: object = {}

export const ModuleLockedAmountResponse = {
  encode(message: ModuleLockedAmountResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): ModuleLockedAmountResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseModuleLockedAmountResponse } as ModuleLockedAmountResponse
    message.coins = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.coins.push(Coin.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): ModuleLockedAmountResponse {
    const message = { ...baseModuleLockedAmountResponse } as ModuleLockedAmountResponse
    message.coins = []
    if (object.coins !== undefined && object.coins !== null) {
      for (const e of object.coins) {
        message.coins.push(Coin.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: ModuleLockedAmountResponse): unknown {
    const obj: any = {}
    if (message.coins) {
      obj.coins = message.coins.map((e) => (e ? Coin.toJSON(e) : undefined))
    } else {
      obj.coins = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<ModuleLockedAmountResponse>): ModuleLockedAmountResponse {
    const message = { ...baseModuleLockedAmountResponse } as ModuleLockedAmountResponse
    message.coins = []
    if (object.coins !== undefined && object.coins !== null) {
      for (const e of object.coins) {
        message.coins.push(Coin.fromPartial(e))
      }
    }
    return message
  }
}

const baseAccountUnlockableCoinsRequest: object = { owner: '' }

export const AccountUnlockableCoinsRequest = {
  encode(message: AccountUnlockableCoinsRequest, writer: Writer = Writer.create()): Writer {
    if (message.owner !== '') {
      writer.uint32(10).string(message.owner)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): AccountUnlockableCoinsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseAccountUnlockableCoinsRequest } as AccountUnlockableCoinsRequest
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

  fromJSON(object: any): AccountUnlockableCoinsRequest {
    const message = { ...baseAccountUnlockableCoinsRequest } as AccountUnlockableCoinsRequest
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner)
    } else {
      message.owner = ''
    }
    return message
  },

  toJSON(message: AccountUnlockableCoinsRequest): unknown {
    const obj: any = {}
    message.owner !== undefined && (obj.owner = message.owner)
    return obj
  },

  fromPartial(object: DeepPartial<AccountUnlockableCoinsRequest>): AccountUnlockableCoinsRequest {
    const message = { ...baseAccountUnlockableCoinsRequest } as AccountUnlockableCoinsRequest
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner
    } else {
      message.owner = ''
    }
    return message
  }
}

const baseAccountUnlockableCoinsResponse: object = {}

export const AccountUnlockableCoinsResponse = {
  encode(message: AccountUnlockableCoinsResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): AccountUnlockableCoinsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseAccountUnlockableCoinsResponse } as AccountUnlockableCoinsResponse
    message.coins = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.coins.push(Coin.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): AccountUnlockableCoinsResponse {
    const message = { ...baseAccountUnlockableCoinsResponse } as AccountUnlockableCoinsResponse
    message.coins = []
    if (object.coins !== undefined && object.coins !== null) {
      for (const e of object.coins) {
        message.coins.push(Coin.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: AccountUnlockableCoinsResponse): unknown {
    const obj: any = {}
    if (message.coins) {
      obj.coins = message.coins.map((e) => (e ? Coin.toJSON(e) : undefined))
    } else {
      obj.coins = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<AccountUnlockableCoinsResponse>): AccountUnlockableCoinsResponse {
    const message = { ...baseAccountUnlockableCoinsResponse } as AccountUnlockableCoinsResponse
    message.coins = []
    if (object.coins !== undefined && object.coins !== null) {
      for (const e of object.coins) {
        message.coins.push(Coin.fromPartial(e))
      }
    }
    return message
  }
}

const baseAccountUnlockingCoinsRequest: object = { owner: '' }

export const AccountUnlockingCoinsRequest = {
  encode(message: AccountUnlockingCoinsRequest, writer: Writer = Writer.create()): Writer {
    if (message.owner !== '') {
      writer.uint32(10).string(message.owner)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): AccountUnlockingCoinsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseAccountUnlockingCoinsRequest } as AccountUnlockingCoinsRequest
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

  fromJSON(object: any): AccountUnlockingCoinsRequest {
    const message = { ...baseAccountUnlockingCoinsRequest } as AccountUnlockingCoinsRequest
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner)
    } else {
      message.owner = ''
    }
    return message
  },

  toJSON(message: AccountUnlockingCoinsRequest): unknown {
    const obj: any = {}
    message.owner !== undefined && (obj.owner = message.owner)
    return obj
  },

  fromPartial(object: DeepPartial<AccountUnlockingCoinsRequest>): AccountUnlockingCoinsRequest {
    const message = { ...baseAccountUnlockingCoinsRequest } as AccountUnlockingCoinsRequest
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner
    } else {
      message.owner = ''
    }
    return message
  }
}

const baseAccountUnlockingCoinsResponse: object = {}

export const AccountUnlockingCoinsResponse = {
  encode(message: AccountUnlockingCoinsResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): AccountUnlockingCoinsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseAccountUnlockingCoinsResponse } as AccountUnlockingCoinsResponse
    message.coins = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.coins.push(Coin.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): AccountUnlockingCoinsResponse {
    const message = { ...baseAccountUnlockingCoinsResponse } as AccountUnlockingCoinsResponse
    message.coins = []
    if (object.coins !== undefined && object.coins !== null) {
      for (const e of object.coins) {
        message.coins.push(Coin.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: AccountUnlockingCoinsResponse): unknown {
    const obj: any = {}
    if (message.coins) {
      obj.coins = message.coins.map((e) => (e ? Coin.toJSON(e) : undefined))
    } else {
      obj.coins = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<AccountUnlockingCoinsResponse>): AccountUnlockingCoinsResponse {
    const message = { ...baseAccountUnlockingCoinsResponse } as AccountUnlockingCoinsResponse
    message.coins = []
    if (object.coins !== undefined && object.coins !== null) {
      for (const e of object.coins) {
        message.coins.push(Coin.fromPartial(e))
      }
    }
    return message
  }
}

const baseAccountLockedCoinsRequest: object = { owner: '' }

export const AccountLockedCoinsRequest = {
  encode(message: AccountLockedCoinsRequest, writer: Writer = Writer.create()): Writer {
    if (message.owner !== '') {
      writer.uint32(10).string(message.owner)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): AccountLockedCoinsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseAccountLockedCoinsRequest } as AccountLockedCoinsRequest
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

  fromJSON(object: any): AccountLockedCoinsRequest {
    const message = { ...baseAccountLockedCoinsRequest } as AccountLockedCoinsRequest
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner)
    } else {
      message.owner = ''
    }
    return message
  },

  toJSON(message: AccountLockedCoinsRequest): unknown {
    const obj: any = {}
    message.owner !== undefined && (obj.owner = message.owner)
    return obj
  },

  fromPartial(object: DeepPartial<AccountLockedCoinsRequest>): AccountLockedCoinsRequest {
    const message = { ...baseAccountLockedCoinsRequest } as AccountLockedCoinsRequest
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner
    } else {
      message.owner = ''
    }
    return message
  }
}

const baseAccountLockedCoinsResponse: object = {}

export const AccountLockedCoinsResponse = {
  encode(message: AccountLockedCoinsResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): AccountLockedCoinsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseAccountLockedCoinsResponse } as AccountLockedCoinsResponse
    message.coins = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.coins.push(Coin.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): AccountLockedCoinsResponse {
    const message = { ...baseAccountLockedCoinsResponse } as AccountLockedCoinsResponse
    message.coins = []
    if (object.coins !== undefined && object.coins !== null) {
      for (const e of object.coins) {
        message.coins.push(Coin.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: AccountLockedCoinsResponse): unknown {
    const obj: any = {}
    if (message.coins) {
      obj.coins = message.coins.map((e) => (e ? Coin.toJSON(e) : undefined))
    } else {
      obj.coins = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<AccountLockedCoinsResponse>): AccountLockedCoinsResponse {
    const message = { ...baseAccountLockedCoinsResponse } as AccountLockedCoinsResponse
    message.coins = []
    if (object.coins !== undefined && object.coins !== null) {
      for (const e of object.coins) {
        message.coins.push(Coin.fromPartial(e))
      }
    }
    return message
  }
}

const baseAccountLockedPastTimeRequest: object = { owner: '' }

export const AccountLockedPastTimeRequest = {
  encode(message: AccountLockedPastTimeRequest, writer: Writer = Writer.create()): Writer {
    if (message.owner !== '') {
      writer.uint32(10).string(message.owner)
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): AccountLockedPastTimeRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseAccountLockedPastTimeRequest } as AccountLockedPastTimeRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string()
          break
        case 2:
          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): AccountLockedPastTimeRequest {
    const message = { ...baseAccountLockedPastTimeRequest } as AccountLockedPastTimeRequest
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner)
    } else {
      message.owner = ''
    }
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = fromJsonTimestamp(object.timestamp)
    } else {
      message.timestamp = undefined
    }
    return message
  },

  toJSON(message: AccountLockedPastTimeRequest): unknown {
    const obj: any = {}
    message.owner !== undefined && (obj.owner = message.owner)
    message.timestamp !== undefined && (obj.timestamp = message.timestamp !== undefined ? message.timestamp.toISOString() : null)
    return obj
  },

  fromPartial(object: DeepPartial<AccountLockedPastTimeRequest>): AccountLockedPastTimeRequest {
    const message = { ...baseAccountLockedPastTimeRequest } as AccountLockedPastTimeRequest
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner
    } else {
      message.owner = ''
    }
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = object.timestamp
    } else {
      message.timestamp = undefined
    }
    return message
  }
}

const baseAccountLockedPastTimeResponse: object = {}

export const AccountLockedPastTimeResponse = {
  encode(message: AccountLockedPastTimeResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.locks) {
      PeriodLock.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): AccountLockedPastTimeResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseAccountLockedPastTimeResponse } as AccountLockedPastTimeResponse
    message.locks = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.locks.push(PeriodLock.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): AccountLockedPastTimeResponse {
    const message = { ...baseAccountLockedPastTimeResponse } as AccountLockedPastTimeResponse
    message.locks = []
    if (object.locks !== undefined && object.locks !== null) {
      for (const e of object.locks) {
        message.locks.push(PeriodLock.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: AccountLockedPastTimeResponse): unknown {
    const obj: any = {}
    if (message.locks) {
      obj.locks = message.locks.map((e) => (e ? PeriodLock.toJSON(e) : undefined))
    } else {
      obj.locks = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<AccountLockedPastTimeResponse>): AccountLockedPastTimeResponse {
    const message = { ...baseAccountLockedPastTimeResponse } as AccountLockedPastTimeResponse
    message.locks = []
    if (object.locks !== undefined && object.locks !== null) {
      for (const e of object.locks) {
        message.locks.push(PeriodLock.fromPartial(e))
      }
    }
    return message
  }
}

const baseAccountLockedPastTimeNotUnlockingOnlyRequest: object = { owner: '' }

export const AccountLockedPastTimeNotUnlockingOnlyRequest = {
  encode(message: AccountLockedPastTimeNotUnlockingOnlyRequest, writer: Writer = Writer.create()): Writer {
    if (message.owner !== '') {
      writer.uint32(10).string(message.owner)
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): AccountLockedPastTimeNotUnlockingOnlyRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseAccountLockedPastTimeNotUnlockingOnlyRequest } as AccountLockedPastTimeNotUnlockingOnlyRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string()
          break
        case 2:
          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): AccountLockedPastTimeNotUnlockingOnlyRequest {
    const message = { ...baseAccountLockedPastTimeNotUnlockingOnlyRequest } as AccountLockedPastTimeNotUnlockingOnlyRequest
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner)
    } else {
      message.owner = ''
    }
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = fromJsonTimestamp(object.timestamp)
    } else {
      message.timestamp = undefined
    }
    return message
  },

  toJSON(message: AccountLockedPastTimeNotUnlockingOnlyRequest): unknown {
    const obj: any = {}
    message.owner !== undefined && (obj.owner = message.owner)
    message.timestamp !== undefined && (obj.timestamp = message.timestamp !== undefined ? message.timestamp.toISOString() : null)
    return obj
  },

  fromPartial(object: DeepPartial<AccountLockedPastTimeNotUnlockingOnlyRequest>): AccountLockedPastTimeNotUnlockingOnlyRequest {
    const message = { ...baseAccountLockedPastTimeNotUnlockingOnlyRequest } as AccountLockedPastTimeNotUnlockingOnlyRequest
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner
    } else {
      message.owner = ''
    }
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = object.timestamp
    } else {
      message.timestamp = undefined
    }
    return message
  }
}

const baseAccountLockedPastTimeNotUnlockingOnlyResponse: object = {}

export const AccountLockedPastTimeNotUnlockingOnlyResponse = {
  encode(message: AccountLockedPastTimeNotUnlockingOnlyResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.locks) {
      PeriodLock.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): AccountLockedPastTimeNotUnlockingOnlyResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseAccountLockedPastTimeNotUnlockingOnlyResponse } as AccountLockedPastTimeNotUnlockingOnlyResponse
    message.locks = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.locks.push(PeriodLock.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): AccountLockedPastTimeNotUnlockingOnlyResponse {
    const message = { ...baseAccountLockedPastTimeNotUnlockingOnlyResponse } as AccountLockedPastTimeNotUnlockingOnlyResponse
    message.locks = []
    if (object.locks !== undefined && object.locks !== null) {
      for (const e of object.locks) {
        message.locks.push(PeriodLock.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: AccountLockedPastTimeNotUnlockingOnlyResponse): unknown {
    const obj: any = {}
    if (message.locks) {
      obj.locks = message.locks.map((e) => (e ? PeriodLock.toJSON(e) : undefined))
    } else {
      obj.locks = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<AccountLockedPastTimeNotUnlockingOnlyResponse>): AccountLockedPastTimeNotUnlockingOnlyResponse {
    const message = { ...baseAccountLockedPastTimeNotUnlockingOnlyResponse } as AccountLockedPastTimeNotUnlockingOnlyResponse
    message.locks = []
    if (object.locks !== undefined && object.locks !== null) {
      for (const e of object.locks) {
        message.locks.push(PeriodLock.fromPartial(e))
      }
    }
    return message
  }
}

const baseAccountUnlockedBeforeTimeRequest: object = { owner: '' }

export const AccountUnlockedBeforeTimeRequest = {
  encode(message: AccountUnlockedBeforeTimeRequest, writer: Writer = Writer.create()): Writer {
    if (message.owner !== '') {
      writer.uint32(10).string(message.owner)
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): AccountUnlockedBeforeTimeRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseAccountUnlockedBeforeTimeRequest } as AccountUnlockedBeforeTimeRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string()
          break
        case 2:
          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): AccountUnlockedBeforeTimeRequest {
    const message = { ...baseAccountUnlockedBeforeTimeRequest } as AccountUnlockedBeforeTimeRequest
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner)
    } else {
      message.owner = ''
    }
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = fromJsonTimestamp(object.timestamp)
    } else {
      message.timestamp = undefined
    }
    return message
  },

  toJSON(message: AccountUnlockedBeforeTimeRequest): unknown {
    const obj: any = {}
    message.owner !== undefined && (obj.owner = message.owner)
    message.timestamp !== undefined && (obj.timestamp = message.timestamp !== undefined ? message.timestamp.toISOString() : null)
    return obj
  },

  fromPartial(object: DeepPartial<AccountUnlockedBeforeTimeRequest>): AccountUnlockedBeforeTimeRequest {
    const message = { ...baseAccountUnlockedBeforeTimeRequest } as AccountUnlockedBeforeTimeRequest
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner
    } else {
      message.owner = ''
    }
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = object.timestamp
    } else {
      message.timestamp = undefined
    }
    return message
  }
}

const baseAccountUnlockedBeforeTimeResponse: object = {}

export const AccountUnlockedBeforeTimeResponse = {
  encode(message: AccountUnlockedBeforeTimeResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.locks) {
      PeriodLock.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): AccountUnlockedBeforeTimeResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseAccountUnlockedBeforeTimeResponse } as AccountUnlockedBeforeTimeResponse
    message.locks = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.locks.push(PeriodLock.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): AccountUnlockedBeforeTimeResponse {
    const message = { ...baseAccountUnlockedBeforeTimeResponse } as AccountUnlockedBeforeTimeResponse
    message.locks = []
    if (object.locks !== undefined && object.locks !== null) {
      for (const e of object.locks) {
        message.locks.push(PeriodLock.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: AccountUnlockedBeforeTimeResponse): unknown {
    const obj: any = {}
    if (message.locks) {
      obj.locks = message.locks.map((e) => (e ? PeriodLock.toJSON(e) : undefined))
    } else {
      obj.locks = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<AccountUnlockedBeforeTimeResponse>): AccountUnlockedBeforeTimeResponse {
    const message = { ...baseAccountUnlockedBeforeTimeResponse } as AccountUnlockedBeforeTimeResponse
    message.locks = []
    if (object.locks !== undefined && object.locks !== null) {
      for (const e of object.locks) {
        message.locks.push(PeriodLock.fromPartial(e))
      }
    }
    return message
  }
}

const baseAccountLockedPastTimeDenomRequest: object = { owner: '', denom: '' }

export const AccountLockedPastTimeDenomRequest = {
  encode(message: AccountLockedPastTimeDenomRequest, writer: Writer = Writer.create()): Writer {
    if (message.owner !== '') {
      writer.uint32(10).string(message.owner)
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(18).fork()).ldelim()
    }
    if (message.denom !== '') {
      writer.uint32(26).string(message.denom)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): AccountLockedPastTimeDenomRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseAccountLockedPastTimeDenomRequest } as AccountLockedPastTimeDenomRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string()
          break
        case 2:
          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()))
          break
        case 3:
          message.denom = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): AccountLockedPastTimeDenomRequest {
    const message = { ...baseAccountLockedPastTimeDenomRequest } as AccountLockedPastTimeDenomRequest
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner)
    } else {
      message.owner = ''
    }
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = fromJsonTimestamp(object.timestamp)
    } else {
      message.timestamp = undefined
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = String(object.denom)
    } else {
      message.denom = ''
    }
    return message
  },

  toJSON(message: AccountLockedPastTimeDenomRequest): unknown {
    const obj: any = {}
    message.owner !== undefined && (obj.owner = message.owner)
    message.timestamp !== undefined && (obj.timestamp = message.timestamp !== undefined ? message.timestamp.toISOString() : null)
    message.denom !== undefined && (obj.denom = message.denom)
    return obj
  },

  fromPartial(object: DeepPartial<AccountLockedPastTimeDenomRequest>): AccountLockedPastTimeDenomRequest {
    const message = { ...baseAccountLockedPastTimeDenomRequest } as AccountLockedPastTimeDenomRequest
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner
    } else {
      message.owner = ''
    }
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = object.timestamp
    } else {
      message.timestamp = undefined
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom
    } else {
      message.denom = ''
    }
    return message
  }
}

const baseAccountLockedPastTimeDenomResponse: object = {}

export const AccountLockedPastTimeDenomResponse = {
  encode(message: AccountLockedPastTimeDenomResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.locks) {
      PeriodLock.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): AccountLockedPastTimeDenomResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseAccountLockedPastTimeDenomResponse } as AccountLockedPastTimeDenomResponse
    message.locks = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.locks.push(PeriodLock.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): AccountLockedPastTimeDenomResponse {
    const message = { ...baseAccountLockedPastTimeDenomResponse } as AccountLockedPastTimeDenomResponse
    message.locks = []
    if (object.locks !== undefined && object.locks !== null) {
      for (const e of object.locks) {
        message.locks.push(PeriodLock.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: AccountLockedPastTimeDenomResponse): unknown {
    const obj: any = {}
    if (message.locks) {
      obj.locks = message.locks.map((e) => (e ? PeriodLock.toJSON(e) : undefined))
    } else {
      obj.locks = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<AccountLockedPastTimeDenomResponse>): AccountLockedPastTimeDenomResponse {
    const message = { ...baseAccountLockedPastTimeDenomResponse } as AccountLockedPastTimeDenomResponse
    message.locks = []
    if (object.locks !== undefined && object.locks !== null) {
      for (const e of object.locks) {
        message.locks.push(PeriodLock.fromPartial(e))
      }
    }
    return message
  }
}

const baseLockedDenomRequest: object = { denom: '' }

export const LockedDenomRequest = {
  encode(message: LockedDenomRequest, writer: Writer = Writer.create()): Writer {
    if (message.denom !== '') {
      writer.uint32(10).string(message.denom)
    }
    if (message.duration !== undefined) {
      Duration.encode(message.duration, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): LockedDenomRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseLockedDenomRequest } as LockedDenomRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string()
          break
        case 2:
          message.duration = Duration.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): LockedDenomRequest {
    const message = { ...baseLockedDenomRequest } as LockedDenomRequest
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = String(object.denom)
    } else {
      message.denom = ''
    }
    if (object.duration !== undefined && object.duration !== null) {
      message.duration = Duration.fromJSON(object.duration)
    } else {
      message.duration = undefined
    }
    return message
  },

  toJSON(message: LockedDenomRequest): unknown {
    const obj: any = {}
    message.denom !== undefined && (obj.denom = message.denom)
    message.duration !== undefined && (obj.duration = message.duration ? Duration.toJSON(message.duration) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<LockedDenomRequest>): LockedDenomRequest {
    const message = { ...baseLockedDenomRequest } as LockedDenomRequest
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom
    } else {
      message.denom = ''
    }
    if (object.duration !== undefined && object.duration !== null) {
      message.duration = Duration.fromPartial(object.duration)
    } else {
      message.duration = undefined
    }
    return message
  }
}

const baseLockedDenomResponse: object = { amount: '' }

export const LockedDenomResponse = {
  encode(message: LockedDenomResponse, writer: Writer = Writer.create()): Writer {
    if (message.amount !== '') {
      writer.uint32(10).string(message.amount)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): LockedDenomResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseLockedDenomResponse } as LockedDenomResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.amount = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): LockedDenomResponse {
    const message = { ...baseLockedDenomResponse } as LockedDenomResponse
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = String(object.amount)
    } else {
      message.amount = ''
    }
    return message
  },

  toJSON(message: LockedDenomResponse): unknown {
    const obj: any = {}
    message.amount !== undefined && (obj.amount = message.amount)
    return obj
  },

  fromPartial(object: DeepPartial<LockedDenomResponse>): LockedDenomResponse {
    const message = { ...baseLockedDenomResponse } as LockedDenomResponse
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount
    } else {
      message.amount = ''
    }
    return message
  }
}

const baseLockedRequest: object = { lock_id: 0 }

export const LockedRequest = {
  encode(message: LockedRequest, writer: Writer = Writer.create()): Writer {
    if (message.lock_id !== 0) {
      writer.uint32(8).uint64(message.lock_id)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): LockedRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseLockedRequest } as LockedRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.lock_id = longToNumber(reader.uint64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): LockedRequest {
    const message = { ...baseLockedRequest } as LockedRequest
    if (object.lock_id !== undefined && object.lock_id !== null) {
      message.lock_id = Number(object.lock_id)
    } else {
      message.lock_id = 0
    }
    return message
  },

  toJSON(message: LockedRequest): unknown {
    const obj: any = {}
    message.lock_id !== undefined && (obj.lock_id = message.lock_id)
    return obj
  },

  fromPartial(object: DeepPartial<LockedRequest>): LockedRequest {
    const message = { ...baseLockedRequest } as LockedRequest
    if (object.lock_id !== undefined && object.lock_id !== null) {
      message.lock_id = object.lock_id
    } else {
      message.lock_id = 0
    }
    return message
  }
}

const baseLockedResponse: object = {}

export const LockedResponse = {
  encode(message: LockedResponse, writer: Writer = Writer.create()): Writer {
    if (message.lock !== undefined) {
      PeriodLock.encode(message.lock, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): LockedResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseLockedResponse } as LockedResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.lock = PeriodLock.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): LockedResponse {
    const message = { ...baseLockedResponse } as LockedResponse
    if (object.lock !== undefined && object.lock !== null) {
      message.lock = PeriodLock.fromJSON(object.lock)
    } else {
      message.lock = undefined
    }
    return message
  },

  toJSON(message: LockedResponse): unknown {
    const obj: any = {}
    message.lock !== undefined && (obj.lock = message.lock ? PeriodLock.toJSON(message.lock) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<LockedResponse>): LockedResponse {
    const message = { ...baseLockedResponse } as LockedResponse
    if (object.lock !== undefined && object.lock !== null) {
      message.lock = PeriodLock.fromPartial(object.lock)
    } else {
      message.lock = undefined
    }
    return message
  }
}

const baseSyntheticLockupsByLockupIDRequest: object = { lock_id: 0 }

export const SyntheticLockupsByLockupIDRequest = {
  encode(message: SyntheticLockupsByLockupIDRequest, writer: Writer = Writer.create()): Writer {
    if (message.lock_id !== 0) {
      writer.uint32(8).uint64(message.lock_id)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): SyntheticLockupsByLockupIDRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseSyntheticLockupsByLockupIDRequest } as SyntheticLockupsByLockupIDRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.lock_id = longToNumber(reader.uint64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): SyntheticLockupsByLockupIDRequest {
    const message = { ...baseSyntheticLockupsByLockupIDRequest } as SyntheticLockupsByLockupIDRequest
    if (object.lock_id !== undefined && object.lock_id !== null) {
      message.lock_id = Number(object.lock_id)
    } else {
      message.lock_id = 0
    }
    return message
  },

  toJSON(message: SyntheticLockupsByLockupIDRequest): unknown {
    const obj: any = {}
    message.lock_id !== undefined && (obj.lock_id = message.lock_id)
    return obj
  },

  fromPartial(object: DeepPartial<SyntheticLockupsByLockupIDRequest>): SyntheticLockupsByLockupIDRequest {
    const message = { ...baseSyntheticLockupsByLockupIDRequest } as SyntheticLockupsByLockupIDRequest
    if (object.lock_id !== undefined && object.lock_id !== null) {
      message.lock_id = object.lock_id
    } else {
      message.lock_id = 0
    }
    return message
  }
}

const baseSyntheticLockupsByLockupIDResponse: object = {}

export const SyntheticLockupsByLockupIDResponse = {
  encode(message: SyntheticLockupsByLockupIDResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.synthetic_locks) {
      SyntheticLock.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): SyntheticLockupsByLockupIDResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseSyntheticLockupsByLockupIDResponse } as SyntheticLockupsByLockupIDResponse
    message.synthetic_locks = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.synthetic_locks.push(SyntheticLock.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): SyntheticLockupsByLockupIDResponse {
    const message = { ...baseSyntheticLockupsByLockupIDResponse } as SyntheticLockupsByLockupIDResponse
    message.synthetic_locks = []
    if (object.synthetic_locks !== undefined && object.synthetic_locks !== null) {
      for (const e of object.synthetic_locks) {
        message.synthetic_locks.push(SyntheticLock.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: SyntheticLockupsByLockupIDResponse): unknown {
    const obj: any = {}
    if (message.synthetic_locks) {
      obj.synthetic_locks = message.synthetic_locks.map((e) => (e ? SyntheticLock.toJSON(e) : undefined))
    } else {
      obj.synthetic_locks = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<SyntheticLockupsByLockupIDResponse>): SyntheticLockupsByLockupIDResponse {
    const message = { ...baseSyntheticLockupsByLockupIDResponse } as SyntheticLockupsByLockupIDResponse
    message.synthetic_locks = []
    if (object.synthetic_locks !== undefined && object.synthetic_locks !== null) {
      for (const e of object.synthetic_locks) {
        message.synthetic_locks.push(SyntheticLock.fromPartial(e))
      }
    }
    return message
  }
}

const baseAccountLockedLongerDurationRequest: object = { owner: '' }

export const AccountLockedLongerDurationRequest = {
  encode(message: AccountLockedLongerDurationRequest, writer: Writer = Writer.create()): Writer {
    if (message.owner !== '') {
      writer.uint32(10).string(message.owner)
    }
    if (message.duration !== undefined) {
      Duration.encode(message.duration, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): AccountLockedLongerDurationRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseAccountLockedLongerDurationRequest } as AccountLockedLongerDurationRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string()
          break
        case 2:
          message.duration = Duration.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): AccountLockedLongerDurationRequest {
    const message = { ...baseAccountLockedLongerDurationRequest } as AccountLockedLongerDurationRequest
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
    return message
  },

  toJSON(message: AccountLockedLongerDurationRequest): unknown {
    const obj: any = {}
    message.owner !== undefined && (obj.owner = message.owner)
    message.duration !== undefined && (obj.duration = message.duration ? Duration.toJSON(message.duration) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<AccountLockedLongerDurationRequest>): AccountLockedLongerDurationRequest {
    const message = { ...baseAccountLockedLongerDurationRequest } as AccountLockedLongerDurationRequest
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
    return message
  }
}

const baseAccountLockedLongerDurationResponse: object = {}

export const AccountLockedLongerDurationResponse = {
  encode(message: AccountLockedLongerDurationResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.locks) {
      PeriodLock.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): AccountLockedLongerDurationResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseAccountLockedLongerDurationResponse } as AccountLockedLongerDurationResponse
    message.locks = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.locks.push(PeriodLock.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): AccountLockedLongerDurationResponse {
    const message = { ...baseAccountLockedLongerDurationResponse } as AccountLockedLongerDurationResponse
    message.locks = []
    if (object.locks !== undefined && object.locks !== null) {
      for (const e of object.locks) {
        message.locks.push(PeriodLock.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: AccountLockedLongerDurationResponse): unknown {
    const obj: any = {}
    if (message.locks) {
      obj.locks = message.locks.map((e) => (e ? PeriodLock.toJSON(e) : undefined))
    } else {
      obj.locks = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<AccountLockedLongerDurationResponse>): AccountLockedLongerDurationResponse {
    const message = { ...baseAccountLockedLongerDurationResponse } as AccountLockedLongerDurationResponse
    message.locks = []
    if (object.locks !== undefined && object.locks !== null) {
      for (const e of object.locks) {
        message.locks.push(PeriodLock.fromPartial(e))
      }
    }
    return message
  }
}

const baseAccountLockedLongerDurationNotUnlockingOnlyRequest: object = { owner: '' }

export const AccountLockedLongerDurationNotUnlockingOnlyRequest = {
  encode(message: AccountLockedLongerDurationNotUnlockingOnlyRequest, writer: Writer = Writer.create()): Writer {
    if (message.owner !== '') {
      writer.uint32(10).string(message.owner)
    }
    if (message.duration !== undefined) {
      Duration.encode(message.duration, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): AccountLockedLongerDurationNotUnlockingOnlyRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseAccountLockedLongerDurationNotUnlockingOnlyRequest } as AccountLockedLongerDurationNotUnlockingOnlyRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string()
          break
        case 2:
          message.duration = Duration.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): AccountLockedLongerDurationNotUnlockingOnlyRequest {
    const message = { ...baseAccountLockedLongerDurationNotUnlockingOnlyRequest } as AccountLockedLongerDurationNotUnlockingOnlyRequest
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
    return message
  },

  toJSON(message: AccountLockedLongerDurationNotUnlockingOnlyRequest): unknown {
    const obj: any = {}
    message.owner !== undefined && (obj.owner = message.owner)
    message.duration !== undefined && (obj.duration = message.duration ? Duration.toJSON(message.duration) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<AccountLockedLongerDurationNotUnlockingOnlyRequest>): AccountLockedLongerDurationNotUnlockingOnlyRequest {
    const message = { ...baseAccountLockedLongerDurationNotUnlockingOnlyRequest } as AccountLockedLongerDurationNotUnlockingOnlyRequest
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
    return message
  }
}

const baseAccountLockedLongerDurationNotUnlockingOnlyResponse: object = {}

export const AccountLockedLongerDurationNotUnlockingOnlyResponse = {
  encode(message: AccountLockedLongerDurationNotUnlockingOnlyResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.locks) {
      PeriodLock.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): AccountLockedLongerDurationNotUnlockingOnlyResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseAccountLockedLongerDurationNotUnlockingOnlyResponse } as AccountLockedLongerDurationNotUnlockingOnlyResponse
    message.locks = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.locks.push(PeriodLock.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): AccountLockedLongerDurationNotUnlockingOnlyResponse {
    const message = { ...baseAccountLockedLongerDurationNotUnlockingOnlyResponse } as AccountLockedLongerDurationNotUnlockingOnlyResponse
    message.locks = []
    if (object.locks !== undefined && object.locks !== null) {
      for (const e of object.locks) {
        message.locks.push(PeriodLock.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: AccountLockedLongerDurationNotUnlockingOnlyResponse): unknown {
    const obj: any = {}
    if (message.locks) {
      obj.locks = message.locks.map((e) => (e ? PeriodLock.toJSON(e) : undefined))
    } else {
      obj.locks = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<AccountLockedLongerDurationNotUnlockingOnlyResponse>): AccountLockedLongerDurationNotUnlockingOnlyResponse {
    const message = { ...baseAccountLockedLongerDurationNotUnlockingOnlyResponse } as AccountLockedLongerDurationNotUnlockingOnlyResponse
    message.locks = []
    if (object.locks !== undefined && object.locks !== null) {
      for (const e of object.locks) {
        message.locks.push(PeriodLock.fromPartial(e))
      }
    }
    return message
  }
}

const baseAccountLockedLongerDurationDenomRequest: object = { owner: '', denom: '' }

export const AccountLockedLongerDurationDenomRequest = {
  encode(message: AccountLockedLongerDurationDenomRequest, writer: Writer = Writer.create()): Writer {
    if (message.owner !== '') {
      writer.uint32(10).string(message.owner)
    }
    if (message.duration !== undefined) {
      Duration.encode(message.duration, writer.uint32(18).fork()).ldelim()
    }
    if (message.denom !== '') {
      writer.uint32(26).string(message.denom)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): AccountLockedLongerDurationDenomRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseAccountLockedLongerDurationDenomRequest } as AccountLockedLongerDurationDenomRequest
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
          message.denom = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): AccountLockedLongerDurationDenomRequest {
    const message = { ...baseAccountLockedLongerDurationDenomRequest } as AccountLockedLongerDurationDenomRequest
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
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = String(object.denom)
    } else {
      message.denom = ''
    }
    return message
  },

  toJSON(message: AccountLockedLongerDurationDenomRequest): unknown {
    const obj: any = {}
    message.owner !== undefined && (obj.owner = message.owner)
    message.duration !== undefined && (obj.duration = message.duration ? Duration.toJSON(message.duration) : undefined)
    message.denom !== undefined && (obj.denom = message.denom)
    return obj
  },

  fromPartial(object: DeepPartial<AccountLockedLongerDurationDenomRequest>): AccountLockedLongerDurationDenomRequest {
    const message = { ...baseAccountLockedLongerDurationDenomRequest } as AccountLockedLongerDurationDenomRequest
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
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom
    } else {
      message.denom = ''
    }
    return message
  }
}

const baseAccountLockedLongerDurationDenomResponse: object = {}

export const AccountLockedLongerDurationDenomResponse = {
  encode(message: AccountLockedLongerDurationDenomResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.locks) {
      PeriodLock.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): AccountLockedLongerDurationDenomResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseAccountLockedLongerDurationDenomResponse } as AccountLockedLongerDurationDenomResponse
    message.locks = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.locks.push(PeriodLock.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): AccountLockedLongerDurationDenomResponse {
    const message = { ...baseAccountLockedLongerDurationDenomResponse } as AccountLockedLongerDurationDenomResponse
    message.locks = []
    if (object.locks !== undefined && object.locks !== null) {
      for (const e of object.locks) {
        message.locks.push(PeriodLock.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: AccountLockedLongerDurationDenomResponse): unknown {
    const obj: any = {}
    if (message.locks) {
      obj.locks = message.locks.map((e) => (e ? PeriodLock.toJSON(e) : undefined))
    } else {
      obj.locks = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<AccountLockedLongerDurationDenomResponse>): AccountLockedLongerDurationDenomResponse {
    const message = { ...baseAccountLockedLongerDurationDenomResponse } as AccountLockedLongerDurationDenomResponse
    message.locks = []
    if (object.locks !== undefined && object.locks !== null) {
      for (const e of object.locks) {
        message.locks.push(PeriodLock.fromPartial(e))
      }
    }
    return message
  }
}

/** Query defines the gRPC querier service. */
export interface Query {
  /** Return full balance of the module */
  ModuleBalance(request: ModuleBalanceRequest): Promise<ModuleBalanceResponse>
  /** Return locked balance of the module */
  ModuleLockedAmount(request: ModuleLockedAmountRequest): Promise<ModuleLockedAmountResponse>
  /** Returns unlockable coins which are not withdrawn yet */
  AccountUnlockableCoins(request: AccountUnlockableCoinsRequest): Promise<AccountUnlockableCoinsResponse>
  /** Returns unlocking coins */
  AccountUnlockingCoins(request: AccountUnlockingCoinsRequest): Promise<AccountUnlockingCoinsResponse>
  /** Return a locked coins that can't be withdrawn */
  AccountLockedCoins(request: AccountLockedCoinsRequest): Promise<AccountLockedCoinsResponse>
  /** Returns locked records of an account with unlock time beyond timestamp */
  AccountLockedPastTime(request: AccountLockedPastTimeRequest): Promise<AccountLockedPastTimeResponse>
  /**
   * Returns locked records of an account with unlock time beyond timestamp
   * excluding tokens started unlocking
   */
  AccountLockedPastTimeNotUnlockingOnly(request: AccountLockedPastTimeNotUnlockingOnlyRequest): Promise<AccountLockedPastTimeNotUnlockingOnlyResponse>
  /** Returns unlocked records with unlock time before timestamp */
  AccountUnlockedBeforeTime(request: AccountUnlockedBeforeTimeRequest): Promise<AccountUnlockedBeforeTimeResponse>
  /** Returns lock records by address, timestamp, denom */
  AccountLockedPastTimeDenom(request: AccountLockedPastTimeDenomRequest): Promise<AccountLockedPastTimeDenomResponse>
  /** Returns total locked per denom with longer past given time */
  LockedDenom(request: LockedDenomRequest): Promise<LockedDenomResponse>
  /** Returns lock record by id */
  LockedByID(request: LockedRequest): Promise<LockedResponse>
  /** Returns synthetic lockups by native lockup id */
  SyntheticLockupsByLockupID(request: SyntheticLockupsByLockupIDRequest): Promise<SyntheticLockupsByLockupIDResponse>
  /** Returns account locked records with longer duration */
  AccountLockedLongerDuration(request: AccountLockedLongerDurationRequest): Promise<AccountLockedLongerDurationResponse>
  /**
   * Returns account locked records with longer duration excluding tokens
   * started unlocking
   */
  AccountLockedLongerDurationNotUnlockingOnly(
    request: AccountLockedLongerDurationNotUnlockingOnlyRequest
  ): Promise<AccountLockedLongerDurationNotUnlockingOnlyResponse>
  /** Returns account's locked records for a denom with longer duration */
  AccountLockedLongerDurationDenom(request: AccountLockedLongerDurationDenomRequest): Promise<AccountLockedLongerDurationDenomResponse>
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
  }
  ModuleBalance(request: ModuleBalanceRequest): Promise<ModuleBalanceResponse> {
    const data = ModuleBalanceRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.lockup.Query', 'ModuleBalance', data)
    return promise.then((data) => ModuleBalanceResponse.decode(new Reader(data)))
  }

  ModuleLockedAmount(request: ModuleLockedAmountRequest): Promise<ModuleLockedAmountResponse> {
    const data = ModuleLockedAmountRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.lockup.Query', 'ModuleLockedAmount', data)
    return promise.then((data) => ModuleLockedAmountResponse.decode(new Reader(data)))
  }

  AccountUnlockableCoins(request: AccountUnlockableCoinsRequest): Promise<AccountUnlockableCoinsResponse> {
    const data = AccountUnlockableCoinsRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.lockup.Query', 'AccountUnlockableCoins', data)
    return promise.then((data) => AccountUnlockableCoinsResponse.decode(new Reader(data)))
  }

  AccountUnlockingCoins(request: AccountUnlockingCoinsRequest): Promise<AccountUnlockingCoinsResponse> {
    const data = AccountUnlockingCoinsRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.lockup.Query', 'AccountUnlockingCoins', data)
    return promise.then((data) => AccountUnlockingCoinsResponse.decode(new Reader(data)))
  }

  AccountLockedCoins(request: AccountLockedCoinsRequest): Promise<AccountLockedCoinsResponse> {
    const data = AccountLockedCoinsRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.lockup.Query', 'AccountLockedCoins', data)
    return promise.then((data) => AccountLockedCoinsResponse.decode(new Reader(data)))
  }

  AccountLockedPastTime(request: AccountLockedPastTimeRequest): Promise<AccountLockedPastTimeResponse> {
    const data = AccountLockedPastTimeRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.lockup.Query', 'AccountLockedPastTime', data)
    return promise.then((data) => AccountLockedPastTimeResponse.decode(new Reader(data)))
  }

  AccountLockedPastTimeNotUnlockingOnly(request: AccountLockedPastTimeNotUnlockingOnlyRequest): Promise<AccountLockedPastTimeNotUnlockingOnlyResponse> {
    const data = AccountLockedPastTimeNotUnlockingOnlyRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.lockup.Query', 'AccountLockedPastTimeNotUnlockingOnly', data)
    return promise.then((data) => AccountLockedPastTimeNotUnlockingOnlyResponse.decode(new Reader(data)))
  }

  AccountUnlockedBeforeTime(request: AccountUnlockedBeforeTimeRequest): Promise<AccountUnlockedBeforeTimeResponse> {
    const data = AccountUnlockedBeforeTimeRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.lockup.Query', 'AccountUnlockedBeforeTime', data)
    return promise.then((data) => AccountUnlockedBeforeTimeResponse.decode(new Reader(data)))
  }

  AccountLockedPastTimeDenom(request: AccountLockedPastTimeDenomRequest): Promise<AccountLockedPastTimeDenomResponse> {
    const data = AccountLockedPastTimeDenomRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.lockup.Query', 'AccountLockedPastTimeDenom', data)
    return promise.then((data) => AccountLockedPastTimeDenomResponse.decode(new Reader(data)))
  }

  LockedDenom(request: LockedDenomRequest): Promise<LockedDenomResponse> {
    const data = LockedDenomRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.lockup.Query', 'LockedDenom', data)
    return promise.then((data) => LockedDenomResponse.decode(new Reader(data)))
  }

  LockedByID(request: LockedRequest): Promise<LockedResponse> {
    const data = LockedRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.lockup.Query', 'LockedByID', data)
    return promise.then((data) => LockedResponse.decode(new Reader(data)))
  }

  SyntheticLockupsByLockupID(request: SyntheticLockupsByLockupIDRequest): Promise<SyntheticLockupsByLockupIDResponse> {
    const data = SyntheticLockupsByLockupIDRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.lockup.Query', 'SyntheticLockupsByLockupID', data)
    return promise.then((data) => SyntheticLockupsByLockupIDResponse.decode(new Reader(data)))
  }

  AccountLockedLongerDuration(request: AccountLockedLongerDurationRequest): Promise<AccountLockedLongerDurationResponse> {
    const data = AccountLockedLongerDurationRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.lockup.Query', 'AccountLockedLongerDuration', data)
    return promise.then((data) => AccountLockedLongerDurationResponse.decode(new Reader(data)))
  }

  AccountLockedLongerDurationNotUnlockingOnly(
    request: AccountLockedLongerDurationNotUnlockingOnlyRequest
  ): Promise<AccountLockedLongerDurationNotUnlockingOnlyResponse> {
    const data = AccountLockedLongerDurationNotUnlockingOnlyRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.lockup.Query', 'AccountLockedLongerDurationNotUnlockingOnly', data)
    return promise.then((data) => AccountLockedLongerDurationNotUnlockingOnlyResponse.decode(new Reader(data)))
  }

  AccountLockedLongerDurationDenom(request: AccountLockedLongerDurationDenomRequest): Promise<AccountLockedLongerDurationDenomResponse> {
    const data = AccountLockedLongerDurationDenomRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.lockup.Query', 'AccountLockedLongerDurationDenom', data)
    return promise.then((data) => AccountLockedLongerDurationDenomResponse.decode(new Reader(data)))
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

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000
  const nanos = (date.getTime() % 1_000) * 1_000_000
  return { seconds, nanos }
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000
  millis += t.nanos / 1_000_000
  return new Date(millis)
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o
  } else if (typeof o === 'string') {
    return new Date(o)
  } else {
    return fromTimestamp(Timestamp.fromJSON(o))
  }
}

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
