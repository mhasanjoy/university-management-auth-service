/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";
import { IAdmin } from "../admin/admin.interface";
import { IFaculty } from "../faculty/faculty.interface";
import { IStudent } from "../student/student.interface";

export type IUser = {
    id: string;
    role: string;
    password: string;
    needsPasswordChange: true | false;
    passwordChangedAt?: Date;
    student?: Types.ObjectId | IStudent;
    faculty?: Types.ObjectId | IFaculty;
    admin?: Types.ObjectId | IAdmin;
};

export type IUserMethods = {
    isUserExist(
        id: string
    ): Promise<Pick<
        IUser,
        "id" | "role" | "password" | "needsPasswordChange"
    > | null>;
};

export type UserModel = {
    isPasswordMatched(
        givenPassword: string,
        savedPassword: string
    ): Promise<boolean>;
} & Model<IUser, Record<string, never>, IUserMethods>;

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
