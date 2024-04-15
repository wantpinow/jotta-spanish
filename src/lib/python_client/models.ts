// This file is auto-generated by @hey-api/openapi-ts

export type EmbeddingResponse = {
  data: Array<number>;
};

export type HTTPValidationError = {
  detail?: Array<ValidationError>;
};

export type SpacyProcessResponse = {
  data: Array<SpacyToken>;
};

export type SpacyToken = {
  text: string;
  pos: string;
  dep: string;
  lemma: string;
};

export type ValidationError = {
  loc: Array<string | number>;
  msg: string;
  type: string;
};

export type $OpenApiTs = {
  "/": {
    get: {
      res: {
        /**
         * Successful Response
         */
        200: unknown;
      };
    };
  };
  "/embed": {
    get: {
      req: {
        text: string;
      };
      res: {
        /**
         * Successful Response
         */
        200: EmbeddingResponse;
      };
    };
  };
  "/process": {
    get: {
      req: {
        text: string;
      };
      res: {
        /**
         * Successful Response
         */
        200: SpacyProcessResponse;
      };
    };
  };
};
