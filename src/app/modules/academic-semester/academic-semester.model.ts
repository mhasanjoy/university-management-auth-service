import { Schema, model } from "mongoose";
import {
    AcademicSemesterModel,
    IAcademicSemester,
} from "./academic-semester.interface";

const Month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const schema = new Schema<IAcademicSemester, AcademicSemesterModel>(
    {
        title: {
            type: String,
            required: true,
            enum: ["Autumn", "Summer", "Fall"],
        },
        year: {
            type: Number,
            required: true,
        },
        code: {
            type: String,
            required: true,
            enum: ["01", "02", "03"],
        },
        startMonth: {
            type: String,
            required: true,
            enum: Month,
        },
        endMonth: {
            type: String,
            required: true,
            enum: Month,
        },
    },
    {
        timestamps: true,
    }
);

const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
    "AcademicSemester",
    schema
);

export default AcademicSemester;
