import { RequestHandler } from "express";
import status from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { adminFilterableFields } from "./admin.constant";
import { IAdmin } from "./admin.interface";
import { AdminService } from "./admin.service";

const getAllAdmin: RequestHandler = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req, res, next) => {
        const filters = pick(req.query, adminFilterableFields);
        const paginationOptions = pick(req.query, paginationFields);

        const result = await AdminService.getAllAdmin(
            filters,
            paginationOptions
        );

        sendResponse<IAdmin[]>(res, status.OK, {
            success: true,
            message: "All admin retrieved successfully!",
            meta: result.meta,
            data: result.data,
        });
    }
);

const getSingleAdmin: RequestHandler = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req, res, next) => {
        const id = req.params.id;
        const result = await AdminService.getSingleAdmin(id);

        sendResponse<IAdmin>(res, status.OK, {
            success: true,
            message: "Admin retrieved successfully!",
            data: result,
        });
    }
);

const updateAdmin: RequestHandler = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req, res, next) => {
        const id = req.params.id;
        const { ...updatedData } = req.body;

        const result = await AdminService.updateAdmin(id, updatedData);

        sendResponse<IAdmin>(res, status.OK, {
            success: true,
            message: "Admin updated successfully!",
            data: result,
        });
    }
);

const deleteAdmin: RequestHandler = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req, res, next) => {
        const id = req.params.id;
        const result = await AdminService.deleteAdmin(id);

        sendResponse<IAdmin>(res, status.OK, {
            success: true,
            message: "Admin deleted successfully!",
            data: result,
        });
    }
);

export const AdminController = {
    getAllAdmin,
    getSingleAdmin,
    updateAdmin,
    deleteAdmin,
};
