// This file is auto-generated by @hey-api/openapi-ts

import type { CancelablePromise } from "./core/CancelablePromise";
import { OpenAPI } from "./core/OpenAPI";
import { request as __request } from "./core/request";
import type { $OpenApiTs } from "./models";

export class DefaultService {
  /**
   * Ping
   * @returns PingResponse Successful Response
   * @throws ApiError
   */
  public static pingGet(): CancelablePromise<
    $OpenApiTs["/"]["get"]["res"][200]
  > {
    return __request(OpenAPI, {
      method: "GET",
      url: "/",
    });
  }

  /**
   * Embed
   * @returns EmbeddingResponse Successful Response
   * @throws ApiError
   */
  public static embedEmbedGet(
    data: $OpenApiTs["/embed"]["get"]["req"],
  ): CancelablePromise<$OpenApiTs["/embed"]["get"]["res"][200]> {
    const { text } = data;
    return __request(OpenAPI, {
      method: "GET",
      url: "/embed",
      query: {
        text,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Process
   * @returns SpacyProcessResponse Successful Response
   * @throws ApiError
   */
  public static processProcessGet(
    data: $OpenApiTs["/process"]["get"]["req"],
  ): CancelablePromise<$OpenApiTs["/process"]["get"]["res"][200]> {
    const { text } = data;
    return __request(OpenAPI, {
      method: "GET",
      url: "/process",
      query: {
        text,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Chat Stream
   * @returns any Successful Response
   * @throws ApiError
   */
  public static chatStreamChatStreamPost(
    data: $OpenApiTs["/chat/stream"]["post"]["req"],
  ): CancelablePromise<$OpenApiTs["/chat/stream"]["post"]["res"][200]> {
    const { requestBody } = data;
    return __request(OpenAPI, {
      method: "POST",
      url: "/chat/stream",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
