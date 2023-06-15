import status from "http-status";
import mongoose, { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import User from "../user/user.model";
import { facultySearchableFields } from "./faculty.constant";
import { IFaculty, IFacultyFilters } from "./faculty.interface";
import Faculty from "./faculty.model";

const getAllFaculty = async (
    filters: IFacultyFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFaculty[]>> => {
    const { searchTerm, ...filtersData } = filters;

    const andConditions: Record<string, unknown>[] = [];
    if (searchTerm) {
        andConditions.push({
            $or: facultySearchableFields.map(field => {
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

    const result = await Faculty.find(whereConditions)
        .populate("academicFaculty")
        .populate("academicDepartment")
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);

    const total = await Faculty.countDocuments(whereConditions);

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
    const result = await Faculty.findOne({ id })
        .populate("academicFaculty")
        .populate("academicDepartment");

    return result;
};

const updateFaculty = async (
    id: string,
    payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
    const isExist = await Faculty.findOne({ id });
    if (!isExist) {
        throw new ApiError(status.NOT_FOUND, "Faculty not found!");
    }

    const { name, ...FacultyData } = payload;
    const newFacultyData: Partial<IFaculty> = { ...FacultyData };

    if (name && Object.keys(name)) {
        Object.keys(name).forEach((key: string) => {
            const nameKey = `name.${key}`;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (newFacultyData as any)[nameKey] = name[key as keyof typeof name];
        });
    }

    const result = await Faculty.findOneAndUpdate({ id }, newFacultyData, {
        new: true,
        runValidators: true,
    })
        .populate("academicFaculty")
        .populate("academicDepartment");

    return result;
};

const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
    let deletedFacultyData: IFaculty | null = null;
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const deletedFaculty = await Faculty.findOneAndDelete([{ id }], {
            session,
        })
            .populate("academicFaculty")
            .populate("academicDepartment");

        if (!deletedFaculty) {
            throw new ApiError(status.BAD_REQUEST, "Failed to delete faculty!");
        }

        const deletedUser = await User.findOneAndDelete([{ id }], { session });
        if (!deletedUser) {
            throw new ApiError(status.BAD_REQUEST, "Failed to delete user!");
        }

        deletedFacultyData = deletedFaculty;

        await session.commitTransaction();
        await session.endSession();
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw error;
    }

    return deletedFacultyData;
};

export const FacultyService = {
    getAllFaculty,
    getSingleFaculty,
    updateFaculty,
    deleteFaculty,
};
