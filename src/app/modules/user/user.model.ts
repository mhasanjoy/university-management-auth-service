import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../../config";
import { IUser, UserModel } from "./user.interface";

const userSchema = new Schema<IUser, UserModel>(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            select: 0,
        },
        needsPasswordChange: {
            type: Boolean,
            required: true,
            default: true,
        },
        student: {
            type: Schema.Types.ObjectId,
            ref: "Student",
        },
        faculty: {
            type: Schema.Types.ObjectId,
            ref: "Faculty",
        },
        admin: {
            type: Schema.Types.ObjectId,
            ref: "Admin",
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    }
);

userSchema.pre("save", async function (next) {
    // hash password
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds)
    );

    next();
});

const User = model<IUser, UserModel>("User", userSchema);

export default User;
