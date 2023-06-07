import { Schema, model } from "mongoose";
import {
    AcademicSemesterModel,
    IAcademicSemester,
} from "./academic-semester.interface";

const schema = new Schema<IAcademicSemester, AcademicSemesterModel>(
    {
        title: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
        startMonth: {
            type: String,
            required: true,
        },
        endMonth: {
            type: String,
            required: true,
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
