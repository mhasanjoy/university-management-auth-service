import { Model, Types } from "mongoose";
import { IAcademicDepartment } from "../academic-department/academic-department.interface";
import { IAcademicFaculty } from "../academic-faculty/academic-faculty.interface";
import { IBloodGroup, IGender, IUserName } from "../user/user.interface";

export type IFaculty = {
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
    designation: string;
    profileImage?: string;
    academicFaculty: Types.ObjectId | IAcademicFaculty;
    academicDepartment: Types.ObjectId | IAcademicDepartment;
};

export type FacultyModel = Model<IFaculty, Record<string, unknown>>;

export type IFacultyFilters = {
    searchTerm?: string;
    id?: string;
    bloodGroup?: IBloodGroup;
    email?: string;
    contactNo?: string;
    designation?: string;
};
