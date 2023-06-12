import { NextFunction, Request, Response } from "express";
import status from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { academicSemesterFilterableFields } from "./academic-semester.constant";
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
        const filters = pick(req.query, academicSemesterFilterableFields);
        const paginationOptions = pick(req.query, paginationFields);

        const result = await AcademicSemesterService.getAllSemesters(
            filters,
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

const getSingleSemester = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const result = await AcademicSemesterService.getSingleSemester(id);

        sendResponse<IAcademicSemester>(res, status.OK, {
            success: true,
            message: "Academic semester retrieved successfully!",
            data: result,
        });
    }
);

const updateSemester = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const { ...updatedData } = req.body;

        const result = await AcademicSemesterService.updateSemester(
            id,
            updatedData
        );

        sendResponse<IAcademicSemester>(res, status.OK, {
            success: true,
            message: "Academic semester updated successfully!",
            data: result,
        });
    }
);

const deleteSemester = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const result = await AcademicSemesterService.deleteSemester(id);

        sendResponse<IAcademicSemester>(res, status.OK, {
            success: true,
            message: "Academic semester deleted successfully!",
            data: result,
        });
    }
);

export const AcademicSemesterController = {
    createSemester,
    getAllSemesters,
    getSingleSemester,
    updateSemester,
    deleteSemester,
};
