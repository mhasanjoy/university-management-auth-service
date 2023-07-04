import express from "express";
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
    AuthController.changePassword
);

export const AuthRoutes = router;
