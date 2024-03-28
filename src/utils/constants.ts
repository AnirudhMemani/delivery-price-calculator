export const HTTPStatusCode = {
    Ok: 200,
    Created: 201,
    BadRequest: 400,
    Unauthorized: 401,
    Forbidden: 403,
    NotFound: 404,
    InternalServerError: 500,
} as const;

export class HTTPMessages {
    static BAD_REQUEST = "Bad Request";
    static NOT_FOUND = "Resource not found";
    static FORBIDDEN = "Access Denied!";
    static UNAUTHORIZED = "Not Authorized";
    static INTERNAL_SERVER_ERROR = "Internal Server Error";
}

export const convertCentsToEuros = (priceInCents: number): number => {
    return priceInCents / 100;
};
