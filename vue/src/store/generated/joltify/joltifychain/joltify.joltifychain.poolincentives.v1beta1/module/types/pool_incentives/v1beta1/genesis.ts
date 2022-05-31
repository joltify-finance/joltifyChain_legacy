/* eslint-disable */
import { Params, DistrInfo } from '../../pool_incentives/v1beta1/incentives'
import { Duration } from '../../google/protobuf/duration'
import { Writer, Reader } from 'protobufjs/minimal'

export const protobufPackage = 'joltify.joltifychain.poolincentives.v1beta1'

/** GenesisState defines the pool incentives module's genesis state. */
export interface GenesisState {
  /** params defines all the paramaters of the module. */
  params: Params | undefined
  lockable_durations: Duration[]
  distr_info: DistrInfo | undefined
}

const baseGenesisState: object = {}

export const GenesisState = {
  encode(message: GenesisState, writer: Writer = Writer.create()): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim()
    }
    for (const v of message.lockable_durations) {
      Duration.encode(v!, writer.uint32(18).fork()).ldelim()
    }
    if (message.distr_info !== undefined) {
      DistrInfo.encode(message.distr_info, writer.uint32(26).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseGenesisState } as GenesisState
    message.lockable_durations = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32())
          break
        case 2:
          message.lockable_durations.push(Duration.decode(reader, reader.uint32()))
          break
        case 3:
          message.distr_info = DistrInfo.decode(reader, reader.uint32())
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
    message.lockable_durations = []
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params)
    } else {
      message.params = undefined
    }
    if (object.lockable_durations !== undefined && object.lockable_durations !== null) {
      for (const e of object.lockable_durations) {
        message.lockable_durations.push(Duration.fromJSON(e))
      }
    }
    if (object.distr_info !== undefined && object.distr_info !== null) {
      message.distr_info = DistrInfo.fromJSON(object.distr_info)
    } else {
      message.distr_info = undefined
    }
    return message
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {}
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined)
    if (message.lockable_durations) {
      obj.lockable_durations = message.lockable_durations.map((e) => (e ? Duration.toJSON(e) : undefined))
    } else {
      obj.lockable_durations = []
    }
    message.distr_info !== undefined && (obj.distr_info = message.distr_info ? DistrInfo.toJSON(message.distr_info) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState
    message.lockable_durations = []
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params)
    } else {
      message.params = undefined
    }
    if (object.lockable_durations !== undefined && object.lockable_durations !== null) {
      for (const e of object.lockable_durations) {
        message.lockable_durations.push(Duration.fromPartial(e))
      }
    }
    if (object.distr_info !== undefined && object.distr_info !== null) {
      message.distr_info = DistrInfo.fromPartial(object.distr_info)
    } else {
      message.distr_info = undefined
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
