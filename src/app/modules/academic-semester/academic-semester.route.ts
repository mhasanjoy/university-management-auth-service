import express from "express";
import { RequestValidation } from "../../middlewares/validateRequest";
import { AcademicSemesterValidation } from "./academic-semester.validation";

const router = express.Router();

router.post(
    "/create-academic-semester",
    RequestValidation(
        AcademicSemesterValidation.createAcademicSemesterZodSchema
    )
);

export const AcademicSemesterRoutes = router;
