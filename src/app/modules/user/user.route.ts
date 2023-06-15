import express from "express";
import { RequestValidation } from "../../middlewares/validateRequest";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.post(
    "/create-student",
    RequestValidation(UserValidation.createStudentZodSchema),
    UserController.createStudent
);
router.post(
    "/create-faculty",
    RequestValidation(UserValidation.createFacultyZodSchema),
    UserController.createFaculty
);

// create admin

export const UserRoutes = router;
