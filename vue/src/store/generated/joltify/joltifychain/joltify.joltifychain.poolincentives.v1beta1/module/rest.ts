/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface QueryGaugeIdsResponseGaugeIdWithDuration {
  /** @format uint64 */
  gauge_id?: string;
  duration?: string;
}

export interface IncentivesGauge {
  /** @format uint64 */
  id?: string;
  is_perpetual?: boolean;
  distribute_to?: LockupQueryCondition;

  /** total amount of Coins that has been in the gauge. */
  coins?: V1Beta1Coin[];

  /** @format date-time */
  start_time?: string;

  /** @format uint64 */
  num_epochs_paid_over?: string;

  /** @format uint64 */
  filled_epochs?: string;
  distributed_coins?: V1Beta1Coin[];
}

export enum LockupLockQueryType {
  ByDuration = "ByDuration",
  ByTime = "ByTime",
}

export interface LockupQueryCondition {
  lock_query_type?: LockupLockQueryType;
  denom?: string;
  duration?: string;

  /** @format date-time */
  timestamp?: string;
}

export interface ProtobufAny {
  "@type"?: string;
}

export interface RpcStatus {
  /** @format int32 */
  code?: number;
  message?: string;
  details?: ProtobufAny[];
}

/**
* Coin defines a token with a denomination and an amount.

NOTE: The amount field is an Int which implements the custom method
signatures required by gogoproto.
*/
export interface V1Beta1Coin {
  denom?: string;
  amount?: string;
}

export interface V1Beta1DistrInfo {
  total_weight?: string;
  records?: V1Beta1DistrRecord[];
}

export interface V1Beta1DistrRecord {
  /** @format uint64 */
  gauge_id?: string;
  weight?: string;
}

export interface V1Beta1IncentivizedPool {
  /** @format uint64 */
  pool_id?: string;
  lockable_duration?: string;

  /** @format uint64 */
  gauge_id?: string;
}

export interface V1Beta1Params {
  /**
   * minted_denom is the denomination of the coin expected to be minted by the
   * minting module. Pool-incentives module doesn’t actually mint the coin
   * itself, but rather manages the distribution of coins that matches the
   * defined minted_denom.
   */
  minted_denom?: string;
}

export interface V1Beta1QueryDistrInfoResponse {
  distr_info?: V1Beta1DistrInfo;
}

export interface V1Beta1QueryExternalIncentiveGaugesResponse {
  data?: IncentivesGauge[];
}

export interface V1Beta1QueryGaugeIdsResponse {
  gauge_ids_with_duration?: QueryGaugeIdsResponseGaugeIdWithDuration[];
}

export interface V1Beta1QueryIncentivizedPoolsResponse {
  incentivized_pools?: V1Beta1IncentivizedPool[];
}

export interface V1Beta1QueryLockableDurationsResponse {
  lockable_durations?: string[];
}

export interface V1Beta1QueryParamsResponse {
  params?: V1Beta1Params;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: keyof Omit<Body, "body" | "bodyUsed">;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType) => RequestParams | void;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType = null as any;
  private securityWorker: null | ApiConfig<SecurityDataType>["securityWorker"] = null;
  private abortControllers = new Map<CancelToken, AbortController>();

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType) => {
    this.securityData = data;
  };

  private addQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];

    return (
      encodeURIComponent(key) +
      "=" +
      encodeURIComponent(Array.isArray(value) ? value.join(",") : typeof value === "number" ? value : `${value}`)
    );
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) =>
        typeof query[key] === "object" && !Array.isArray(query[key])
          ? this.toQueryString(query[key] as QueryParamsType)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((data, key) => {
        data.append(key, input[key]);
        return data;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format = "json",
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams = (secure && this.securityWorker && this.securityWorker(this.securityData)) || {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];

    return fetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = (null as unknown) as T;
      r.error = (null as unknown) as E;

      const data = await response[format]()
        .then((data) => {
          if (r.ok) {
            r.data = data;
          } else {
            r.error = data;
          }
          return r;
        })
        .catch((e) => {
          r.error = e;
          return r;
        });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title pool_incentives/v1beta1/genesis.proto
 * @version version not set
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Query
   * @name QueryDistrInfo
   * @request GET:/joltify/pool_incentives/v1beta1/distr_info
   */
  queryDistrInfo = (params: RequestParams = {}) =>
    this.request<V1Beta1QueryDistrInfoResponse, RpcStatus>({
      path: `/joltify/pool_incentives/v1beta1/distr_info`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryExternalIncentiveGauges
   * @request GET:/joltify/pool_incentives/v1beta1/external_incentive_gauges
   */
  queryExternalIncentiveGauges = (params: RequestParams = {}) =>
    this.request<V1Beta1QueryExternalIncentiveGaugesResponse, RpcStatus>({
      path: `/joltify/pool_incentives/v1beta1/external_incentive_gauges`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryGaugeIds
   * @summary GaugeIds takes the pool id and returns the matching gauge ids and durations
   * @request GET:/joltify/pool_incentives/v1beta1/gauge-ids/{pool_id}
   */
  queryGaugeIds = (pool_id: string, params: RequestParams = {}) =>
    this.request<V1Beta1QueryGaugeIdsResponse, RpcStatus>({
      path: `/joltify/pool_incentives/v1beta1/gauge-ids/${pool_id}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryIncentivizedPools
   * @request GET:/joltify/pool_incentives/v1beta1/incentivized_pools
   */
  queryIncentivizedPools = (params: RequestParams = {}) =>
    this.request<V1Beta1QueryIncentivizedPoolsResponse, RpcStatus>({
      path: `/joltify/pool_incentives/v1beta1/incentivized_pools`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryLockableDurations
   * @request GET:/joltify/pool_incentives/v1beta1/lockable_durations
   */
  queryLockableDurations = (params: RequestParams = {}) =>
    this.request<V1Beta1QueryLockableDurationsResponse, RpcStatus>({
      path: `/joltify/pool_incentives/v1beta1/lockable_durations`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryParams
   * @request GET:/joltify/pool_incentives/v1beta1/params
   */
  queryParams = (params: RequestParams = {}) =>
    this.request<V1Beta1QueryParamsResponse, RpcStatus>({
      path: `/joltify/pool_incentives/v1beta1/params`,
      method: "GET",
      format: "json",
      ...params,
    });
}
