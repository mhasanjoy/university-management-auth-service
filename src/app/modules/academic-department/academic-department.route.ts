import express from "express";
import { RequestValidation } from "../../middlewares/validateRequest";
import { AcademicDepartmentValidation } from "./academic-department.validation";

const router = express.Router();

router.post(
    "/",
    RequestValidation(
        AcademicDepartmentValidation.createAcademicDepartmentZodSchema
    )
);
router.get("/:id");
router.patch(
    "/:id",
    RequestValidation(
        AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
    )
);
router.delete("/:id");
router.get("/");

export const AcademicDepartmentRoutes = router;
