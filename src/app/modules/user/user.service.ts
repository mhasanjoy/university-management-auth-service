import status from "http-status";
import mongoose from "mongoose";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import AcademicSemester from "../academic-semester/academic-semester.model";
import { IFaculty } from "../faculty/faculty.interface";
import Faculty from "../faculty/faculty.model";
import { IStudent } from "../student/student.interface";
import Student from "../student/student.model";
import { IUser } from "./user.interface";
import User from "./user.model";
import { generateFacultyId, generateStudentId } from "./user.utils";

const createStudent = async (
    student: IStudent,
    user: IUser
): Promise<IUser | null> => {
    // default password
    if (!user.password) {
        user.password = config.default_student_password as string;
    }

    // set role
    user.role = "student";

    // auto generated incremental id
    const academicSemester = await AcademicSemester.findById(
        student.academicSemester
    );
    if (!academicSemester) {
        throw new ApiError(status.NOT_FOUND, "Academic semester not found!");
    }

    let newUserData: IUser | null = null;
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        const id = await generateStudentId(academicSemester);
        student.id = id;
        user.id = id;

        const newStudent = await Student.create([student], { session });
        if (!newStudent.length) {
            throw new ApiError(status.BAD_REQUEST, "Failed to create student!");
        }

        // set student _id into user
        user.student = newStudent[0]._id;
        const newUser = await User.create([user], { session });
        if (!newUser.length) {
            throw new ApiError(status.BAD_REQUEST, "Failed to create user!");
        }

        newUserData = newUser[0];

        await session.commitTransaction();
        await session.endSession();
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw error;
    }

    if (newUserData) {
        newUserData = await User.findOne({ id: newUserData.id }).populate({
            path: "student",
            populate: [
                {
                    path: "academicFaculty",
                },
                {
                    path: "academicDepartment",
                },
                {
                    path: "academicSemester",
                },
            ],
        });
    }
    return newUserData;
};

const createFaculty = async (
    faculty: IFaculty,
    user: IUser
): Promise<IUser | null> => {
    // default password
    if (!user.password) {
        user.password = config.default_faculty_password as string;
    }

    // set role
    user.role = "faculty";

    let newUserData: IUser | null = null;
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // auto generated incremental id
        const id = await generateFacultyId();
        faculty.id = id;
        user.id = id;

        const newFaculty = await Faculty.create([faculty], { session });
        if (!newFaculty.length) {
            throw new ApiError(status.BAD_REQUEST, "Failed to create faculty!");
        }

        // set faculty _id into user
        user.faculty = newFaculty[0]._id;
        const newUser = await User.create([user], { session });
        if (!newUser.length) {
            throw new ApiError(status.BAD_REQUEST, "Failed to create user!");
        }

        newUserData = newUser[0];

        await session.commitTransaction();
        await session.endSession();
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw error;
    }

    if (newUserData) {
        newUserData = await User.findOne({ id: newUserData.id }).populate({
            path: "faculty",
            populate: [
                {
                    path: "academicFaculty",
                },
                {
                    path: "academicDepartment",
                },
            ],
        });
    }
    return newUserData;
};

export const UserService = {
    createStudent,
    createFaculty,
};
