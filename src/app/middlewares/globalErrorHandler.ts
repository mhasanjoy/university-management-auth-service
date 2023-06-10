import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import handleValidationError from "../../errors/handleValidationError";
import handleZodError from "../../errors/handleZodError";
import { IGenericErrorMessage } from "../../interfaces/errorMessage";
import { errorLogger } from "../../shared/logger";

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    // eslint-disable-next-line no-unused-expressions
    config.env === "development"
        ? // eslint-disable-next-line no-console
          console.log("globalErrorHandler ~ ", error)
        : errorLogger.error("globalErrorHandler ~ ", error);

    let statusCode = 500;
    let message = "Something went wrong!";
    let errorMessage: IGenericErrorMessage[] = [];

    if (error?.name === "ValidationError") {
        const simplifiedError = handleValidationError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
    } else if (error instanceof ZodError) {
        const simplifiedError = handleZodError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
    } else if (error instanceof ApiError) {
        statusCode = error.statusCode;
        message = error.message;
        errorMessage = error?.message
            ? [
                  {
                      path: "",
                      message: error.message,
                  },
              ]
            : [];
    } else if (error instanceof Error) {
        message = error.message;
        errorMessage = error?.message
            ? [
                  {
                      path: "",
                      message: error.message,
                  },
              ]
            : [];
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        stack: config.env !== "production" ? error?.stack : undefined,
    });
};

export default globalErrorHandler;
