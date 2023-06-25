import { RequestHandler } from "express";
import status from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUserLoginResponse } from "./auth.interface";
import { AuthService } from "./auth.service";

const userLogin: RequestHandler = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req, res, next): Promise<void> => {
        const { ...loginData } = req.body;
        const result = await AuthService.userLogin(loginData);

        sendResponse<IUserLoginResponse>(res, status.OK, {
            success: true,
            message: "User logged in successfully!",
            data: result,
        });
    }
);

export const AuthController = {
    userLogin,
};
