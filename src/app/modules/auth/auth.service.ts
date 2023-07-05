import status from "http-status";
import { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelper";
import User from "../user/user.model";
import {
    IChangePassword,
    IRefreshTokenResponse,
    IUserLogin,
    IUserLoginResponse,
} from "./auth.interface";

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
            id: userId,
            role,
        },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
    );

    const refreshToken = jwtHelpers.createToken(
        {
            id: userId,
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

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
    // verify token
    let verifiedToken: JwtPayload | null = null;
    try {
        verifiedToken = jwtHelpers.verifyToken(
            token,
            config.jwt.refresh_secret as Secret
        );
    } catch (error) {
        throw new ApiError(status.FORBIDDEN, "Invalid refresh token!");
    }

    const { id } = verifiedToken;
    const user = new User();

    const isUserExist = await user.isUserExist(id);
    if (!isUserExist) {
        throw new ApiError(status.NOT_FOUND, "User does not exist!");
    }

    // generate new token
    const newAccessToken = jwtHelpers.createToken(
        {
            id: isUserExist.id,
            role: isUserExist.role,
        },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
    );

    return {
        accessToken: newAccessToken,
    };
};

const changePassword = async (
    user: JwtPayload,
    payload: IChangePassword
): Promise<void> => {
    const { oldPassword, newPassword } = payload;

    // const newUser = new User();
    // const isUserExist = await newUser.isUserExist(user.id);

    const isUserExist = await User.findOne({ id: user.id }).select("+password");
    if (!isUserExist) {
        throw new ApiError(status.NOT_FOUND, "User does not exist!");
    }

    const isPasswordMatched = await User.isPasswordMatched(
        oldPassword,
        isUserExist.password
    );
    if (!isPasswordMatched) {
        throw new ApiError(status.UNAUTHORIZED, "Old password is incorrect!");
    }

    // const newHashedPassword = await bcrypt.hash(
    //     newPassword,
    //     Number(config.bcrypt_salt_rounds)
    // );

    // const updatedData = {
    //     password: newHashedPassword,
    //     needsPasswordChange: false,
    //     passwordChangedAt: new Date(),
    // };

    // await User.findOneAndUpdate({ id: user.id }, updatedData);

    isUserExist.password = newPassword;
    isUserExist.needsPasswordChange = false;

    await isUserExist.save();
};

export const AuthService = {
    userLogin,
    refreshToken,
    changePassword,
};
