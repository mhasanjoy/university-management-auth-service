import status from "http-status";
import { Schema, model } from "mongoose";
import ApiError from "../../../errors/ApiError";
import {
    AcademicFacultyModel,
    IAcademicFaculty,
} from "./academic-faculty.interface";

const schema = new Schema<IAcademicFaculty, AcademicFacultyModel>(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

schema.pre("save", async function (next) {
    const isExist = await AcademicFaculty.findOne({
        title: this.title,
    });
    if (isExist) {
        throw new ApiError(status.CONFLICT, "Academic faculty already exists!");
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

    const isExist = await AcademicFaculty.findOne(filter);

    if (isExist) {
        throw new ApiError(
            status.CONFLICT,
            "Academic faculty with the same title already exists."
        );
    }
    next();
});

const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
    "AcademicFaculty",
    schema
);

export default AcademicFaculty;
