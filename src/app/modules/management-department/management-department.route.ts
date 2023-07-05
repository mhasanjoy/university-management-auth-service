import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import { RequestValidation } from "../../middlewares/validateRequest";
import { ManagementDepartmentController } from "./management-department.controller";
import { ManagementDepartmentValidation } from "./management-department.validation";

const router = express.Router();

router.post(
    "/",
    RequestValidation(
        ManagementDepartmentValidation.managementDepartmentZodSchema
    ),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    ManagementDepartmentController.createDepartment
);
router.get(
    "/:id",
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.FACULTY,
        ENUM_USER_ROLE.STUDENT
    ),
    ManagementDepartmentController.getSingleDepartment
);
router.patch(
    "/:id",
    RequestValidation(
        ManagementDepartmentValidation.managementDepartmentZodSchema
    ),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    ManagementDepartmentController.updateDepartment
);
router.delete(
    "/:id",
    auth(ENUM_USER_ROLE.SUPER_ADMIN),
    ManagementDepartmentController.deleteDepartment
);
router.get(
    "/",
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.FACULTY,
        ENUM_USER_ROLE.FACULTY,
        ENUM_USER_ROLE.STUDENT
    ),
    ManagementDepartmentController.getAllDepartment
);

export const ManagementDepartmentRoutes = router;
