import { NextFunction, Request, Response } from "express";
import status from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IAcademicSemester } from "./academic-semester.interface";
import { AcademicSemesterService } from "./academic-semester.service";

const createSemester = catchAsync(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { ...academicSemesterData } = req.body;
        const result = await AcademicSemesterService.createSemester(
            academicSemesterData
        );

        sendResponse<IAcademicSemester>(res, status.OK, {
            success: true,
            message: "Academic semester created successfully!",
            data: result,
        });

        next();
    }
);

export const AcademicSemesterController = {
    createSemester,
};
