import express from "express";
import { RequestValidation } from "../../middlewares/validateRequest";
import { AcademicFacultyController } from "./academic-faculty.controller";
import { AcademicFacultyValidation } from "./academic-faculty.validation";

const router = express.Router();

router.post(
    "/",
    RequestValidation(AcademicFacultyValidation.academicFacultyZodSchema),
    AcademicFacultyController.createFaculty
);
router.get("/:id", AcademicFacultyController.getSingleFaculty);
router.patch(
    "/:id",
    RequestValidation(AcademicFacultyValidation.academicFacultyZodSchema),
    AcademicFacultyController.updateFaculty
);
router.delete("/:id", AcademicFacultyController.deleteFaculty);
router.get("/", AcademicFacultyController.getAllFaculty);

export const AcademicFacultyRoutes = router;
