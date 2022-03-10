/* eslint-disable */
import { Reader, Writer } from 'protobufjs/minimal'
import { OutboundTx } from '../vault/outbound_tx'
import { PageRequest, PageResponse } from '../cosmos/base/query/v1beta1/pagination'
import { IssueToken } from '../vault/issue_token'
import { PoolProposal } from '../vault/create_pool'

export const protobufPackage = 'joltify.joltifychain.vault'

export interface QueryGetOutboundTxRequest {
  requestID: string
}

export interface QueryGetOutboundTxResponse {
  outboundTx: OutboundTx | undefined
}

export interface QueryAllOutboundTxRequest {
  pagination: PageRequest | undefined
}

export interface QueryAllOutboundTxResponse {
  outboundTx: OutboundTx[]
  pagination: PageResponse | undefined
}

/** this line is used by starport scaffolding # 3 */
export interface QueryGetIssueTokenRequest {
  index: string
}

export interface QueryGetIssueTokenResponse {
  IssueToken: IssueToken | undefined
}

export interface QueryAllIssueTokenRequest {
  pagination: PageRequest | undefined
}

export interface QueryAllIssueTokenResponse {
  IssueToken: IssueToken[]
  pagination: PageResponse | undefined
}

export interface QueryGetCreatePoolRequest {
  index: string
}

export interface QueryGetCreatePoolResponse {
  CreatePool: PoolProposal | undefined
}

export interface poolInfo {
  BlockHeight: string
  CreatePool: PoolProposal | undefined
}

export interface QueryLastPoolResponse {
  pools: poolInfo[]
}

export interface QueryAllCreatePoolRequest {
  pagination: PageRequest | undefined
}

export interface QueryLatestPoolRequest {
  pagination: PageRequest | undefined
}

export interface QueryAllCreatePoolResponse {
  CreatePool: PoolProposal[]
  pagination: PageResponse | undefined
}

const baseQueryGetOutboundTxRequest: object = { requestID: '' }

