export type IUserLogin = {
    id: string;
    password: string;
};

export type IUserLoginResponse = {
    needsPasswordChange: boolean;
    accessToken: string;
    refreshToken?: string;
};

export type IRefreshTokenResponse = {
    accessToken: string;
};

export type IChangePassword = {
    oldPassword: string;
    newPassword: string;
};
