import { RequestHandler } from "express";
// import status from "http-status";
// import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";

const loginUser: RequestHandler = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req, res, next): Promise<void> => {
        // sendResponse<IAcademicSemester>(res, status.OK, {
        //     success: true,
        //     message: "Academic semester created successfully!",
        //     data: result,
        // });
    }
);

export const AuthController = {
    loginUser,
};
