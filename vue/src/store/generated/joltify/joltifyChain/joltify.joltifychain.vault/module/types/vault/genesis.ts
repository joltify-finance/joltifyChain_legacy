/* eslint-disable */
import { Params } from '../vault/staking'
import { IssueToken } from '../vault/issue_token'
import { CreatePool } from '../vault/create_pool'
import { Writer, Reader } from 'protobufjs/minimal'

export const protobufPackage = 'joltify.joltifychain.vault'

/** GenesisState defines the vault module's genesis state. */
export interface GenesisState {
  /** params defines all the paramaters of related to deposit. */
  params: Params | undefined
  /** this line is used by starport scaffolding # genesis/proto/state */
  issueTokenList: IssueToken[]
  /** this line is used by starport scaffolding # genesis/proto/stateField */
  createPoolList: CreatePool[]
  exported: boolean
}

const baseGenesisState: object = { exported: false }

export const GenesisState = {
  encode(message: GenesisState, writer: Writer = Writer.create()): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim()
    }
    for (const v of message.issueTokenList) {
      IssueToken.encode(v!, writer.uint32(18).fork()).ldelim()
    }
    for (const v of message.createPoolList) {
      CreatePool.encode(v!, writer.uint32(26).fork()).ldelim()
    }
    if (message.exported === true) {
      writer.uint32(32).bool(message.exported)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseGenesisState } as GenesisState
    message.issueTokenList = []
    message.createPoolList = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32())
          break
        case 2:
          message.issueTokenList.push(IssueToken.decode(reader, reader.uint32()))
          break
        case 3:
          message.createPoolList.push(CreatePool.decode(reader, reader.uint32()))
          break
        case 4:
          message.exported = reader.bool()
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
    message.issueTokenList = []
    message.createPoolList = []
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params)
    } else {
      message.params = undefined
    }
    if (object.issueTokenList !== undefined && object.issueTokenList !== null) {
      for (const e of object.issueTokenList) {
        message.issueTokenList.push(IssueToken.fromJSON(e))
      }
    }
    if (object.createPoolList !== undefined && object.createPoolList !== null) {
      for (const e of object.createPoolList) {
        message.createPoolList.push(CreatePool.fromJSON(e))
      }
    }
    if (object.exported !== undefined && object.exported !== null) {
      message.exported = Boolean(object.exported)
    } else {
      message.exported = false
    }
    return message
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {}
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined)
    if (message.issueTokenList) {
      obj.issueTokenList = message.issueTokenList.map((e) => (e ? IssueToken.toJSON(e) : undefined))
    } else {
      obj.issueTokenList = []
    }
    if (message.createPoolList) {
      obj.createPoolList = message.createPoolList.map((e) => (e ? CreatePool.toJSON(e) : undefined))
    } else {
      obj.createPoolList = []
    }
    message.exported !== undefined && (obj.exported = message.exported)
    return obj
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState
    message.issueTokenList = []
    message.createPoolList = []
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params)
    } else {
      message.params = undefined
    }
    if (object.issueTokenList !== undefined && object.issueTokenList !== null) {
      for (const e of object.issueTokenList) {
        message.issueTokenList.push(IssueToken.fromPartial(e))
      }
    }
    if (object.createPoolList !== undefined && object.createPoolList !== null) {
      for (const e of object.createPoolList) {
        message.createPoolList.push(CreatePool.fromPartial(e))
      }
    }
    if (object.exported !== undefined && object.exported !== null) {
      message.exported = object.exported
    } else {
      message.exported = false
    }
    return message
  }
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
