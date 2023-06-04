import mongoose from "mongoose";
import { IGenericErrorMessage } from "../interfaces/errorMessage";
import { IGenericErrorResponse } from "../interfaces/errorResponse";

const handleValidationError = (
    error: mongoose.Error.ValidationError
): IGenericErrorResponse => {
    const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
        (element: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
            return {
                path: element.path,
                message: element.message,
            };
        }
    );

    return {
        statusCode: 400,
        message: "Validation Error",
        errorMessages: errors,
    };
};

export default handleValidationError;
