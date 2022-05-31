/* eslint-disable */
import { DistrRecord } from '../../pool_incentives/v1beta1/incentives'
import { Writer, Reader } from 'protobufjs/minimal'

export const protobufPackage = 'joltify.joltifychain.poolincentives.v1beta1'

/**
 * ReplacePoolIncentivesProposal is a gov Content type for updating the pool
 * incentives. If a ReplacePoolIncentivesProposal passes, the proposal’s records
 * override the existing DistrRecords set in the module. Each record has a
 * specified gauge id and weight, and the incentives are distributed to each
 * gauge according to weight/total_weight. The incentives are put in the fee
 * pool and it is allocated to gauges and community pool by the DistrRecords
 * configuration. Note that gaugeId=0 represents the community pool.
 */
export interface ReplacePoolIncentivesProposal {
  title: string
  description: string
  records: DistrRecord[]
}

/**
 * For example: if the existing DistrRecords were:
 * [(Gauge 0, 5), (Gauge 1, 6), (Gauge 2, 6)]
 * An UpdatePoolIncentivesProposal includes
 * [(Gauge 1, 0), (Gauge 2, 4), (Gauge 3, 10)]
 * This would delete Gauge 1, Edit Gauge 2, and Add Gauge 3
 * The result DistrRecords in state would be:
 * [(Gauge 0, 5), (Gauge 2, 4), (Gauge 3, 10)]
 */
export interface UpdatePoolIncentivesProposal {
  title: string
  description: string
  records: DistrRecord[]
}

const baseReplacePoolIncentivesProposal: object = { title: '', description: '' }

export const ReplacePoolIncentivesProposal = {
  encode(message: ReplacePoolIncentivesProposal, writer: Writer = Writer.create()): Writer {
    if (message.title !== '') {
      writer.uint32(10).string(message.title)
    }
    if (message.description !== '') {
      writer.uint32(18).string(message.description)
    }
    for (const v of message.records) {
      DistrRecord.encode(v!, writer.uint32(26).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): ReplacePoolIncentivesProposal {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseReplacePoolIncentivesProposal } as ReplacePoolIncentivesProposal
    message.records = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string()
          break
        case 2:
          message.description = reader.string()
          break
        case 3:
          message.records.push(DistrRecord.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): ReplacePoolIncentivesProposal {
    const message = { ...baseReplacePoolIncentivesProposal } as ReplacePoolIncentivesProposal
    message.records = []
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title)
    } else {
      message.title = ''
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description)
    } else {
      message.description = ''
    }
    if (object.records !== undefined && object.records !== null) {
      for (const e of object.records) {
        message.records.push(DistrRecord.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: ReplacePoolIncentivesProposal): unknown {
    const obj: any = {}
    message.title !== undefined && (obj.title = message.title)
    message.description !== undefined && (obj.description = message.description)
    if (message.records) {
      obj.records = message.records.map((e) => (e ? DistrRecord.toJSON(e) : undefined))
    } else {
      obj.records = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<ReplacePoolIncentivesProposal>): ReplacePoolIncentivesProposal {
    const message = { ...baseReplacePoolIncentivesProposal } as ReplacePoolIncentivesProposal
    message.records = []
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title
    } else {
      message.title = ''
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description
    } else {
      message.description = ''
    }
    if (object.records !== undefined && object.records !== null) {
      for (const e of object.records) {
        message.records.push(DistrRecord.fromPartial(e))
      }
    }
    return message
  }
}

const baseUpdatePoolIncentivesProposal: object = { title: '', description: '' }

export const UpdatePoolIncentivesProposal = {
  encode(message: UpdatePoolIncentivesProposal, writer: Writer = Writer.create()): Writer {
    if (message.title !== '') {
      writer.uint32(10).string(message.title)
    }
    if (message.description !== '') {
      writer.uint32(18).string(message.description)
    }
    for (const v of message.records) {
      DistrRecord.encode(v!, writer.uint32(26).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): UpdatePoolIncentivesProposal {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseUpdatePoolIncentivesProposal } as UpdatePoolIncentivesProposal
    message.records = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string()
          break
        case 2:
          message.description = reader.string()
          break
        case 3:
          message.records.push(DistrRecord.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): UpdatePoolIncentivesProposal {
    const message = { ...baseUpdatePoolIncentivesProposal } as UpdatePoolIncentivesProposal
    message.records = []
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title)
    } else {
      message.title = ''
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description)
    } else {
      message.description = ''
    }
    if (object.records !== undefined && object.records !== null) {
      for (const e of object.records) {
        message.records.push(DistrRecord.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: UpdatePoolIncentivesProposal): unknown {
    const obj: any = {}
    message.title !== undefined && (obj.title = message.title)
    message.description !== undefined && (obj.description = message.description)
    if (message.records) {
      obj.records = message.records.map((e) => (e ? DistrRecord.toJSON(e) : undefined))
    } else {
      obj.records = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<UpdatePoolIncentivesProposal>): UpdatePoolIncentivesProposal {
    const message = { ...baseUpdatePoolIncentivesProposal } as UpdatePoolIncentivesProposal
    message.records = []
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title
    } else {
      message.title = ''
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description
    } else {
      message.description = ''
    }
    if (object.records !== undefined && object.records !== null) {
      for (const e of object.records) {
        message.records.push(DistrRecord.fromPartial(e))
      }
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