export const QueryGetOutboundTxRequest = {
  encode(message: QueryGetOutboundTxRequest, writer: Writer = Writer.create()): Writer {
    if (message.requestID !== '') {
      writer.uint32(10).string(message.requestID)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetOutboundTxRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryGetOutboundTxRequest } as QueryGetOutboundTxRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.requestID = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryGetOutboundTxRequest {
    const message = { ...baseQueryGetOutboundTxRequest } as QueryGetOutboundTxRequest
    if (object.requestID !== undefined && object.requestID !== null) {
      message.requestID = String(object.requestID)
    } else {
      message.requestID = ''
    }
    return message
  },

  toJSON(message: QueryGetOutboundTxRequest): unknown {
    const obj: any = {}
    message.requestID !== undefined && (obj.requestID = message.requestID)
    return obj
  },

  fromPartial(object: DeepPartial<QueryGetOutboundTxRequest>): QueryGetOutboundTxRequest {
    const message = { ...baseQueryGetOutboundTxRequest } as QueryGetOutboundTxRequest
    if (object.requestID !== undefined && object.requestID !== null) {
      message.requestID = object.requestID
    } else {
      message.requestID = ''
    }
    return message
  }
}

const baseQueryGetOutboundTxResponse: object = {}

export const QueryGetOutboundTxResponse = {
  encode(message: QueryGetOutboundTxResponse, writer: Writer = Writer.create()): Writer {
    if (message.outboundTx !== undefined) {
      OutboundTx.encode(message.outboundTx, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetOutboundTxResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryGetOutboundTxResponse } as QueryGetOutboundTxResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.outboundTx = OutboundTx.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryGetOutboundTxResponse {
    const message = { ...baseQueryGetOutboundTxResponse } as QueryGetOutboundTxResponse
    if (object.outboundTx !== undefined && object.outboundTx !== null) {
      message.outboundTx = OutboundTx.fromJSON(object.outboundTx)
    } else {
      message.outboundTx = undefined
    }
    return message
  },

  toJSON(message: QueryGetOutboundTxResponse): unknown {
    const obj: any = {}
    message.outboundTx !== undefined && (obj.outboundTx = message.outboundTx ? OutboundTx.toJSON(message.outboundTx) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryGetOutboundTxResponse>): QueryGetOutboundTxResponse {
    const message = { ...baseQueryGetOutboundTxResponse } as QueryGetOutboundTxResponse
    if (object.outboundTx !== undefined && object.outboundTx !== null) {
      message.outboundTx = OutboundTx.fromPartial(object.outboundTx)
    } else {
      message.outboundTx = undefined
    }
    return message
  }
}

const baseQueryAllOutboundTxRequest: object = {}

export const QueryAllOutboundTxRequest = {
  encode(message: QueryAllOutboundTxRequest, writer: Writer = Writer.create()): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllOutboundTxRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryAllOutboundTxRequest } as QueryAllOutboundTxRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryAllOutboundTxRequest {
    const message = { ...baseQueryAllOutboundTxRequest } as QueryAllOutboundTxRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryAllOutboundTxRequest): unknown {
    const obj: any = {}
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryAllOutboundTxRequest>): QueryAllOutboundTxRequest {
    const message = { ...baseQueryAllOutboundTxRequest } as QueryAllOutboundTxRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

const baseQueryAllOutboundTxResponse: object = {}

export const QueryAllOutboundTxResponse = {
  encode(message: QueryAllOutboundTxResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.outboundTx) {
      OutboundTx.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllOutboundTxResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryAllOutboundTxResponse } as QueryAllOutboundTxResponse
    message.outboundTx = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.outboundTx.push(OutboundTx.decode(reader, reader.uint32()))
          break
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryAllOutboundTxResponse {
    const message = { ...baseQueryAllOutboundTxResponse } as QueryAllOutboundTxResponse
    message.outboundTx = []
    if (object.outboundTx !== undefined && object.outboundTx !== null) {
      for (const e of object.outboundTx) {
        message.outboundTx.push(OutboundTx.fromJSON(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryAllOutboundTxResponse): unknown {
    const obj: any = {}
    if (message.outboundTx) {
      obj.outboundTx = message.outboundTx.map((e) => (e ? OutboundTx.toJSON(e) : undefined))
    } else {
      obj.outboundTx = []
    }
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryAllOutboundTxResponse>): QueryAllOutboundTxResponse {
    const message = { ...baseQueryAllOutboundTxResponse } as QueryAllOutboundTxResponse
    message.outboundTx = []
    if (object.outboundTx !== undefined && object.outboundTx !== null) {
      for (const e of object.outboundTx) {
        message.outboundTx.push(OutboundTx.fromPartial(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

const baseQueryGetIssueTokenRequest: object = { index: '' }

export const QueryGetIssueTokenRequest = {
  encode(message: QueryGetIssueTokenRequest, writer: Writer = Writer.create()): Writer {
    if (message.index !== '') {
      writer.uint32(10).string(message.index)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetIssueTokenRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryGetIssueTokenRequest } as QueryGetIssueTokenRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryGetIssueTokenRequest {
    const message = { ...baseQueryGetIssueTokenRequest } as QueryGetIssueTokenRequest
    if (object.index !== undefined && object.index !== null) {
      message.index = String(object.index)
    } else {
      message.index = ''
    }
    return message
  },

  toJSON(message: QueryGetIssueTokenRequest): unknown {
    const obj: any = {}
    message.index !== undefined && (obj.index = message.index)
    return obj
  },

  fromPartial(object: DeepPartial<QueryGetIssueTokenRequest>): QueryGetIssueTokenRequest {
    const message = { ...baseQueryGetIssueTokenRequest } as QueryGetIssueTokenRequest
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index
    } else {
      message.index = ''
    }
    return message
  }
}

const baseQueryGetIssueTokenResponse: object = {}

export const QueryGetIssueTokenResponse = {
  encode(message: QueryGetIssueTokenResponse, writer: Writer = Writer.create()): Writer {
    if (message.IssueToken !== undefined) {
      IssueToken.encode(message.IssueToken, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetIssueTokenResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryGetIssueTokenResponse } as QueryGetIssueTokenResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.IssueToken = IssueToken.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryGetIssueTokenResponse {
    const message = { ...baseQueryGetIssueTokenResponse } as QueryGetIssueTokenResponse
    if (object.IssueToken !== undefined && object.IssueToken !== null) {
      message.IssueToken = IssueToken.fromJSON(object.IssueToken)
    } else {
      message.IssueToken = undefined
    }
    return message
  },

  toJSON(message: QueryGetIssueTokenResponse): unknown {
    const obj: any = {}
    message.IssueToken !== undefined && (obj.IssueToken = message.IssueToken ? IssueToken.toJSON(message.IssueToken) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryGetIssueTokenResponse>): QueryGetIssueTokenResponse {
    const message = { ...baseQueryGetIssueTokenResponse } as QueryGetIssueTokenResponse
    if (object.IssueToken !== undefined && object.IssueToken !== null) {
      message.IssueToken = IssueToken.fromPartial(object.IssueToken)
    } else {
      message.IssueToken = undefined
    }
    return message
  }
}

const baseQueryAllIssueTokenRequest: object = {}

export const QueryAllIssueTokenRequest = {
  encode(message: QueryAllIssueTokenRequest, writer: Writer = Writer.create()): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllIssueTokenRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryAllIssueTokenRequest } as QueryAllIssueTokenRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryAllIssueTokenRequest {
    const message = { ...baseQueryAllIssueTokenRequest } as QueryAllIssueTokenRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryAllIssueTokenRequest): unknown {
    const obj: any = {}
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryAllIssueTokenRequest>): QueryAllIssueTokenRequest {
    const message = { ...baseQueryAllIssueTokenRequest } as QueryAllIssueTokenRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

const baseQueryAllIssueTokenResponse: object = {}

export const QueryAllIssueTokenResponse = {
  encode(message: QueryAllIssueTokenResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.IssueToken) {
      IssueToken.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllIssueTokenResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryAllIssueTokenResponse } as QueryAllIssueTokenResponse
    message.IssueToken = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.IssueToken.push(IssueToken.decode(reader, reader.uint32()))
          break
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryAllIssueTokenResponse {
    const message = { ...baseQueryAllIssueTokenResponse } as QueryAllIssueTokenResponse
    message.IssueToken = []
    if (object.IssueToken !== undefined && object.IssueToken !== null) {
      for (const e of object.IssueToken) {
        message.IssueToken.push(IssueToken.fromJSON(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryAllIssueTokenResponse): unknown {
    const obj: any = {}
    if (message.IssueToken) {
      obj.IssueToken = message.IssueToken.map((e) => (e ? IssueToken.toJSON(e) : undefined))
    } else {
      obj.IssueToken = []
    }
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryAllIssueTokenResponse>): QueryAllIssueTokenResponse {
    const message = { ...baseQueryAllIssueTokenResponse } as QueryAllIssueTokenResponse
    message.IssueToken = []
    if (object.IssueToken !== undefined && object.IssueToken !== null) {
      for (const e of object.IssueToken) {
        message.IssueToken.push(IssueToken.fromPartial(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

const baseQueryGetCreatePoolRequest: object = { index: '' }

export const QueryGetCreatePoolRequest = {
  encode(message: QueryGetCreatePoolRequest, writer: Writer = Writer.create()): Writer {
    if (message.index !== '') {
      writer.uint32(10).string(message.index)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetCreatePoolRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryGetCreatePoolRequest } as QueryGetCreatePoolRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryGetCreatePoolRequest {
    const message = { ...baseQueryGetCreatePoolRequest } as QueryGetCreatePoolRequest
    if (object.index !== undefined && object.index !== null) {
      message.index = String(object.index)
    } else {
      message.index = ''
    }
    return message
  },

  toJSON(message: QueryGetCreatePoolRequest): unknown {
    const obj: any = {}
    message.index !== undefined && (obj.index = message.index)
    return obj
  },

  fromPartial(object: DeepPartial<QueryGetCreatePoolRequest>): QueryGetCreatePoolRequest {
    const message = { ...baseQueryGetCreatePoolRequest } as QueryGetCreatePoolRequest
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index
    } else {
      message.index = ''
    }
    return message
  }
}

const baseQueryGetCreatePoolResponse: object = {}

export const QueryGetCreatePoolResponse = {
  encode(message: QueryGetCreatePoolResponse, writer: Writer = Writer.create()): Writer {
    if (message.CreatePool !== undefined) {
      PoolProposal.encode(message.CreatePool, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetCreatePoolResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryGetCreatePoolResponse } as QueryGetCreatePoolResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.CreatePool = PoolProposal.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryGetCreatePoolResponse {
    const message = { ...baseQueryGetCreatePoolResponse } as QueryGetCreatePoolResponse
    if (object.CreatePool !== undefined && object.CreatePool !== null) {
      message.CreatePool = PoolProposal.fromJSON(object.CreatePool)
    } else {
      message.CreatePool = undefined
    }
    return message
  },

  toJSON(message: QueryGetCreatePoolResponse): unknown {
    const obj: any = {}
    message.CreatePool !== undefined && (obj.CreatePool = message.CreatePool ? PoolProposal.toJSON(message.CreatePool) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryGetCreatePoolResponse>): QueryGetCreatePoolResponse {
    const message = { ...baseQueryGetCreatePoolResponse } as QueryGetCreatePoolResponse
    if (object.CreatePool !== undefined && object.CreatePool !== null) {
      message.CreatePool = PoolProposal.fromPartial(object.CreatePool)
    } else {
      message.CreatePool = undefined
    }
    return message
  }
}

const basepoolInfo: object = { BlockHeight: '' }

export const poolInfo = {
  encode(message: poolInfo, writer: Writer = Writer.create()): Writer {
    if (message.BlockHeight !== '') {
      writer.uint32(10).string(message.BlockHeight)
    }
    if (message.CreatePool !== undefined) {
      PoolProposal.encode(message.CreatePool, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): poolInfo {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...basepoolInfo } as poolInfo
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.BlockHeight = reader.string()
          break
        case 2:
          message.CreatePool = PoolProposal.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): poolInfo {
    const message = { ...basepoolInfo } as poolInfo
    if (object.BlockHeight !== undefined && object.BlockHeight !== null) {
      message.BlockHeight = String(object.BlockHeight)
    } else {
      message.BlockHeight = ''
    }
    if (object.CreatePool !== undefined && object.CreatePool !== null) {
      message.CreatePool = PoolProposal.fromJSON(object.CreatePool)
    } else {
      message.CreatePool = undefined
    }
    return message
  },

  toJSON(message: poolInfo): unknown {
    const obj: any = {}
    message.BlockHeight !== undefined && (obj.BlockHeight = message.BlockHeight)
    message.CreatePool !== undefined && (obj.CreatePool = message.CreatePool ? PoolProposal.toJSON(message.CreatePool) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<poolInfo>): poolInfo {
    const message = { ...basepoolInfo } as poolInfo
    if (object.BlockHeight !== undefined && object.BlockHeight !== null) {
      message.BlockHeight = object.BlockHeight
    } else {
      message.BlockHeight = ''
    }
    if (object.CreatePool !== undefined && object.CreatePool !== null) {
      message.CreatePool = PoolProposal.fromPartial(object.CreatePool)
    } else {
      message.CreatePool = undefined
    }
    return message
  }
}

const baseQueryLastPoolResponse: object = {}

export const QueryLastPoolResponse = {
  encode(message: QueryLastPoolResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.pools) {
      poolInfo.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryLastPoolResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryLastPoolResponse } as QueryLastPoolResponse
    message.pools = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.pools.push(poolInfo.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryLastPoolResponse {
    const message = { ...baseQueryLastPoolResponse } as QueryLastPoolResponse
    message.pools = []
    if (object.pools !== undefined && object.pools !== null) {
      for (const e of object.pools) {
        message.pools.push(poolInfo.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: QueryLastPoolResponse): unknown {
    const obj: any = {}
    if (message.pools) {
      obj.pools = message.pools.map((e) => (e ? poolInfo.toJSON(e) : undefined))
    } else {
      obj.pools = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<QueryLastPoolResponse>): QueryLastPoolResponse {
    const message = { ...baseQueryLastPoolResponse } as QueryLastPoolResponse
    message.pools = []
    if (object.pools !== undefined && object.pools !== null) {
      for (const e of object.pools) {
        message.pools.push(poolInfo.fromPartial(e))
      }
    }
    return message
  }
}

const baseQueryAllCreatePoolRequest: object = {}

export const QueryAllCreatePoolRequest = {
  encode(message: QueryAllCreatePoolRequest, writer: Writer = Writer.create()): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllCreatePoolRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryAllCreatePoolRequest } as QueryAllCreatePoolRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryAllCreatePoolRequest {
    const message = { ...baseQueryAllCreatePoolRequest } as QueryAllCreatePoolRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryAllCreatePoolRequest): unknown {
    const obj: any = {}
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryAllCreatePoolRequest>): QueryAllCreatePoolRequest {
    const message = { ...baseQueryAllCreatePoolRequest } as QueryAllCreatePoolRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

const baseQueryLatestPoolRequest: object = {}

export const QueryLatestPoolRequest = {
  encode(message: QueryLatestPoolRequest, writer: Writer = Writer.create()): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryLatestPoolRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryLatestPoolRequest } as QueryLatestPoolRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryLatestPoolRequest {
    const message = { ...baseQueryLatestPoolRequest } as QueryLatestPoolRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryLatestPoolRequest): unknown {
    const obj: any = {}
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryLatestPoolRequest>): QueryLatestPoolRequest {
    const message = { ...baseQueryLatestPoolRequest } as QueryLatestPoolRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

const baseQueryAllCreatePoolResponse: object = {}

export const QueryAllCreatePoolResponse = {
  encode(message: QueryAllCreatePoolResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.CreatePool) {
      PoolProposal.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllCreatePoolResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryAllCreatePoolResponse } as QueryAllCreatePoolResponse
    message.CreatePool = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.CreatePool.push(PoolProposal.decode(reader, reader.uint32()))
          break
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryAllCreatePoolResponse {
    const message = { ...baseQueryAllCreatePoolResponse } as QueryAllCreatePoolResponse
    message.CreatePool = []
    if (object.CreatePool !== undefined && object.CreatePool !== null) {
      for (const e of object.CreatePool) {
        message.CreatePool.push(PoolProposal.fromJSON(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryAllCreatePoolResponse): unknown {
    const obj: any = {}
    if (message.CreatePool) {
      obj.CreatePool = message.CreatePool.map((e) => (e ? PoolProposal.toJSON(e) : undefined))
    } else {
      obj.CreatePool = []
    }
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryAllCreatePoolResponse>): QueryAllCreatePoolResponse {
    const message = { ...baseQueryAllCreatePoolResponse } as QueryAllCreatePoolResponse
    message.CreatePool = []
    if (object.CreatePool !== undefined && object.CreatePool !== null) {
      for (const e of object.CreatePool) {
        message.CreatePool.push(PoolProposal.fromPartial(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

/** Query defines the gRPC querier service. */
export interface Query {
  /** Queries a OutboundTx by index. */
  OutboundTx(request: QueryGetOutboundTxRequest): Promise<QueryGetOutboundTxResponse>
  /** Queries a list of OutboundTx items. */
  OutboundTxAll(request: QueryAllOutboundTxRequest): Promise<QueryAllOutboundTxResponse>
  /** Queries a issueToken by index. */
  IssueToken(request: QueryGetIssueTokenRequest): Promise<QueryGetIssueTokenResponse>
  /** Queries a list of issueToken items. */
  IssueTokenAll(request: QueryAllIssueTokenRequest): Promise<QueryAllIssueTokenResponse>
  /** Queries a createPool by index. */
  CreatePool(request: QueryGetCreatePoolRequest): Promise<QueryGetCreatePoolResponse>
  /** Queries a list of createPool items. */
  CreatePoolAll(request: QueryAllCreatePoolRequest): Promise<QueryAllCreatePoolResponse>
  /** Queries a createPool by index. */
  GetLastPool(request: QueryLatestPoolRequest): Promise<QueryLastPoolResponse>
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
  }
  OutboundTx(request: QueryGetOutboundTxRequest): Promise<QueryGetOutboundTxResponse> {
    const data = QueryGetOutboundTxRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.vault.Query', 'OutboundTx', data)
    return promise.then((data) => QueryGetOutboundTxResponse.decode(new Reader(data)))
  }

  OutboundTxAll(request: QueryAllOutboundTxRequest): Promise<QueryAllOutboundTxResponse> {
    const data = QueryAllOutboundTxRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.vault.Query', 'OutboundTxAll', data)
    return promise.then((data) => QueryAllOutboundTxResponse.decode(new Reader(data)))
  }

  IssueToken(request: QueryGetIssueTokenRequest): Promise<QueryGetIssueTokenResponse> {
    const data = QueryGetIssueTokenRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.vault.Query', 'IssueToken', data)
    return promise.then((data) => QueryGetIssueTokenResponse.decode(new Reader(data)))
  }

  IssueTokenAll(request: QueryAllIssueTokenRequest): Promise<QueryAllIssueTokenResponse> {
    const data = QueryAllIssueTokenRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.vault.Query', 'IssueTokenAll', data)
    return promise.then((data) => QueryAllIssueTokenResponse.decode(new Reader(data)))
  }

  CreatePool(request: QueryGetCreatePoolRequest): Promise<QueryGetCreatePoolResponse> {
    const data = QueryGetCreatePoolRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.vault.Query', 'CreatePool', data)
    return promise.then((data) => QueryGetCreatePoolResponse.decode(new Reader(data)))
  }

  CreatePoolAll(request: QueryAllCreatePoolRequest): Promise<QueryAllCreatePoolResponse> {
    const data = QueryAllCreatePoolRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.vault.Query', 'CreatePoolAll', data)
    return promise.then((data) => QueryAllCreatePoolResponse.decode(new Reader(data)))
  }

  GetLastPool(request: QueryLatestPoolRequest): Promise<QueryLastPoolResponse> {
    const data = QueryLatestPoolRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.vault.Query', 'GetLastPool', data)
    return promise.then((data) => QueryLastPoolResponse.decode(new Reader(data)))
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>
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
