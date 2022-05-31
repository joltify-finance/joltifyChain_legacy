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

export interface LockupAccountLockedCoinsResponse {
  coins?: V1Beta1Coin[];
}

export interface LockupAccountLockedLongerDurationDenomResponse {
  locks?: LockupPeriodLock[];
}

export interface LockupAccountLockedLongerDurationNotUnlockingOnlyResponse {
  locks?: LockupPeriodLock[];
}

export interface LockupAccountLockedLongerDurationResponse {
  locks?: LockupPeriodLock[];
}

export interface LockupAccountLockedPastTimeDenomResponse {
  locks?: LockupPeriodLock[];
}

export interface LockupAccountLockedPastTimeNotUnlockingOnlyResponse {
  locks?: LockupPeriodLock[];
}

export interface LockupAccountLockedPastTimeResponse {
  locks?: LockupPeriodLock[];
}

export interface LockupAccountUnlockableCoinsResponse {
  coins?: V1Beta1Coin[];
}

export interface LockupAccountUnlockedBeforeTimeResponse {
  locks?: LockupPeriodLock[];
}

export interface LockupAccountUnlockingCoinsResponse {
  coins?: V1Beta1Coin[];
}

export interface LockupLockedDenomResponse {
  amount?: string;
}

export interface LockupLockedResponse {
  /**
   * PeriodLock is a single unit of lock by period. It's a record of locked coin
   * at a specific time. It stores owner, duration, unlock time and the amount of
   * coins locked.
   */
  lock?: LockupPeriodLock;
}

export interface LockupModuleBalanceResponse {
  coins?: V1Beta1Coin[];
}

export interface LockupModuleLockedAmountResponse {
  coins?: V1Beta1Coin[];
}

export interface LockupMsgBeginUnlockingAllResponse {
  unlocks?: LockupPeriodLock[];
}

export interface LockupMsgBeginUnlockingResponse {
  success?: boolean;
}

export interface LockupMsgLockTokensResponse {
  /** @format uint64 */
  ID?: string;
}

/**
* PeriodLock is a single unit of lock by period. It's a record of locked coin
at a specific time. It stores owner, duration, unlock time and the amount of
coins locked.
*/
export interface LockupPeriodLock {
  /** @format uint64 */
  ID?: string;
  owner?: string;
  duration?: string;

  /** @format date-time */
  end_time?: string;
  coins?: V1Beta1Coin[];
}

/**
* SyntheticLock is a single unit of synthetic lockup
TODO: Change this to have
* underlying_lock_id
* synthetic_coin
* end_time
* duration
* owner
We then index synthetic locks by the denom, just like we do with normal
locks. Ideally we even get an interface, so we can re-use that same logic.
I currently have no idea how reward distribution is supposed to be working...
EVENTUALLY
we make a "constrained_coin" field, which is what the current "coins" field
is. Constrained coin field can be a #post-v7 feature, since we aren't
allowing partial unlocks of synthetic lockups.
*/
export interface LockupSyntheticLock {
  /** @format uint64 */
  underlying_lock_id?: string;
  synth_denom?: string;

  /** @format date-time */
  end_time?: string;
  duration?: string;
}

