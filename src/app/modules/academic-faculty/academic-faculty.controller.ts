import { NextFunction, Request, Response } from "express";
import status from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { academicFacultyFilterableFields } from "./academic-faculty.constant";
import { IAcademicFaculty } from "./academic-faculty.interface";
import { AcademicFacultyService } from "./academic-faculty.service";

const createFaculty = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { ...academicFacultyData } = req.body;
        const result = await AcademicFacultyService.createFaculty(
            academicFacultyData
        );

        sendResponse<IAcademicFaculty>(res, status.OK, {
            success: true,
            message: "Academic faculty created successfully!",
            data: result,
        });
    }
);

const getAllFaculty = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, next: NextFunction) => {
        const filters = pick(req.query, academicFacultyFilterableFields);
        const paginationOptions = pick(req.query, paginationFields);

        const result = await AcademicFacultyService.getAllFaculty(
            filters,
            paginationOptions
        );

        sendResponse<IAcademicFaculty[]>(res, status.OK, {
            success: true,
            message: "Academic faculty retrieved successfully!",
            meta: result.meta,
            data: result.data,
        });
    }
);

const getSingleFaculty = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const result = await AcademicFacultyService.getSingleFaculty(id);

        sendResponse<IAcademicFaculty>(res, status.OK, {
            success: true,
            message: "Academic faculty retrieved successfully!",
            data: result,
        });
    }
);

const updateFaculty = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const { ...updatedData } = req.body;

        const result = await AcademicFacultyService.updateFaculty(
            id,
            updatedData
        );

        sendResponse<IAcademicFaculty>(res, status.OK, {
            success: true,
            message: "Academic faculty updated successfully!",
            data: result,
        });
    }
);

const deleteFaculty = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const result = await AcademicFacultyService.deleteFaculty(id);

        sendResponse<IAcademicFaculty>(res, status.OK, {
            success: true,
            message: "Academic faculty deleted successfully!",
            data: result,
        });
    }
);

export const AcademicFacultyController = {
    createFaculty,
    getAllFaculty,
    getSingleFaculty,
    updateFaculty,
    deleteFaculty,
};
