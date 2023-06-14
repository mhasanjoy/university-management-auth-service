import { Schema, model } from "mongoose";
import { bloodGroup, gender } from "./student.constant";
import { IStudent, StudentModel } from "./student.interface";

const schema = new Schema<IStudent, StudentModel>(
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
        guardian: {
            fatherName: {
                type: String,
                required: true,
            },
            fatherOccupation: {
                type: String,
                required: true,
            },
            fatherContactNo: {
                type: String,
                required: true,
            },
            motherName: {
                type: String,
                required: true,
            },
            motherOccupation: {
                type: String,
                required: true,
            },
            motherContactNo: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: true,
            },
        },
        localGuardian: {
            name: {
                type: String,
                required: true,
            },
            occupation: {
                type: String,
                required: true,
            },
            contactNo: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: true,
            },
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
        academicSemester: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "AcademicSemester",
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    }
);

const Student = model<IStudent, StudentModel>("Student", schema);

export default Student;
