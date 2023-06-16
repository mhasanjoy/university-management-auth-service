import { IAcademicSemester } from "../academic-semester/academic-semester.interface";
import User from "./user.model";

const findLastStudentId = async (): Promise<string | null> => {
    const lastStudent = await User.findOne(
        {
            role: "student",
        },
        {
            _id: 0,
            id: 1,
        }
    )
        .sort({
            createdAt: -1,
        })
        .lean();

    return lastStudent?.id ? lastStudent.id.substring(4) : null;
};

export const generateStudentId = async (
    academicSemester: IAcademicSemester
): Promise<string> => {
    const lastStudentId = (await findLastStudentId()) || "0";
    let currentStudentId = (parseInt(lastStudentId) + 1)
        .toString()
        .padStart(5, "0");

    currentStudentId = `${academicSemester.year.substring(2)}${
        academicSemester.code
    }${currentStudentId}`;

    return currentStudentId;
};

const findLastFacultyId = async (): Promise<string | null> => {
    const lastFaculty = await User.findOne(
        {
            role: "faculty",
        },
        {
            _id: 0,
            id: 1,
        }
    )
        .sort({
            createdAt: -1,
        })
        .lean();

    return lastFaculty?.id ? lastFaculty.id.substring(2) : null;
};

export const generateFacultyId = async (): Promise<string> => {
    const lastFacultyId = (await findLastFacultyId()) || "0";
    let currentFacultyId = (parseInt(lastFacultyId) + 1)
        .toString()
        .padStart(5, "0");

    currentFacultyId = `F-${currentFacultyId}`;

    return currentFacultyId;
};

const findLastAdminId = async (): Promise<string | null> => {
    const lastAdmin = await User.findOne(
        {
            role: "admin",
        },
        {
            _id: 0,
            id: 1,
        }
    )
        .sort({
            createdAt: -1,
        })
        .lean();

    return lastAdmin?.id ? lastAdmin.id.substring(2) : null;
};

export const generateAdminId = async (): Promise<string> => {
    const lastAdminId = (await findLastAdminId()) || "0";
    let currentAdminId = (parseInt(lastAdminId) + 1)
        .toString()
        .padStart(5, "0");

    currentAdminId = `A-${currentAdminId}`;

    return currentAdminId;
};
