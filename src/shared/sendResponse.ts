import { Response } from "express";

type IApiResponse<T> = {
    success: boolean;
    message: string;
    data: T | null;
};

const sendResponse = <T>(
    res: Response,
    statusCode: number,
    data: IApiResponse<T>
): void => {
    const responseData: IApiResponse<T> = {
        success: data.success,
        message: data.message,
        data: data.data,
    };
    res.status(statusCode).json({
        ...responseData,
    });
};

export default sendResponse;
