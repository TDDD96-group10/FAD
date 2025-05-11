/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface TokenRefresh {
  /**
   * Refresh
   * @minLength 1
   */
  refresh: string;
  /**
   * Access
   * @minLength 1
   */
  access?: string;
}

export interface CodeSubmit {
  /**
   * Code
   * @minLength 1
   * @maxLength 6
   */
  code: string;
  /**
   * Username
   * @minLength 1
   * @maxLength 8
   */
  username: string;
}

export interface TokenResponse {
  /**
   * Refresh
   * @minLength 1
   */
  refresh: string;
  /**
   * Access
   * @minLength 1
   */
  access: string;
}

export interface Username {
  /**
   * Username
   * @minLength 1
   * @maxLength 150
   */
  username: string;
}

export interface MessageResponse {
  /**
   * Message
   * @minLength 1
   */
  message: string;
}

export interface TextPost {
  /** Send notifcation */
  send_notifcation?: boolean;
  /**
   * Title
   * @minLength 1
   * @maxLength 200
   */
  title: string;
  /**
   * Text
   * @minLength 1
   */
  text: string;
  /**
   * Start time
   * @format date-time
   */
  start_time?: string | null;
}

export interface SharePdf {
  /**
   * File name
   * @minLength 1
   * @maxLength 100
   */
  file_name: string;
  /**
   * Pdf
   * @format uri
   */
  pdf?: string;
}


  /**
   * User id
   * @minLength 1
   */

  user_id: string;
  /**
   * Name
   * @minLength 1
   */
  name: string;
  /**
   * Email
   * @format email
   * @minLength 1
   */
  email: string;
  /**
   * Phone number
   * @minLength 1
   */
  phone_number: string;
}

export interface Tags {
  fadder_tags: string[];
  custom_free_text: string[];
  /** Tag groups */
  tag_groups: Record<string, string[]>;
}

export interface Overview {
  users: UserTags[];
  tags: Tags;
  table_head: string[];
  /** Tagvalues multivalue name */
  tagvalues_multivalue_name: Record<string, string[]>;
}

export interface FileNames {
  /** Id */
  id?: number;

  /**
   * File name
   * @minLength 1
   * @maxLength 100
   */
  file_name: string;
}

export interface User {
  /** Id */
  id: number;
  /**
   * Username
   * @minLength 1
   */
  username: string;
  /**
   * Email
   * @format email
   * @minLength 1
   */
  email: string;
}

export interface UserOnly {
  user: User;
}

export interface Post {
  /** ID */
  id?: number;
  /** Author */
  author: string;
  /**
   * Created at
   * @format date-time
   */
  created_at?: string;
  /**
   * Title
   * @minLength 1
   * @maxLength 200
   */
  title: string;
  /**
   * Text
   * @minLength 1
   */
  text: string;
  /**
   * Start time
   * @format date-time
   */
  start_time?: string | null;
}

export interface ProgramSerializer {
  /** ID */
  id?: number;
  /**
   * Name
   * @minLength 1
   * @maxLength 200
   */
  name: string;
  /** Attributes */
  attributes?: object;
}

export type GroupSerializer = {
  /** ID */
  id?: number;
  /**
   * Name
   * @minLength 1
   * @maxLength 200
   */
  name: string;
} | null;

export interface UserSerializer {
  /**
   * User id
   * @minLength 1
   * @maxLength 8
   */
  user_id: string;
  /**
   * Role
   * @minLength 1
   * @maxLength 100
   */
  role: string;
  program?: ProgramSerializer;
  group?: GroupSerializer;
  /** Attributes */
  attributes: object;
  /**
   * First name
   * @minLength 1
   * @maxLength 50
   */
  first_name?: string;
  /**
   * Last name
   * @minLength 1
   * @maxLength 50
   */
  last_name?: string;
  /**
   * Phone number
   * @minLength 1
   * @maxLength 20
   */
  phone_number?: string;
  /**
   * Email
   * @format email
   * @minLength 1
   * @maxLength 254
   */
  email?: string | null;
}

