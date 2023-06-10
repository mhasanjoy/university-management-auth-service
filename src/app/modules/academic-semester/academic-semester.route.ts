import express from "express";
import { RequestValidation } from "../../middlewares/validateRequest";
import { AcademicSemesterController } from "./academic-semester.controller";
import { AcademicSemesterValidation } from "./academic-semester.validation";

const router = express.Router();

router.post(
    "/create-semester",
    RequestValidation(
        AcademicSemesterValidation.createAcademicSemesterZodSchema
    ),
    AcademicSemesterController.createSemester
);

export const AcademicSemesterRoutes = router;
