import { RequestHandler } from "express";
// import status from "http-status";
import catchAsync from "../../../shared/catchAsync";
// import sendResponse from "../../../shared/sendResponse";
// import { AuthService } from "./auth.service";

const loginUser: RequestHandler = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req, res, next): Promise<void> => {
        // const { ...loginData } = req.body;
        // const result = await AuthService.loginUser(loginData);
        // sendResponse<>(res, status.OK, {
        //     success: true,
        //     message: "User logged in successfully!",
        //     data: result,
        // });
    }
);

export const AuthController = {
    loginUser,
};