export interface LockupSyntheticLockupsByLockupIDResponse {
  synthetic_locks?: LockupSyntheticLock[];
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
 * @title lockup/genesis.proto
 * @version version not set
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Query
   * @name QueryAccountLockedCoins
   * @summary Return a locked coins that can't be withdrawn
   * @request GET:/joltify/lockup/v1beta1/account_locked_coins/{owner}
   */
  queryAccountLockedCoins = (owner: string, params: RequestParams = {}) =>
    this.request<LockupAccountLockedCoinsResponse, RpcStatus>({
      path: `/joltify/lockup/v1beta1/account_locked_coins/${owner}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryAccountLockedLongerDuration
   * @summary Returns account locked records with longer duration
   * @request GET:/joltify/lockup/v1beta1/account_locked_longer_duration/{owner}
   */
  queryAccountLockedLongerDuration = (owner: string, query?: { duration?: string }, params: RequestParams = {}) =>
    this.request<LockupAccountLockedLongerDurationResponse, RpcStatus>({
      path: `/joltify/lockup/v1beta1/account_locked_longer_duration/${owner}`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryAccountLockedLongerDurationDenom
   * @summary Returns account's locked records for a denom with longer duration
   * @request GET:/joltify/lockup/v1beta1/account_locked_longer_duration_denom/{owner}
   */
  queryAccountLockedLongerDurationDenom = (
    owner: string,
    query?: { duration?: string; denom?: string },
    params: RequestParams = {},
  ) =>
    this.request<LockupAccountLockedLongerDurationDenomResponse, RpcStatus>({
      path: `/joltify/lockup/v1beta1/account_locked_longer_duration_denom/${owner}`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
 * No description
 * 
 * @tags Query
 * @name QueryAccountLockedLongerDurationNotUnlockingOnly
 * @summary Returns account locked records with longer duration excluding tokens
started unlocking
 * @request GET:/joltify/lockup/v1beta1/account_locked_longer_duration_not_unlocking_only/{owner}
 */
  queryAccountLockedLongerDurationNotUnlockingOnly = (
    owner: string,
    query?: { duration?: string },
    params: RequestParams = {},
  ) =>
    this.request<LockupAccountLockedLongerDurationNotUnlockingOnlyResponse, RpcStatus>({
      path: `/joltify/lockup/v1beta1/account_locked_longer_duration_not_unlocking_only/${owner}`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryAccountLockedPastTime
   * @summary Returns locked records of an account with unlock time beyond timestamp
   * @request GET:/joltify/lockup/v1beta1/account_locked_pasttime/{owner}
   */
  queryAccountLockedPastTime = (owner: string, query?: { timestamp?: string }, params: RequestParams = {}) =>
    this.request<LockupAccountLockedPastTimeResponse, RpcStatus>({
      path: `/joltify/lockup/v1beta1/account_locked_pasttime/${owner}`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryAccountLockedPastTimeDenom
   * @summary Returns lock records by address, timestamp, denom
   * @request GET:/joltify/lockup/v1beta1/account_locked_pasttime_denom/{owner}
   */
  queryAccountLockedPastTimeDenom = (
    owner: string,
    query?: { timestamp?: string; denom?: string },
    params: RequestParams = {},
  ) =>
    this.request<LockupAccountLockedPastTimeDenomResponse, RpcStatus>({
      path: `/joltify/lockup/v1beta1/account_locked_pasttime_denom/${owner}`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
 * No description
 * 
 * @tags Query
 * @name QueryAccountLockedPastTimeNotUnlockingOnly
 * @summary Returns locked records of an account with unlock time beyond timestamp
excluding tokens started unlocking
 * @request GET:/joltify/lockup/v1beta1/account_locked_pasttime_not_unlocking_only/{owner}
 */
  queryAccountLockedPastTimeNotUnlockingOnly = (
    owner: string,
    query?: { timestamp?: string },
    params: RequestParams = {},
  ) =>
    this.request<LockupAccountLockedPastTimeNotUnlockingOnlyResponse, RpcStatus>({
      path: `/joltify/lockup/v1beta1/account_locked_pasttime_not_unlocking_only/${owner}`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryAccountUnlockableCoins
   * @summary Returns unlockable coins which are not withdrawn yet
   * @request GET:/joltify/lockup/v1beta1/account_unlockable_coins/{owner}
   */
  queryAccountUnlockableCoins = (owner: string, params: RequestParams = {}) =>
    this.request<LockupAccountUnlockableCoinsResponse, RpcStatus>({
      path: `/joltify/lockup/v1beta1/account_unlockable_coins/${owner}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryAccountUnlockedBeforeTime
   * @summary Returns unlocked records with unlock time before timestamp
   * @request GET:/joltify/lockup/v1beta1/account_unlocked_before_time/{owner}
   */
  queryAccountUnlockedBeforeTime = (owner: string, query?: { timestamp?: string }, params: RequestParams = {}) =>
    this.request<LockupAccountUnlockedBeforeTimeResponse, RpcStatus>({
      path: `/joltify/lockup/v1beta1/account_unlocked_before_time/${owner}`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryAccountUnlockingCoins
   * @summary Returns unlocking coins
   * @request GET:/joltify/lockup/v1beta1/account_unlocking_coins/{owner}
   */
  queryAccountUnlockingCoins = (owner: string, params: RequestParams = {}) =>
    this.request<LockupAccountUnlockingCoinsResponse, RpcStatus>({
      path: `/joltify/lockup/v1beta1/account_unlocking_coins/${owner}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryLockedById
   * @summary Returns lock record by id
   * @request GET:/joltify/lockup/v1beta1/locked_by_id/{lock_id}
   */
  queryLockedById = (lock_id: string, params: RequestParams = {}) =>
    this.request<LockupLockedResponse, RpcStatus>({
      path: `/joltify/lockup/v1beta1/locked_by_id/${lock_id}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryLockedDenom
   * @summary Returns total locked per denom with longer past given time
   * @request GET:/joltify/lockup/v1beta1/locked_denom
   */
  queryLockedDenom = (query?: { denom?: string; duration?: string }, params: RequestParams = {}) =>
    this.request<LockupLockedDenomResponse, RpcStatus>({
      path: `/joltify/lockup/v1beta1/locked_denom`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryModuleBalance
   * @summary Return full balance of the module
   * @request GET:/joltify/lockup/v1beta1/module_balance
   */
  queryModuleBalance = (params: RequestParams = {}) =>
    this.request<LockupModuleBalanceResponse, RpcStatus>({
      path: `/joltify/lockup/v1beta1/module_balance`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryModuleLockedAmount
   * @summary Return locked balance of the module
   * @request GET:/joltify/lockup/v1beta1/module_locked_amount
   */
  queryModuleLockedAmount = (params: RequestParams = {}) =>
    this.request<LockupModuleLockedAmountResponse, RpcStatus>({
      path: `/joltify/lockup/v1beta1/module_locked_amount`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QuerySyntheticLockupsByLockupId
   * @summary Returns synthetic lockups by native lockup id
   * @request GET:/joltify/lockup/v1beta1/synthetic_lockups_by_lock_id/{lock_id}
   */
  querySyntheticLockupsByLockupId = (lock_id: string, params: RequestParams = {}) =>
    this.request<LockupSyntheticLockupsByLockupIDResponse, RpcStatus>({
      path: `/joltify/lockup/v1beta1/synthetic_lockups_by_lock_id/${lock_id}`,
      method: "GET",
      format: "json",
      ...params,
    });
}
