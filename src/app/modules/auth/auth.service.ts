import bcrypt from "bcrypt";
import status from "http-status";
import ApiError from "../../../errors/ApiError";
import User from "../user/user.model";
import { ILoginUser } from "./auth.interface";

const loginUser = async (payload: ILoginUser) => {
    const { id, password } = payload;
    const isUserExist = await User.findOne(
        { id },
        { id: 1, password: 1, needsPasswordChange: 1 }
    ).lean();
    if (!isUserExist) {
        throw new ApiError(status.NOT_FOUND, "User does not exist!");
    }

    const isPasswordMatched = await bcrypt.compare(
        password,
        isUserExist.password
    );
    if (!isPasswordMatched) {
        throw new ApiError(status.UNAUTHORIZED, "Password is incorrect!");
    }
};

export const AuthService = {
    loginUser,
};
