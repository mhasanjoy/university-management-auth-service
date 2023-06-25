import { Model, Types } from "mongoose";
import { IAdmin } from "../admin/admin.interface";
import { IFaculty } from "../faculty/faculty.interface";
import { IStudent } from "../student/student.interface";

export type IUser = {
    id: string;
    role: string;
    password: string;
    needsPasswordChange: true | false;
    student?: Types.ObjectId | IStudent;
    faculty?: Types.ObjectId | IFaculty;
    admin?: Types.ObjectId | IAdmin;
};

// type IUserMethods = {
//     isUserExist(id: string): Promise<boolean>;
//     isPasswordMatched(
//         givenPassword: string,
//         savedPassword: string
//     ): Promise<boolean>;
// };

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