export interface PostLink {
  /** Author */
  author: string;
  /** Program */
  program?: number | null;
  /** Send notifcation */
  send_notifcation?: boolean;
  /**
   * Title
   * @minLength 1
   * @default "Default Title"
   */
  title?: string;
  /**
   * Text
   * @minLength 1
   * @default "Default Text"
   */
  text?: string;
  /**
   * Link
   * @format uri
   * @minLength 1
   * @maxLength 200
   */
  link: string;
}

export interface PostSerializer {
  /** ID */
  id?: number;
  /**
   * Title
   * @minLength 1
   * @maxLength 200
   */
  title: string;
  /**
   * Text
   * @minLength 1
   */
  text: string;
  /**
   * Created at
   * @format date-time
   */
  created_at?: string;
  author: UserSerializer;
  program: ProgramSerializer;

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
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://web:8000";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
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
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
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

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
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

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
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
 * @title Fad API
 * @version v1
 * @license MIT License
 * @termsOfService https://your-terms.com
 * @baseUrl http://web:8000
 * @contact <your-email@example.com>
 *
 * Fadder protal
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Takes a refresh type JSON web token and returns an access type JSON web token if the refresh token is valid.
     *
     * @tags api
     * @name ApiTokenRefreshCreate
     * @request POST:/api/token/refresh/
     * @secure
     */
    apiTokenRefreshCreate: (data: TokenRefresh, params: RequestParams = {}) =>
      this.request<TokenRefresh, any>({
        path: `/api/token/refresh/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @tags auth
     * @name AuthCodeCreate
     * @request POST:/auth/code
     * @secure
     */
    authCodeCreate: (data: CodeSubmit, params: RequestParams = {}) =>
      this.request<TokenResponse, void>({
        path: `/auth/code`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthLoginCreate
     * @request POST:/auth/login
     * @secure
     */
    authLoginCreate: (data: Username, params: RequestParams = {}) =>
      this.request<MessageResponse, void>({
        path: `/auth/login`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  portal = {
    /**
     * No description
     *
     * @tags portal
     * @name PortalShareInfoCreate
     * @request POST:/portal/Share_info
     * @secure
     */
    portalShareInfoCreate: (data: TextPost, params: RequestParams = {}) =>
      this.request<TextPost, any>({
        path: `/portal/Share_info`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags portal
     * @name PortalSharePdfCreate
     * @request POST:/portal/Share_pdf
     * @secure
     */
    portalSharePdfCreate: (
      data: {
        /**
         * @minLength 1
         * @maxLength 100
         */
        file_name: string;
        /** @format binary */
        pdf: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<SharePdf, any>({
        path: `/portal/Share_pdf`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags portal
     * @name PortalAddAtributeCreate
     * @request POST:/portal/add-atribute
     * @secure
     */
    portalAddAtributeCreate: (
      data: AddAtributeText,
      params: RequestParams = {},
    ) =>
      this.request<AddAtributeText, any>({
        path: `/portal/add-atribute`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags portal
     * @name PortalAddMutivalueFiledsCreate
     * @request POST:/portal/add-mutivalue-fileds
     * @secure
     */
    portalAddMutivalueFiledsCreate: (
      data: AddCustomFileds,
      params: RequestParams = {},
    ) =>
      this.request<AddCustomFileds, any>({
        path: `/portal/add-mutivalue-fileds`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags portal
     * @name PortalFadderOverviewRead
     * @request GET:/portal/fadder-overview/{filter}
     * @secure
     */
    portalFadderOverviewRead: (filter: string, params: RequestParams = {}) =>
      this.request<Overview, any>({
        path: `/portal/fadder-overview/${filter}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags portal
     * @name PortalFadderTagsList
     * @request GET:/portal/fadder-tags
     * @secure
     */
    portalFadderTagsList: (params: RequestParams = {}) =>
      this.request<Tags, any>({
        path: `/portal/fadder-tags`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags portal
     * @name PortalFadderTagsCreate
     * @request POST:/portal/fadder-tags
     * @secure
     */
    portalFadderTagsCreate: (
      data: AddAtributeText,
      params: RequestParams = {},
    ) =>
      this.request<AddAtributeText, any>({
        path: `/portal/fadder-tags`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags portal
     * @name PortalFadderTagsDelete
     * @request DELETE:/portal/fadder-tags
     * @secure
     */
    portalFadderTagsDelete: (
      data: AddAtributeText,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/portal/fadder-tags`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags portal
     * @name PortalFadderCreate
     * @request POST:/portal/fadder/{liu_id}
     * @secure
     */
    portalFadderCreate: (liuId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/portal/fadder/${liuId}`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags portal
     * @name PortalFilesList
     * @request GET:/portal/files
     * @secure
     */
    portalFilesList: (params: RequestParams = {}) =>
      this.request<FileNames[], any>({
        path: `/portal/files`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags portal
     * @name PortalFilesDelete
     * @request DELETE:/portal/files
     * @secure
     */
    portalFilesDelete: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/portal/files`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags portal
     * @name PortalHelloWorldList
     * @request GET:/portal/hello-world
     * @secure
     */
    portalHelloWorldList: (params: RequestParams = {}) =>
      this.request<UserOnly, any>({
        path: `/portal/hello-world`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags portal
     * @name PortalHelloWorldCreate
     * @request POST:/portal/hello-world
     * @secure
     */
    portalHelloWorldCreate: (data: UserOnly, params: RequestParams = {}) =>
      this.request<UserOnly, any>({
        path: `/portal/hello-world`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags portal
     * @name PortalHomeList
     * @request GET:/portal/home
     * @secure
     */
    portalHomeList: (params: RequestParams = {}) =>
      this.request<Post[], any>({
        path: `/portal/home`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description API endpoint for bulk importing users from a CSV file. This view handles file uploads containing user data in CSV format, creates User instances along with related Program and Group objects, and returns import statistics. Example CSV Format: user_id,role,program,group,attributes 123,student,"Program Name,attr1:value1",Group A,"{key:value}" 456,teacher,"Program Name,attr2:value2",Group B,"{key:value}"
     *
     * @tags portal
     * @name PortalImportUsersCreate
     * @request POST:/portal/import-users
     * @secure
     */
    portalImportUsersCreate: (
      data: {
        /** @format binary */
        file: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/portal/import-users`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description

     *
     * @tags portal
     * @name PortalPostLinkCreate
     * @request POST:/portal/post-link
     * @secure
     */
    portalPostLinkCreate: (data: PostLink, params: RequestParams = {}) =>
      this.request<PostLink, any>({
        path: `/portal/post-link`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**

    /**
     * No description
     *
     * @tags portal
     * @name PortalPostRead
     * @request GET:/portal/post/{id}
     * @secure
     */
    portalPostRead: (id: string, params: RequestParams = {}) =>
      this.request<PostSerializer, any>({
        path: `/portal/post/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags portal
     * @name PortalPostDelete
     * @request DELETE:/portal/post/{id}
     * @secure
     */
    portalPostDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/portal/post/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**

     * No description
     *
     * @tags portal
     * @name PortalPostsList
     * @request GET:/portal/posts
     * @secure
     */
    portalPostsList: (params: RequestParams = {}) =>
      this.request<PostSerializer[], any>({
        path: `/portal/posts`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags portal
     * @name PortalProfileMetaDataList
     * @request GET:/portal/profile-meta-data
     * @secure
     */
    portalProfileMetaDataList: (params: RequestParams = {}) =>
      this.request<UserSerializer, any>({
        path: `/portal/profile-meta-data`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update user profile information.
     *
     * @tags portal
     * @name PortalProfileMetaDataUpdate
     * @summary Update user fields (first name, last name, phone number, email)
     * @request PUT:/portal/profile-meta-data
     * @secure
     */
    portalProfileMetaDataUpdate: (
      data: UserSerializer,
      params: RequestParams = {},
    ) =>
      this.request<UserSerializer, void>({
        path: `/portal/profile-meta-data`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags portal
     * @name PortalUsersList
     * @request GET:/portal/users
     * @secure
     */
    portalUsersList: (params: RequestParams = {}) =>
      this.request<UserSerializer[], any>({
        path: `/portal/users`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
