import { Response } from "express";

type IApiResponse<T> = {
    success: boolean;
    message?: string | null;
    meta?: {
        page: number;
        limit: number;
        total: number;
    } | null;
    data?: T | null;
};

const sendResponse = <T>(
    res: Response,
    statusCode: number,
    data: IApiResponse<T>
): void => {
    const responseData: IApiResponse<T> = {
        success: data.success,
        message: data.message || null,
        meta: data.meta || null,
        data: data.data || null,
    };
    res.status(statusCode).json({
        ...responseData,
    });
};

export default sendResponse;
