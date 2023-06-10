import { ZodError, ZodIssue } from "zod";
import { IGenericErrorMessage } from "../interfaces/errorMessage";
import { IGenericErrorResponse } from "../interfaces/errorResponse";

const handleZodError = (error: ZodError): IGenericErrorResponse => {
    const errors: IGenericErrorMessage[] = error.issues.map(
        (issue: ZodIssue) => {
            return {
                path: issue?.path[issue.path.length - 1],
                message: issue?.message,
            };
        }
    );

    return {
        statusCode: 400,
        message: "Validation Error",
        errorMessage: errors,
    };
};

export default handleZodError;
