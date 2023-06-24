import status from "http-status";
import mongoose, { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import User from "../user/user.model";
import { adminSearchableFields } from "./admin.constant";
import { IAdmin, IAdminFilters } from "./admin.interface";
import Admin from "./admin.model";

const getAllAdmin = async (
    filters: IAdminFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAdmin[]>> => {
    const { searchTerm, ...filtersData } = filters;

    const andConditions: Record<string, unknown>[] = [];
    if (searchTerm) {
        andConditions.push({
            $or: adminSearchableFields.map(field => {
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

    const result = await Admin.find(whereConditions)
        .populate("managementDepartment")
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);

    const total = await Admin.countDocuments(whereConditions);

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};

const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
    const result = await Admin.findOne({ id }).populate("managementDepartment");

    return result;
};

const updateAdmin = async (
    id: string,
    payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
    const isExist = await Admin.findOne({ id });
    if (!isExist) {
        throw new ApiError(status.NOT_FOUND, "Admin not found!");
    }

    const { name, ...AdminData } = payload;
    const newAdminData: Partial<IAdmin> = { ...AdminData };

    if (name && Object.keys(name)) {
        Object.keys(name).forEach((key: string) => {
            const nameKey = `name.${key}`;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (newAdminData as any)[nameKey] = name[key as keyof typeof name];
        });
    }

    const result = await Admin.findOneAndUpdate({ id }, newAdminData, {
        new: true,
        runValidators: true,
    }).populate("managementDepartment");

    return result;
};

const deleteAdmin = async (id: string): Promise<IAdmin | null> => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const admin = await Admin.findOneAndDelete(
            { id },
            {
                session,
            }
        ).populate("managementDepartment");

        if (!admin) {
            throw new ApiError(status.BAD_REQUEST, "Failed to delete admin!");
        }

        const user = await User.findOneAndDelete({ id }, { session });
        if (!user) {
            throw new ApiError(status.BAD_REQUEST, "Failed to delete user!");
        }

        await session.commitTransaction();
        await session.endSession();

        return admin;
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw error;
    }
};

export const AdminService = {
    getAllAdmin,
    getSingleAdmin,
    updateAdmin,
    deleteAdmin,
};
