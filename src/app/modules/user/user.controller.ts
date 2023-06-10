import { NextFunction, Request, Response } from "express";
import status from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./user.interface";
import { UserService } from "./user.service";

const createUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { user } = req.body;
        const result = await UserService.createUser(user);

        sendResponse<IUser>(res, status.OK, {
            success: true,
            message: "User created successfully!",
            data: result,
        });
        next();
    }
);

export const UserController = {
    createUser,
};
