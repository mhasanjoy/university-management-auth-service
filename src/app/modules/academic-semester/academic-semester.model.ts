import status from "http-status";
import { Schema, model } from "mongoose";
import ApiError from "../../../errors/ApiError";
import {
    academicSemesterCode,
    academicSemesterMonth,
    academicSemesterTitle,
} from "./academic-semester.constant";
import {
    AcademicSemesterModel,
    IAcademicSemester,
} from "./academic-semester.interface";

const schema = new Schema<IAcademicSemester, AcademicSemesterModel>(
    {
        title: {
            type: String,
            required: true,
            enum: academicSemesterTitle,
        },
        year: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
            enum: academicSemesterCode,
        },
        startMonth: {
            type: String,
            required: true,
            enum: academicSemesterMonth,
        },
        endMonth: {
            type: String,
            required: true,
            enum: academicSemesterMonth,
        },
    },
    {
        timestamps: true,
    }
);

schema.pre("save", async function (next) {
    const isExist = await AcademicSemester.findOne({
        title: this.title,
        year: this.year,
    });
    if (isExist) {
        throw new ApiError(
            status.CONFLICT,
            "Academic semester already exists!"
        );
    }
    next();
});

const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
    "AcademicSemester",
    schema
);

export default AcademicSemester;
