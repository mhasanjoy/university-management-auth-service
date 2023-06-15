import { Schema, model } from "mongoose";
import { bloodGroup, gender } from "../user/user.constant";
import { FacultyModel, IFaculty } from "./faculty.interface";

const schema = new Schema<IFaculty, FacultyModel>(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            firstName: {
                type: String,
                required: true,
            },
            middleName: String,
            lastName: {
                type: String,
                required: true,
            },
        },
        dateOfBirth: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
            enum: gender,
        },
        bloodGroup: {
            type: String,
            enum: bloodGroup,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        contactNo: {
            type: String,
            required: true,
            unique: true,
        },
        emergencyContactNo: {
            type: String,
            required: true,
        },
        presentAddress: {
            type: String,
            required: true,
        },
        permanentAddress: {
            type: String,
            required: true,
        },
        designation: {
            type: String,
            required: true,
        },
        profileImage: {
            type: String,
            // required: true,
        },
        academicFaculty: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "AcademicFaculty",
        },
        academicDepartment: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "AcademicDepartment",
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    }
);

const Faculty = model<IFaculty, FacultyModel>("Faculty", schema);

export default Faculty;
