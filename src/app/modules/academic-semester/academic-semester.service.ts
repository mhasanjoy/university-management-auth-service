import status from "http-status";
import { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import {
    academicSemesterSearchableFields,
    academicSemesterTitleCodeMapper,
} from "./academic-semester.constant";
import {
    IAcademicSemester,
    IAcademicSemesterFilters,
} from "./academic-semester.interface";
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
    filters: IAcademicSemesterFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
    const { searchTerm, ...filtersData } = filters;

    const andConditions: Record<string, unknown>[] = [];
    if (searchTerm) {
        andConditions.push({
            $or: academicSemesterSearchableFields.map(field => {
                return {
                    [field]: {
                        $regex: searchTerm,
                        $options: "i",
                    },
                };
            }),
        });
    }

    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => {
                return {
                    [field]: value,
                };
            }),
        });
    }

    const { page, limit, skip, sortBy, sortOrder } =
        paginationHelpers.calculatePagination(paginationOptions);

    const sortCondition: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }

    const result = await AcademicSemester.find({ $and: andConditions })
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
