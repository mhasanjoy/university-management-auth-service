import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { academicDepartmentSearchableFields } from "../academic-department/academic-department.constant";
import {
    IManagementDepartment,
    IManagementDepartmentFilters,
} from "./management-department.interface";
import ManagementDepartment from "./management-department.model";

const createDepartment = async (
    payload: IManagementDepartment
): Promise<IManagementDepartment> => {
    const result = await ManagementDepartment.create(payload);
    return result;
};

const getAllDepartment = async (
    filters: IManagementDepartmentFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IManagementDepartment[]>> => {
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

    const result = await ManagementDepartment.find(whereConditions)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);

    const total = await ManagementDepartment.countDocuments();

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
): Promise<IManagementDepartment | null> => {
    const result = await ManagementDepartment.findById(id);
    return result;
};

const updateDepartment = async (
    id: string,
    payload: Partial<IManagementDepartment>
): Promise<IManagementDepartment | null> => {
    const result = await ManagementDepartment.findOneAndUpdate(
        { _id: id },
        payload,
        { new: true, runValidators: true }
    );
    return result;
};

const deleteDepartment = async (
    id: string
): Promise<IManagementDepartment | null> => {
    const result = await ManagementDepartment.findByIdAndDelete(id);
    return result;
};

export const ManagementDepartmentService = {
    createDepartment,
    getAllDepartment,
    getSingleDepartment,
    updateDepartment,
    deleteDepartment,
};
