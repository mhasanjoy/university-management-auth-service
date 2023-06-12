import mongoose from "mongoose";
import { IGenericErrorMessage } from "../interfaces/errorMessage";
import { IGenericErrorResponse } from "../interfaces/errorResponse";

const handleCastError = (
    error: mongoose.Error.CastError
): IGenericErrorResponse => {
    const errors: IGenericErrorMessage[] = [
        {
            path: error.path,
            message: "Invalid ID!",
        },
    ];

    return {
        statusCode: 400,
        message: "Cast Error",
        errorMessage: errors,
    };
};

export default handleCastError;
