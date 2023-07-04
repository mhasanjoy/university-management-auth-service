import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../../config";
import { IUser, IUserMethods, UserModel } from "./user.interface";

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
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
        passwordChangedAt: Date,
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

userSchema.methods.isUserExist = async function (
    id: string
): Promise<Pick<
    IUser,
    "id" | "role" | "password" | "needsPasswordChange"
> | null> {
    return await User.findOne(
        { id },
        { id: 1, role: 1, password: 1, needsPasswordChange: 1 }
    );
};

userSchema.statics.isPasswordMatched = async function (
    givenPassword: string,
    savedPassword: string
): Promise<boolean> {
    return await bcrypt.compare(givenPassword, savedPassword);
};

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
