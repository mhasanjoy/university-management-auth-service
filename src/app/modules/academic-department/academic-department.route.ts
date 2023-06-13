import express from "express";
import { RequestValidation } from "../../middlewares/validateRequest";
import { AcademicDepartmentController } from "./academic-department.controller";
import { AcademicDepartmentValidation } from "./academic-department.validation";

const router = express.Router();

router.post(
    "/",
    RequestValidation(
        AcademicDepartmentValidation.createAcademicDepartmentZodSchema
    ),
    AcademicDepartmentController.createDepartment
);
router.get("/:id", AcademicDepartmentController.getSingleDepartment);
router.patch(
    "/:id",
    RequestValidation(
        AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
    ),
    AcademicDepartmentController.updateDepartment
);
router.delete("/:id", AcademicDepartmentController.deleteDepartment);
router.get("/", AcademicDepartmentController.getAllDepartment);

export const AcademicDepartmentRoutes = router;
