import { RequestHandler } from "express";
import status from "http-status";
import config from "../../../config";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IRefreshTokenResponse, IUserLoginResponse } from "./auth.interface";
import { AuthService } from "./auth.service";

const userLogin: RequestHandler = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req, res, next): Promise<void> => {
        const { ...loginData } = req.body;
        const result = await AuthService.userLogin(loginData);
        const { refreshToken, ...others } = result;

        // set refresh token into cookie
        const cookieOptions = {
            secure: config.env === "production",
            httpOnly: true,
        };
        res.cookie("refreshToken", refreshToken, cookieOptions);

        sendResponse<IUserLoginResponse>(res, status.OK, {
            success: true,
            message: "User logged in successfully!",
            data: others,
        });
    }
);

const refreshToken: RequestHandler = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req, res, next): Promise<void> => {
        const { refreshToken } = req.cookies;
        const result = await AuthService.refreshToken(refreshToken);

        sendResponse<IRefreshTokenResponse>(res, status.OK, {
            success: true,
            message: "New access token generated successfully!",
            data: result,
        });
    }
);

export const AuthController = {
    userLogin,
    refreshToken,
};
