import express from "express";
import { RequestValidation } from "../../middlewares/validateRequest";
import { AdminController } from "./admin.controller";
import { AdminValidation } from "./admin.validation";

const router = express.Router();

router.get("/:id", AdminController.getSingleAdmin);
router.patch(
    "/:id",
    RequestValidation(AdminValidation.updateAdminZodSchema),
    AdminController.updateAdmin
);
router.delete("/:id", AdminController.deleteAdmin);
router.get("/", AdminController.getAllAdmin);

export const AdminRoutes = router;
