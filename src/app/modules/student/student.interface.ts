import { Model, Types } from "mongoose";
import { IAcademicDepartment } from "../academic-department/academic-department.interface";
import { IAcademicFaculty } from "../academic-faculty/academic-faculty.interface";
import { IAcademicSemester } from "../academic-semester/academic-semester.interface";
import { IBloodGroup, IGender, IUserName } from "../user/user.interface";

type IGuardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
    address: string;
};

type ILocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
};

export type IStudent = {
    id: string;
    name: IUserName;
    dateOfBirth: string;
    gender: IGender;
    bloodGroup?: IBloodGroup;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    presentAddress: string;
    permanentAddress: string;
    guardian: IGuardian;
    localGuardian: ILocalGuardian;
    profileImage?: string;
    academicFaculty: Types.ObjectId | IAcademicFaculty;
    academicDepartment: Types.ObjectId | IAcademicDepartment;
    academicSemester: Types.ObjectId | IAcademicSemester;
};

export type StudentModel = Model<IStudent, Record<string, unknown>>;

export type IStudentFilters = {
    searchTerm?: string;
    id?: string;
    bloodGroup?: IBloodGroup;
    email?: string;
    contactNo?: string;
    emergencyContactNo?: string;
};
