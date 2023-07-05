import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import { RequestValidation } from "../../middlewares/validateRequest";
import { FacultyController } from "./faculty.controller";
import { FacultyValidation } from "./faculty.validation";

const router = express.Router();

router.get(
    "/:id",
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.FACULTY
    ),
    FacultyController.getSingleFaculty
);
router.patch(
    "/:id",
    RequestValidation(FacultyValidation.updateFacultyZodSchema),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    FacultyController.updateFaculty
);
router.delete(
    "/:id",
    auth(ENUM_USER_ROLE.SUPER_ADMIN),
    FacultyController.deleteFaculty
);
router.get(
    "/",
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.FACULTY
    ),
    FacultyController.getAllFaculty
);

export const FacultyRoutes = router;
