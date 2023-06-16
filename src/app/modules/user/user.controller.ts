import { RequestHandler } from "express";
import status from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./user.interface";
import { UserService } from "./user.service";

const createStudent: RequestHandler = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req, res, next): Promise<void> => {
        const { student, ...user } = req.body;
        const result = await UserService.createStudent(student, user);

        sendResponse<IUser>(res, status.OK, {
            success: true,
            message: "Student created successfully!",
            data: result,
        });
    }
);

const createFaculty: RequestHandler = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req, res, next): Promise<void> => {
        const { faculty, ...user } = req.body;
        const result = await UserService.createFaculty(faculty, user);

        sendResponse<IUser>(res, status.OK, {
            success: true,
            message: "Faculty created successfully!",
            data: result,
        });
    }
);

const createAdmin: RequestHandler = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req, res, next): Promise<void> => {
        const { admin, ...user } = req.body;
        const result = await UserService.createAdmin(admin, user);

        sendResponse<IUser>(res, status.OK, {
            success: true,
            message: "Admin created successfully!",
            data: result,
        });
    }
);

export const UserController = {
    createStudent,
    createFaculty,
    createAdmin,
};
