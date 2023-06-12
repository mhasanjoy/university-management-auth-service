import express from "express";
import { RequestValidation } from "../../middlewares/validateRequest";
import { AcademicSemesterController } from "./academic-semester.controller";
import { AcademicSemesterValidation } from "./academic-semester.validation";

const router = express.Router();

router.post(
    "/",
    RequestValidation(
        AcademicSemesterValidation.createAcademicSemesterZodSchema
    ),
    AcademicSemesterController.createSemester
);
router.get("/:id", AcademicSemesterController.getSingleSemester);
router.patch(
    "/:id",
    RequestValidation(
        AcademicSemesterValidation.updateAcademicSemesterZodSchema
    ),
    AcademicSemesterController.updateSemester
);
router.delete("/:id", AcademicSemesterController.deleteSemester);
router.get("/", AcademicSemesterController.getAllSemesters);

export const AcademicSemesterRoutes = router;
