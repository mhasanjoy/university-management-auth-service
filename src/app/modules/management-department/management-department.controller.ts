import { RequestHandler } from "express";
import status from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { managementDepartmentFilterableFields } from "./management-department.constant";
import { IManagementDepartment } from "./management-department.interface";
import { ManagementDepartmentService } from "./management-department.service";

const createDepartment: RequestHandler = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req, res, next): Promise<void> => {
        const { ...managementDepartmentData } = req.body;
        const result = await ManagementDepartmentService.createDepartment(
            managementDepartmentData
        );

        sendResponse<IManagementDepartment>(res, status.OK, {
            success: true,
            message: "Management department created successfully!",
            data: result,
        });
    }
);

const getAllDepartment: RequestHandler = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req, res, next) => {
        const filters = pick(req.query, managementDepartmentFilterableFields);
        const paginationOptions = pick(req.query, paginationFields);

        const result = await ManagementDepartmentService.getAllDepartment(
            filters,
            paginationOptions
        );

        sendResponse<IManagementDepartment[]>(res, status.OK, {
            success: true,
            message: "Management department retrieved successfully!",
            meta: result.meta,
            data: result.data,
        });
    }
);

const getSingleDepartment = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req, res, next) => {
        const id = req.params.id;
        const result = await ManagementDepartmentService.getSingleDepartment(
            id
        );

        sendResponse<IManagementDepartment>(res, status.OK, {
            success: true,
            message: "Management department retrieved successfully!",
            data: result,
        });
    }
);

const updateDepartment = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req, res, nextn) => {
        const id = req.params.id;
        const { ...updatedData } = req.body;

        const result = await ManagementDepartmentService.updateDepartment(
            id,
            updatedData
        );

        sendResponse<IManagementDepartment>(res, status.OK, {
            success: true,
            message: "Management department updated successfully!",
            data: result,
        });
    }
);

const deleteDepartment = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req, res, next) => {
        const id = req.params.id;
        const result = await ManagementDepartmentService.deleteDepartment(id);

        sendResponse<IManagementDepartment>(res, status.OK, {
            success: true,
            message: "Management department deleted successfully!",
            data: result,
        });
    }
);

export const ManagementDepartmentController = {
    createDepartment,
    getAllDepartment,
    getSingleDepartment,
    updateDepartment,
    deleteDepartment,
};
