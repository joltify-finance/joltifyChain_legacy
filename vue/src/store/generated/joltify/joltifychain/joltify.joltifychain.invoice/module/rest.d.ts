export interface InvoiceInvoice {
    invoiceID?: string;
    invoiceBase?: InvoiceInvoiceBase;
    invoiceFinance?: InvoiceInvoiceFinance;
    /** @format byte */
    currentOwner?: string;
    invoiceMembers?: InvoiceInvoiceMember[];
    rootOwner?: boolean;
    deleted?: boolean;
    isListedForSell?: boolean;
}
export interface InvoiceInvoiceBase {
    /** @format byte */
    creator?: string;
    name?: string;
    url?: string;
    data?: string;
    /** @format byte */
    origOwner?: string;
}
export interface InvoiceInvoiceFinance {
    denom?: string;
    /** @format byte */
    amount?: string;
    /** @format byte */
    amountLocked?: string;
    /** @format float */
    apy?: number;
}
export interface InvoiceInvoiceMember {
    invoiceID?: string;
    /** @format byte */
    share?: string;
    /** @format byte */
    invoiceHolder?: string;
}
export interface InvoiceMsgCreateInvoiceResponse {
    invoiceID?: string;
}
export interface InvoiceMsgCreatePlaceOrderResponse {
    placeOrderID?: string;
}
export interface InvoiceMsgCreateSellOrderResponse {
    orderID?: string;
}
export declare type InvoiceMsgDeleteInvoiceResponse = object;
export declare type InvoiceMsgDeleteSellOrderResponse = object;
export interface InvoicePlaceOrder {
    /** @format byte */
    creator?: string;
    placeOrderIndex?: string;
    sellOrderID?: string;
    /** @format byte */
    amount?: string;
    /** @format int32 */
    OrderStatus?: number;
    /** @format date-time */
    createdTime?: string;
}
export interface InvoiceQueryAllInvoiceResponse {
    Invoice?: InvoiceInvoice[];
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
export interface InvoiceQueryAllPlaceOrderResponse {
    PlaceOrder?: InvoicePlaceOrder[];
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
export interface InvoiceQueryAllSellOrderResponse {
    SellOrder?: InvoiceSellOrder[];
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
export interface InvoiceQueryGetInvoiceResponse {
    Invoice?: InvoiceInvoice;
}
export interface InvoiceQueryGetPlaceOrderResponse {
    PlaceOrder?: InvoicePlaceOrder;
}
export interface InvoiceQueryGetSellOrderResponse {
    SellOrder?: InvoiceSellOrder;
}
export interface InvoiceSellOrder {
    /** @format byte */
    creator?: string;
    sellOrderID?: string;
    invoiceID?: string;
    /** @format byte */
    amount?: string;
    /** @format byte */
    price?: string;
    /** @format byte */
    leftAmount?: string;
    priceRatio?: string;
    sellDuration?: string;
    /** @format date-time */
    createdTime?: string;
    isDeleted?: boolean;
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
    countTotal?: boolean;
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
    nextKey?: string;
    /** @format uint64 */
    total?: string;
}
export declare type QueryParamsType = Record<string | number, any>;
export declare type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;
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
export declare type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;
export interface ApiConfig<SecurityDataType = unknown> {
    baseUrl?: string;
    baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
    securityWorker?: (securityData: SecurityDataType) => RequestParams | void;
}
export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
    data: D;
    error: E;
}
declare type CancelToken = Symbol | string | number;
export declare enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded"
}
export declare class HttpClient<SecurityDataType = unknown> {
    baseUrl: string;
    private securityData;
    private securityWorker;
    private abortControllers;
    private baseApiParams;
    constructor(apiConfig?: ApiConfig<SecurityDataType>);
    setSecurityData: (data: SecurityDataType) => void;
    private addQueryParam;
    protected toQueryString(rawQuery?: QueryParamsType): string;
    protected addQueryParams(rawQuery?: QueryParamsType): string;
    private contentFormatters;
    private mergeRequestParams;
    private createAbortSignal;
    abortRequest: (cancelToken: CancelToken) => void;
    request: <T = any, E = any>({ body, secure, path, type, query, format, baseUrl, cancelToken, ...params }: FullRequestParams) => Promise<HttpResponse<T, E>>;
}
/**
 * @title invoice/genesis.proto
 * @version version not set
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Query
     * @name QueryInvoiceAll
     * @summary Queries a list of invoice items.
     * @request GET:/joltify/joltifychain/invoice/invoice
     */
    queryInvoiceAll: (query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.countTotal"?: boolean;
    }, params?: RequestParams) => Promise<HttpResponse<InvoiceQueryAllInvoiceResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryInvoice
     * @summary Queries a invoice by index.
     * @request GET:/joltify/joltifychain/invoice/invoice/{index}
     */
    queryInvoice: (index: string, params?: RequestParams) => Promise<HttpResponse<InvoiceQueryGetInvoiceResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryPlaceOrderAll
     * @summary Queries a list of placeOrder items.
     * @request GET:/joltify/joltifychain/invoice/placeOrder
     */
    queryPlaceOrderAll: (query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.countTotal"?: boolean;
    }, params?: RequestParams) => Promise<HttpResponse<InvoiceQueryAllPlaceOrderResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryPlaceOrder
     * @summary Queries a placeOrder by index.
     * @request GET:/joltify/joltifychain/invoice/placeOrder/{index}
     */
    queryPlaceOrder: (index: string, params?: RequestParams) => Promise<HttpResponse<InvoiceQueryGetPlaceOrderResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QuerySellOrderAll
     * @summary Queries a list of sellOrder items.
     * @request GET:/joltify/joltifychain/invoice/sellOrder
     */
    querySellOrderAll: (query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.countTotal"?: boolean;
    }, params?: RequestParams) => Promise<HttpResponse<InvoiceQueryAllSellOrderResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QuerySellOrder
     * @summary Queries a sellOrder by index.
     * @request GET:/joltify/joltifychain/invoice/sellOrder/{index}
     */
    querySellOrder: (index: string, params?: RequestParams) => Promise<HttpResponse<InvoiceQueryGetSellOrderResponse, RpcStatus>>;
}
export {};
