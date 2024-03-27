export const HTTPStatusCode = {
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NoContent: 204,
    PartialContent: 206,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    UnprocessableEntity: 422,
    TooManyRequests: 429,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTiemout: 504,
} as const;

export type typeofHTTPStatusCode =
    (typeof HTTPStatusCode)[keyof typeof HTTPStatusCode];

export class HTTPMessages {
    static BAD_REQUEST = "Bad Request";
    static NOT_FOUND = "Resource not found";
    static FORBIDDEN = "Access Denied!";
    static UNAUTHORIZED = "Not Authorized";
    static INTERNAL_SERVER_ERROR = "Internal Server Error";
    static ENV_VARIABLE_NOT_DEFINED = "Environment variable is not defined";
    static SESSION_EXPIRED = "Session Expired!";
    static CONFLICT = "Request could not be completed due to a conflict";
}
