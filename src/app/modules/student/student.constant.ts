import { IBloodGroup, IGender } from "./student.interface";

export const gender: IGender[] = ["male", "female"];

export const bloodGroup: IBloodGroup[] = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
];

export const studentSearchableFields: string[] = [
    "id",
    "email",
    "contactNo",
    "name.firstName",
    "name.middleName",
    "name.lastName",
];

export const studentFilterableFields: string[] = [
    "searchTerm",
    "id",
    "bloodGroup",
    "email",
    "contactNo",
    "emergencyContactNo",
];
