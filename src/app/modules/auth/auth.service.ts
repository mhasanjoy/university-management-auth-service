import status from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelper";
import User from "../user/user.model";
import { IUserLogin, IUserLoginResponse } from "./auth.interface";

const userLogin = async (payload: IUserLogin): Promise<IUserLoginResponse> => {
    const { id, password } = payload;
    const user = new User();

    const isUserExist = await user.isUserExist(id);
    if (!isUserExist) {
        throw new ApiError(status.NOT_FOUND, "User does not exist!");
    }

    const isPasswordMatched = await User.isPasswordMatched(
        password,
        isUserExist.password
    );
    if (!isPasswordMatched) {
        throw new ApiError(status.UNAUTHORIZED, "Password is incorrect!");
    }

    const { id: userId, role, needsPasswordChange } = isUserExist;
    const accessToken = jwtHelpers.createToken(
        {
            userId,
            role,
        },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
    );

    const refreshToken = jwtHelpers.createToken(
        {
            userId,
            role,
        },
        config.jwt.refresh_secret as Secret,
        config.jwt.refresh_expires_in as string
    );

    return {
        needsPasswordChange,
        accessToken,
        refreshToken,
    };
};

export const AuthService = {
    userLogin,
};
