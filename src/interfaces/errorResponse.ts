import { IGenericErrorMessage } from "./errorMessage";

export type IGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorMessages: IGenericErrorMessage[];
};
