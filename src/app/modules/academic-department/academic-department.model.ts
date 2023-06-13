import status from "http-status";
import { Schema, model } from "mongoose";
import ApiError from "../../../errors/ApiError";
import AcademicFaculty from "../academic-faculty/academic-faculty.model";
import {
    AcademicDepartmentModel,
    IAcademicDepartment,
} from "./academic-department.interface";

const schema = new Schema<IAcademicDepartment, AcademicDepartmentModel>(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        academicFaculty: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

schema.pre("save", async function (next) {
    const isExist = await AcademicDepartment.findOne({
        title: this.title,
    });
    if (isExist) {
        throw new ApiError(
            status.CONFLICT,
            "Academic department already exists!"
        );
    }

    const faculty = await AcademicFaculty.findById(this.academicFaculty);
    if (!faculty) {
        throw new ApiError(status.BAD_REQUEST, "Invalid academic faculty!");
    }
    next();
});

schema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate();
    let filter: { title: string };

    if (update && "title" in update) {
        filter = { title: update.title };
    } else {
        filter = { title: "" };
    }

    const isExist = await AcademicDepartment.findOne(filter);

    if (isExist) {
        throw new ApiError(
            status.CONFLICT,
            "Academic department with the same title already exists."
        );
    }

    const docToUpdate = await this.model.findOne(this.getQuery());
    const faculty = await AcademicFaculty.findById(docToUpdate.academicFaculty);
    if (!faculty) {
        throw new ApiError(status.BAD_REQUEST, "Invalid academic faculty!");
    }
    next();
});

const AcademicDepartment = model<IAcademicDepartment, AcademicDepartmentModel>(
    "AcademicDepartment",
    schema
);

export default AcademicDepartment;
