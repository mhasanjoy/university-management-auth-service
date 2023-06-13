import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { academicDepartmentSearchableFields } from "./academic-department.constant";
import {
    IAcademicDepartment,
    IAcademicDepartmentFilters,
} from "./academic-department.interface";
import AcademicDepartment from "./academic-department.model";

const createDepartment = async (
    payload: IAcademicDepartment
): Promise<IAcademicDepartment> => {
    const result = (await AcademicDepartment.create(payload)).populate(
        "academicFaculty"
    );
    return result;
};

const getAllDepartment = async (
    filters: IAcademicDepartmentFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
    const { searchTerm, ...filtersData } = filters;

    const andConditions: Record<string, unknown>[] = [];
    if (searchTerm) {
        andConditions.push({
            $or: academicDepartmentSearchableFields.map(field => {
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

    const result = await AcademicDepartment.find(whereConditions)
        .populate("academicFaculty")
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);

    const total = await AcademicDepartment.countDocuments();

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};

const getSingleDepartment = async (
    id: string
): Promise<IAcademicDepartment | null> => {
    const result = await AcademicDepartment.findById(id).populate(
        "academicFaculty"
    );
    return result;
};

const updateDepartment = async (
    id: string,
    payload: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null> => {
    const result = await AcademicDepartment.findOneAndUpdate(
        { _id: id },
        payload,
        { new: true, runValidators: true }
    ).populate("academicFaculty");
    return result;
};

const deleteDepartment = async (
    id: string
): Promise<IAcademicDepartment | null> => {
    const result = await AcademicDepartment.findByIdAndDelete(id);
    return result;
};

export const AcademicDepartmentService = {
    createDepartment,
    getAllDepartment,
    getSingleDepartment,
    updateDepartment,
    deleteDepartment,
};
