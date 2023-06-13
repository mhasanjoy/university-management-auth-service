import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { academicFacultySearchableFields } from "./academic-faculty.constant";
import {
    IAcademicFaculty,
    IAcademicFacultyFilters,
} from "./academic-faculty.interface";
import AcademicFaculty from "./academic-faculty.model";

const createFaculty = async (
    payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
    const result = await AcademicFaculty.create(payload);
    return result;
};

const getAllFaculty = async (
    filters: IAcademicFacultyFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
    const { searchTerm, ...filtersData } = filters;

    const andConditions: Record<string, unknown>[] = [];
    if (searchTerm) {
        andConditions.push({
            $or: academicFacultySearchableFields.map(field => {
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

    const whereConditions = andConditions.length ? { $and: andConditions } : {};

    const result = await AcademicFaculty.find(whereConditions)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);

    const total = await AcademicFaculty.countDocuments();

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};

const getSingleFaculty = async (
    id: string
): Promise<IAcademicFaculty | null> => {
    const result = await AcademicFaculty.findById(id);
    return result;
};

const updateFaculty = async (
    id: string,
    payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
    const result = await AcademicFaculty.findOneAndUpdate(
        { _id: id },
        payload,
        { new: true, runValidators: true }
    );
    return result;
};

const deleteFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
    const result = await AcademicFaculty.findByIdAndDelete(id);
    return result;
};

export const AcademicFacultyService = {
    createFaculty,
    getAllFaculty,
    getSingleFaculty,
    updateFaculty,
    deleteFaculty,
};
