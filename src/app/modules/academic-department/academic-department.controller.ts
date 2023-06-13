import { NextFunction, Request, Response } from "express";
import status from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { academicDepartmentFilterableFields } from "./academic-department.constant";
import { IAcademicDepartment } from "./academic-department.interface";
import { AcademicDepartmentService } from "./academic-department.service";

const createDepartment = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { ...academicDepartmentData } = req.body;
        const result = await AcademicDepartmentService.createDepartment(
            academicDepartmentData
        );

        sendResponse<IAcademicDepartment>(res, status.OK, {
            success: true,
            message: "Academic department created successfully!",
            data: result,
        });
    }
);

const getAllDepartment = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, next: NextFunction) => {
        const filters = pick(req.query, academicDepartmentFilterableFields);
        const paginationOptions = pick(req.query, paginationFields);

        const result = await AcademicDepartmentService.getAllDepartment(
            filters,
            paginationOptions
        );

        sendResponse<IAcademicDepartment[]>(res, status.OK, {
            success: true,
            message: "Academic department retrieved successfully!",
            meta: result.meta,
            data: result.data,
        });
    }
);

const getSingleDepartment = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const result = await AcademicDepartmentService.getSingleDepartment(id);

        sendResponse<IAcademicDepartment>(res, status.OK, {
            success: true,
            message: "Academic department retrieved successfully!",
            data: result,
        });
    }
);

const updateDepartment = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const { ...updatedData } = req.body;

        const result = await AcademicDepartmentService.updateDepartment(
            id,
            updatedData
        );

        sendResponse<IAcademicDepartment>(res, status.OK, {
            success: true,
            message: "Academic department updated successfully!",
            data: result,
        });
    }
);

const deleteDepartment = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const result = await AcademicDepartmentService.deleteDepartment(id);

        sendResponse<IAcademicDepartment>(res, status.OK, {
            success: true,
            message: "Academic department deleted successfully!",
            data: result,
        });
    }
);

export const AcademicDepartmentController = {
    createDepartment,
    getAllDepartment,
    getSingleDepartment,
    updateDepartment,
    deleteDepartment,
};
