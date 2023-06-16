import status from "http-status";
import { Schema, model } from "mongoose";
import ApiError from "../../../errors/ApiError";
import {
    IManagementDepartment,
    ManagementDepartmentModel,
} from "./management-department.interface";

const schema = new Schema<IManagementDepartment, ManagementDepartmentModel>(
    {
        title: {
            type: String,
            required: true,
            unique: true,
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
    const isExist = await ManagementDepartment.findOne({
        title: this.title,
    });
    if (isExist) {
        throw new ApiError(
            status.CONFLICT,
            "Management department already exists!"
        );
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

    const isExist = await ManagementDepartment.findOne(filter);

    if (isExist) {
        throw new ApiError(
            status.CONFLICT,
            "Management department with the same title already exists."
        );
    }
    next();
});

const ManagementDepartment = model<
    IManagementDepartment,
    ManagementDepartmentModel
>("ManagementDepartment", schema);

export default ManagementDepartment;
