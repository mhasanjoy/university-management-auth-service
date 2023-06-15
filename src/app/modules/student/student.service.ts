import status from "http-status";
import mongoose, { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import User from "../user/user.model";
import { studentSearchableFields } from "./student.constant";
import { IStudent, IStudentFilters } from "./student.interface";
import Student from "./student.model";

const getAllStudents = async (
    filters: IStudentFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IStudent[]>> => {
    const { searchTerm, ...filtersData } = filters;

    const andConditions: Record<string, unknown>[] = [];
    if (searchTerm) {
        andConditions.push({
            $or: studentSearchableFields.map(field => {
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

    const result = await Student.find(whereConditions)
        .populate("academicFaculty")
        .populate("academicDepartment")
        .populate("academicSemester")
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);

    const total = await Student.countDocuments(whereConditions);

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
    const result = await Student.findOne({ id })
        .populate("academicFaculty")
        .populate("academicDepartment")
        .populate("academicSemester");

    return result;
};

const updateStudent = async (
    id: string,
    payload: Partial<IStudent>
): Promise<IStudent | null> => {
    const isExist = await Student.findOne({ id });
    if (!isExist) {
        throw new ApiError(status.NOT_FOUND, "Student not found!");
    }

    const { name, guardian, localGuardian, ...studentData } = payload;
    const newStudentData: Partial<IStudent> = { ...studentData };

    if (name && Object.keys(name)) {
        Object.keys(name).forEach((key: string) => {
            const nameKey = `name.${key}`;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (newStudentData as any)[nameKey] = name[key as keyof typeof name];
        });
    }

    if (guardian && Object.keys(guardian)) {
        Object.keys(guardian).forEach((key: string) => {
            const guardianKey = `guardian.${key}`;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (newStudentData as any)[guardianKey] =
                guardian[key as keyof typeof guardian];
        });
    }

    if (localGuardian && Object.keys(localGuardian)) {
        Object.keys(localGuardian).forEach((key: string) => {
            const localGuardianKey = `localGuardian.${key}`;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (newStudentData as any)[localGuardianKey] =
                localGuardian[key as keyof typeof localGuardian];
        });
    }

    const result = await Student.findOneAndUpdate({ id }, newStudentData, {
        new: true,
        runValidators: true,
    })
        .populate("academicFaculty")
        .populate("academicDepartment")
        .populate("academicSemester");

    return result;
};

const deleteStudent = async (id: string): Promise<IStudent | null> => {
    let deletedStudentData: IStudent | null = null;
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const deletedStudent = await Student.findOneAndDelete([{ id }], {
            session,
        })
            .populate("academicFaculty")
            .populate("academicDepartment")
            .populate("academicSemester");

        if (!deletedStudent) {
            throw new ApiError(status.BAD_REQUEST, "Failed to delete student!");
        }

        const deletedUser = await User.findOneAndDelete([{ id }], { session });
        if (!deletedUser) {
            throw new ApiError(status.BAD_REQUEST, "Failed to delete user!");
        }

        deletedStudentData = deletedStudent;

        await session.commitTransaction();
        await session.endSession();
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw error;
    }

    return deletedStudentData;
};

export const StudentService = {
    getAllStudents,
    getSingleStudent,
    updateStudent,
    deleteStudent,
};
