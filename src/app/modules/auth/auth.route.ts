import express from "express";
import { RequestValidation } from "../../middlewares/validateRequest";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

router.post(
    "/login",
    RequestValidation(AuthValidation.loginZodSchema),
    AuthController.loginUser
);

export const AuthRoutes = router;
