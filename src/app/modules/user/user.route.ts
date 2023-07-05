import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import { RequestValidation } from "../../middlewares/validateRequest";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.post(
    "/create-student",
    RequestValidation(UserValidation.createStudentZodSchema),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    UserController.createStudent
);
router.post(
    "/create-faculty",
    RequestValidation(UserValidation.createFacultyZodSchema),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    UserController.createFaculty
);
router.post(
    "/create-admin",
    RequestValidation(UserValidation.createAdminZodSchema),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    UserController.createAdmin
);

export const UserRoutes = router;
