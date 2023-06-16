import express from "express";
import { RequestValidation } from "../../middlewares/validateRequest";
import { ManagementDepartmentController } from "./management-department.controller";
import { ManagementDepartmentValidation } from "./management-department.validation";

const router = express.Router();

router.post(
    "/",
    RequestValidation(
        ManagementDepartmentValidation.managementDepartmentZodSchema
    ),
    ManagementDepartmentController.createDepartment
);
router.get("/:id", ManagementDepartmentController.getSingleDepartment);
router.patch(
    "/:id",
    RequestValidation(
        ManagementDepartmentValidation.managementDepartmentZodSchema
    ),
    ManagementDepartmentController.updateDepartment
);
router.delete("/:id", ManagementDepartmentController.deleteDepartment);
router.get("/", ManagementDepartmentController.getAllDepartment);

export const ManagementDepartmentRoutes = router;
