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

export interface IncentivesActiveGaugesPerDenomResponse {
  data?: IncentivesGauge[];

  /** pagination defines an pagination for the response. */
  pagination?: V1Beta1PageResponse;
}

export interface IncentivesActiveGaugesResponse {
  data?: IncentivesGauge[];

  /** pagination defines an pagination for the response. */
  pagination?: V1Beta1PageResponse;
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

export interface IncentivesGaugeByIDResponse {
  gauge?: IncentivesGauge;
}

export interface IncentivesGaugesResponse {
  data?: IncentivesGauge[];

  /** pagination defines an pagination for the response. */
  pagination?: V1Beta1PageResponse;
}

export interface IncentivesModuleDistributedCoinsResponse {
  coins?: V1Beta1Coin[];
}

export interface IncentivesModuleToDistributeCoinsResponse {
  coins?: V1Beta1Coin[];
}

export type IncentivesMsgAddToGaugeResponse = object;

export type IncentivesMsgCreateGaugeResponse = object;

export interface IncentivesQueryLockableDurationsResponse {
  lockable_durations?: string[];
}

export interface IncentivesRewardsEstResponse {
  coins?: V1Beta1Coin[];
}

export interface IncentivesUpcomingGaugesPerDenomResponse {
  upcoming_gauges?: IncentivesGauge[];

  /**
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: V1Beta1PageResponse;
}

export interface IncentivesUpcomingGaugesResponse {
  data?: IncentivesGauge[];

  /** pagination defines an pagination for the response. */
  pagination?: V1Beta1PageResponse;
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

/**
* message SomeRequest {
         Foo some_parameter = 1;
         PageRequest pagination = 2;
 }
*/
export interface V1Beta1PageRequest {
  /**
   * key is a value returned in PageResponse.next_key to begin
   * querying the next page most efficiently. Only one of offset or key
   * should be set.
   * @format byte
   */
  key?: string;

  /**
   * offset is a numeric offset that can be used when key is unavailable.
   * It is less efficient than using key. Only one of offset or key should
   * be set.
   * @format uint64
   */
  offset?: string;

  /**
   * limit is the total number of results to be returned in the result page.
   * If left empty it will default to a value to be set by each app.
   * @format uint64
   */
  limit?: string;

  /**
   * count_total is set to true  to indicate that the result set should include
   * a count of the total number of items available for pagination in UIs.
   * count_total is only respected when offset is used. It is ignored when key
   * is set.
   */
  count_total?: boolean;

  /**
   * reverse is set to true if results are to be returned in the descending order.
   *
   * Since: cosmos-sdk 0.43
   */
  reverse?: boolean;
}

/**
* PageResponse is to be embedded in gRPC response messages where the
corresponding request message has used PageRequest.

 message SomeResponse {
         repeated Bar results = 1;
         PageResponse page = 2;
 }
*/
export interface V1Beta1PageResponse {
  /** @format byte */
  next_key?: string;

  /** @format uint64 */
  total?: string;
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
 * @title incentives/gauge.proto
 * @version version not set
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Query
   * @name QueryActiveGauges
   * @summary returns active gauges
   * @request GET:/joltify/incentives/v1beta1/active_gauges
   */
  queryActiveGauges = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<IncentivesActiveGaugesResponse, RpcStatus>({
      path: `/joltify/incentives/v1beta1/active_gauges`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryActiveGaugesPerDenom
   * @summary returns active gauges per denom
   * @request GET:/joltify/incentives/v1beta1/active_gauges_per_denom
   */
  queryActiveGaugesPerDenom = (
    query?: {
      denom?: string;
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<IncentivesActiveGaugesPerDenomResponse, RpcStatus>({
      path: `/joltify/incentives/v1beta1/active_gauges_per_denom`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryGaugeById
   * @summary returns Gauge by id
   * @request GET:/joltify/incentives/v1beta1/gauge_by_id/{id}
   */
  queryGaugeById = (id: string, params: RequestParams = {}) =>
    this.request<IncentivesGaugeByIDResponse, RpcStatus>({
      path: `/joltify/incentives/v1beta1/gauge_by_id/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryGauges
   * @summary returns gauges both upcoming and active
   * @request GET:/joltify/incentives/v1beta1/gauges
   */
  queryGauges = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<IncentivesGaugesResponse, RpcStatus>({
      path: `/joltify/incentives/v1beta1/gauges`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryLockableDurations
   * @summary returns lockable durations that are valid to give incentives
   * @request GET:/joltify/incentives/v1beta1/lockable_durations
   */
  queryLockableDurations = (params: RequestParams = {}) =>
    this.request<IncentivesQueryLockableDurationsResponse, RpcStatus>({
      path: `/joltify/incentives/v1beta1/lockable_durations`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryModuleDistributedCoins
   * @summary returns coins that are distributed by module so far
   * @request GET:/joltify/incentives/v1beta1/module_distributed_coins
   */
  queryModuleDistributedCoins = (params: RequestParams = {}) =>
    this.request<IncentivesModuleDistributedCoinsResponse, RpcStatus>({
      path: `/joltify/incentives/v1beta1/module_distributed_coins`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryModuleToDistributeCoins
   * @summary returns coins that is going to be distributed
   * @request GET:/joltify/incentives/v1beta1/module_to_distribute_coins
   */
  queryModuleToDistributeCoins = (params: RequestParams = {}) =>
    this.request<IncentivesModuleToDistributeCoinsResponse, RpcStatus>({
      path: `/joltify/incentives/v1beta1/module_to_distribute_coins`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
 * No description
 * 
 * @tags Query
 * @name QueryRewardsEst
 * @summary RewardsEst returns an estimate of the rewards at a future specific time.
The querier either provides an address or a set of locks
for which they want to find the associated rewards.
 * @request GET:/joltify/incentives/v1beta1/rewards_est/{owner}
 */
  queryRewardsEst = (owner: string, query?: { lock_ids?: string[]; end_epoch?: string }, params: RequestParams = {}) =>
    this.request<IncentivesRewardsEstResponse, RpcStatus>({
      path: `/joltify/incentives/v1beta1/rewards_est/${owner}`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryUpcomingGauges
   * @summary returns scheduled gauges
   * @request GET:/joltify/incentives/v1beta1/upcoming_gauges
   */
  queryUpcomingGauges = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<IncentivesUpcomingGaugesResponse, RpcStatus>({
      path: `/joltify/incentives/v1beta1/upcoming_gauges`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryUpcomingGaugesPerDenom
   * @summary returns scheduled gauges per denom
   * @request GET:/joltify/incentives/v1beta1/upcoming_gauges_per_denom
   */
  queryUpcomingGaugesPerDenom = (
    query?: {
      denom?: string;
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<IncentivesUpcomingGaugesPerDenomResponse, RpcStatus>({
      path: `/joltify/incentives/v1beta1/upcoming_gauges_per_denom`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
}
