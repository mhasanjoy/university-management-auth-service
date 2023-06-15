import express from "express";
import { RequestValidation } from "../../middlewares/validateRequest";
import { StudentController } from "./student.controller";
import { StudentValidation } from "./student.validation";

const router = express.Router();

router.get("/:id", StudentController.getSingleStudent);
router.patch(
    "/:id",
    RequestValidation(StudentValidation.updateStudentZodSchema),
    StudentController.updateStudent
);
router.delete("/:id", StudentController.deleteStudent);
router.get("/", StudentController.getAllStudents);

export const StudentRoutes = router;
