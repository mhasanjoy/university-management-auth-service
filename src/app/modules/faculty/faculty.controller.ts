import { RequestHandler } from "express";
import status from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { facultyFilterableFields } from "./faculty.constant";
import { IFaculty } from "./faculty.interface";
import { FacultyService } from "./faculty.service";

const getAllFaculty: RequestHandler = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req, res, next) => {
        const filters = pick(req.query, facultyFilterableFields);
        const paginationOptions = pick(req.query, paginationFields);

        const result = await FacultyService.getAllFaculty(
            filters,
            paginationOptions
        );

        sendResponse<IFaculty[]>(res, status.OK, {
            success: true,
            message: "All faculty retrieved successfully!",
            meta: result.meta,
            data: result.data,
        });
    }
);

const getSingleFaculty: RequestHandler = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req, res, next) => {
        const id = req.params.id;
        const result = await FacultyService.getSingleFaculty(id);

        sendResponse<IFaculty>(res, status.OK, {
            success: true,
            message: "Faculty retrieved successfully!",
            data: result,
        });
    }
);

const updateFaculty: RequestHandler = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req, res, next) => {
        const id = req.params.id;
        const { ...updatedData } = req.body;

        const result = await FacultyService.updateFaculty(id, updatedData);

        sendResponse<IFaculty>(res, status.OK, {
            success: true,
            message: "Faculty updated successfully!",
            data: result,
        });
    }
);

const deleteFaculty: RequestHandler = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req, res, next) => {
        const id = req.params.id;
        const result = await FacultyService.deleteFaculty(id);

        sendResponse<IFaculty>(res, status.OK, {
            success: true,
            message: "Faculty deleted successfully!",
            data: result,
        });
    }
);

export const FacultyController = {
    getAllFaculty,
    getSingleFaculty,
    updateFaculty,
    deleteFaculty,
};
