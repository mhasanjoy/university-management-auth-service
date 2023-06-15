import express from "express";
import { RequestValidation } from "../../middlewares/validateRequest";
import { FacultyController } from "./faculty.controller";
import { FacultyValidation } from "./faculty.validation";

const router = express.Router();

router.get("/:id", FacultyController.getSingleFaculty);
router.patch(
    "/:id",
    RequestValidation(FacultyValidation.updateFacultyZodSchema),
    FacultyController.updateFaculty
);
router.delete("/:id", FacultyController.deleteFaculty);
router.get("/", FacultyController.getAllFaculty);

export const FacultyRoutes = router;
