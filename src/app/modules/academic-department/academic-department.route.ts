import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import { RequestValidation } from "../../middlewares/validateRequest";
import { AcademicDepartmentController } from "./academic-department.controller";
import { AcademicDepartmentValidation } from "./academic-department.validation";

const router = express.Router();

router.post(
    "/",
    RequestValidation(
        AcademicDepartmentValidation.createAcademicDepartmentZodSchema
    ),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    AcademicDepartmentController.createDepartment
);
router.get("/:id", AcademicDepartmentController.getSingleDepartment);
router.patch(
    "/:id",
    RequestValidation(
        AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
    ),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    AcademicDepartmentController.updateDepartment
);
router.delete(
    "/:id",
    auth(ENUM_USER_ROLE.SUPER_ADMIN),
    AcademicDepartmentController.deleteDepartment
);
router.get("/", AcademicDepartmentController.getAllDepartment);

export const AcademicDepartmentRoutes = router;
