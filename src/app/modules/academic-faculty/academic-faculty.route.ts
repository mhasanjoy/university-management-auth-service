import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import { RequestValidation } from "../../middlewares/validateRequest";
import { AcademicFacultyController } from "./academic-faculty.controller";
import { AcademicFacultyValidation } from "./academic-faculty.validation";

const router = express.Router();

router.post(
    "/",
    RequestValidation(AcademicFacultyValidation.academicFacultyZodSchema),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    AcademicFacultyController.createFaculty
);
router.get(
    "/:id",
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.FACULTY,
        ENUM_USER_ROLE.STUDENT
    ),
    AcademicFacultyController.getSingleFaculty
);
router.patch(
    "/:id",
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.FACULTY
    ),
    RequestValidation(AcademicFacultyValidation.academicFacultyZodSchema),
    AcademicFacultyController.updateFaculty
);
router.delete(
    "/:id",
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    AcademicFacultyController.deleteFaculty
);
router.get(
    "/",
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.FACULTY,
        ENUM_USER_ROLE.STUDENT
    ),
    AcademicFacultyController.getAllFaculty
);

export const AcademicFacultyRoutes = router;
