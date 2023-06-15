import { Model, Types } from "mongoose";
import { IFaculty } from "../faculty/faculty.interface";
import { IStudent } from "../student/student.interface";

export type IUser = {
    id: string;
    role: string;
    password: string;
    student?: Types.ObjectId | IStudent;
    faculty?: Types.ObjectId | IFaculty;
    // admin?: Types.ObjectId | IAdmin;
};

export type UserModel = Model<IUser, Record<string, unknown>>;

export type IUserName = {
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
