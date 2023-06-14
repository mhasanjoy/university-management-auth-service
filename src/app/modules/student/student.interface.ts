import { Model, Types } from "mongoose";
import { IAcademicDepartment } from "../academic-department/academic-department.interface";
import { IAcademicFaculty } from "../academic-faculty/academic-faculty.interface";
import { IAcademicSemester } from "../academic-semester/academic-semester.interface";

type IUserName = {
    firstName: string;
    middleName?: string;
    lastName: string;
};

export type IGender = "male" | "female";

export type IBloodGroup =
    | "A+"
    | "A-"
    | "B+"
    | "B-"
    | "AB+"
    | "AB-"
    | "O+"
    | "O-";

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
