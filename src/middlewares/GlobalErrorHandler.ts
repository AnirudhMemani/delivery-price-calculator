import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { HTTPMessages, HTTPStatusCode } from "../utils/constants.js";
import createError from "http-errors";

export interface IHTTPError extends Error {
    statusCode: number;
}

export class BadRequestException {
    constructor(message: string = HTTPMessages.BAD_REQUEST) {
        throw createError(HTTPStatusCode.BadRequest, message);
    }
}

export class ResourceNotFoundError {
    constructor(message: string = HTTPMessages.NOT_FOUND) {
        throw createError(HTTPStatusCode.NotFound, message);
    }
}

export class UnauthorizedError {
    constructor(message: string = HTTPMessages.UNAUTHORIZED) {
        throw createError(HTTPStatusCode.Unauthorized, message);
    }
}

export class ForbiddenError {
    constructor(message: string = HTTPMessages.FORBIDDEN) {
        throw createError(HTTPStatusCode.Forbidden, message);
    }
}

export class InternalServerError {
    constructor(message: string = HTTPMessages.INTERNAL_SERVER_ERROR) {
        throw createError(HTTPStatusCode.InternalServerError, message);
    }
}

const GlobalErrorHandler: ErrorRequestHandler = (
    err: IHTTPError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode || HTTPStatusCode.InternalServerError;
    const message: string = err.message || HTTPMessages.INTERNAL_SERVER_ERROR;
    const env = process.env.NODE_ENV;

    const responeBody = {
        message,
        ...(env === "DEV"
            ? { stack: err.stack }
            : { statusCode: err.statusCode }),
    };

    return res.status(statusCode).json(responeBody);
};

export default GlobalErrorHandler;
