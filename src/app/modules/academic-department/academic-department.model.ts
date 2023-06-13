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
            type: Schema.Types.ObjectId,
            ref: "AcademicFaculty",
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
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
    const docToUpdate = await this.model.findOne(this.getQuery());

    let titleFilter: { title: string };
    if (update && "title" in update) {
        titleFilter = {
            title: update.title,
        };
    } else {
        titleFilter = { title: docToUpdate.academicFaculty };
    }

    const isExist = await AcademicDepartment.findOne(titleFilter);
    if (isExist) {
        throw new ApiError(
            status.CONFLICT,
            "Academic department with the same title already exists!"
        );
    }

    let facultyFilter: { academicFaculty: string };
    if (update && "academicFaculty" in update) {
        facultyFilter = {
            academicFaculty: update.academicFaculty,
        };
    } else {
        facultyFilter = { academicFaculty: docToUpdate.academicFaculty };
    }

    const faculty = await AcademicFaculty.findById(
        facultyFilter.academicFaculty
    );
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
