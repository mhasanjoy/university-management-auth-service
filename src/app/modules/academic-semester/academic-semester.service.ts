import status from "http-status";
import { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { academicSemesterTitleCodeMapper } from "./academic-semester.constant";
import { IAcademicSemester } from "./academic-semester.interface";
import AcademicSemester from "./academic-semester.model";

const createSemester = async (
    payload: IAcademicSemester
): Promise<IAcademicSemester> => {
    if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
        throw new ApiError(
            status.BAD_REQUEST,
            "Invalid academic semester code!"
        );
    }
    const result = await AcademicSemester.create(payload);
    return result;
};

const getAllSemesters = async (
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
    const { page, limit, skip, sortBy, sortOrder } =
        paginationHelpers.calculatePagination(paginationOptions);

    const sortCondition: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }

    const result = await AcademicSemester.find()
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);

    const total = await AcademicSemester.countDocuments();

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};

export const AcademicSemesterService = {
    createSemester,
    getAllSemesters,
};
