import express from "express";
import { RequestValidation } from "../../middlewares/validateRequest";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.post(
    "/create-user",
    RequestValidation(UserValidation.createUserZodSchema),
    UserController.createUser
);

export const UserRoutes = router;
