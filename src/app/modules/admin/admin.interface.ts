import { Model, Types } from "mongoose";
import { IManagementDepartment } from "../management-department/management-department.interface";
import { IBloodGroup, IGender, IUserName } from "../user/user.interface";

export type IAdmin = {
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
    managementDepartment: Types.ObjectId | IManagementDepartment;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;

export type IAdminFilters = {
    searchTerm?: string;
    id?: string;
    bloodGroup?: IBloodGroup;
    email?: string;
    contactNo?: string;
    designation?: string;
    managementDepartment?: string;
};
