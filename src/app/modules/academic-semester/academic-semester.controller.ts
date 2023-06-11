import { NextFunction, Request, Response } from "express";
import status from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { IAcademicSemester } from "./academic-semester.interface";
import { AcademicSemesterService } from "./academic-semester.service";

const createSemester = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
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
    }
);

const getAllSemesters = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, next: NextFunction) => {
        const paginationOptions = pick(req.query, paginationFields);

        const result = await AcademicSemesterService.getAllSemesters(
            paginationOptions
        );

        sendResponse<IAcademicSemester[]>(res, status.OK, {
            success: true,
            message: "Academic semesters retrieved successfully!",
            meta: result.meta,
            data: result.data,
        });
    }
);

export const AcademicSemesterController = {
    createSemester,
    getAllSemesters,
};
