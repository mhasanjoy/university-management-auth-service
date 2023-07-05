import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import { RequestValidation } from "../../middlewares/validateRequest";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

router.post(
    "/login",
    RequestValidation(AuthValidation.loginZodSchema),
    AuthController.userLogin
);
router.post(
    "/refresh-token",
    RequestValidation(AuthValidation.refreshTokenZodSchema),
    AuthController.refreshToken
);
router.post(
    "/change-password",
    RequestValidation(AuthValidation.changePasswordZodSchema),
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.FACULTY,
        ENUM_USER_ROLE.STUDENT
    ),
    AuthController.changePassword
);

export const AuthRoutes = router;
