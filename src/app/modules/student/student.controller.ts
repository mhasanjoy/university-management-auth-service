import { RequestHandler } from "express";
import status from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { studentFilterableFields } from "./student.constant";
import { IStudent } from "./student.interface";
import { StudentService } from "./student.service";

const getAllStudents: RequestHandler = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req, res, next) => {
        const filters = pick(req.query, studentFilterableFields);
        const paginationOptions = pick(req.query, paginationFields);

        const result = await StudentService.getAllStudents(
            filters,
            paginationOptions
        );

        sendResponse<IStudent[]>(res, status.OK, {
            success: true,
            message: "Students retrieved successfully!",
            meta: result.meta,
            data: result.data,
        });
    }
);

const getSingleStudent: RequestHandler = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req, res, next) => {
        const id = req.params.id;
        const result = await StudentService.getSingleStudent(id);

        sendResponse<IStudent>(res, status.OK, {
            success: true,
            message: "Student retrieved successfully!",
            data: result,
        });
    }
);

const updateStudent: RequestHandler = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req, res, next) => {
        const id = req.params.id;
        const { ...updatedData } = req.body;

        const result = await StudentService.updateStudent(id, updatedData);

        sendResponse<IStudent>(res, status.OK, {
            success: true,
            message: "Student updated successfully!",
            data: result,
        });
    }
);

const deleteStudent: RequestHandler = catchAsync(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req, res, next) => {
        const id = req.params.id;
        const result = await StudentService.deleteStudent(id);

        sendResponse<IStudent>(res, status.OK, {
            success: true,
            message: "Student deleted successfully!",
            data: result,
        });
    }
);

export const StudentController = {
    getAllStudents,
    getSingleStudent,
    updateStudent,
    deleteStudent,
};
