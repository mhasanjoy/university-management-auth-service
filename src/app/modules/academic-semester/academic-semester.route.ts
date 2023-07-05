import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import { RequestValidation } from "../../middlewares/validateRequest";
import { AcademicSemesterController } from "./academic-semester.controller";
import { AcademicSemesterValidation } from "./academic-semester.validation";

const router = express.Router();

router.post(
    "/",
    RequestValidation(
        AcademicSemesterValidation.createAcademicSemesterZodSchema
    ),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    AcademicSemesterController.createSemester
);
router.get(
    "/:id",
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.FACULTY,
        ENUM_USER_ROLE.STUDENT
    ),
    AcademicSemesterController.getSingleSemester
);
router.patch(
    "/:id",
    RequestValidation(
        AcademicSemesterValidation.updateAcademicSemesterZodSchema
    ),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    AcademicSemesterController.updateSemester
);
router.delete(
    "/:id",
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    AcademicSemesterController.deleteSemester
);
router.get(
    "/",
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.FACULTY,
        ENUM_USER_ROLE.STUDENT
    ),
    AcademicSemesterController.getAllSemesters
);

export const AcademicSemesterRoutes = router;
