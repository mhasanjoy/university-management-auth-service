import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import { RequestValidation } from "../../middlewares/validateRequest";
import { AdminController } from "./admin.controller";
import { AdminValidation } from "./admin.validation";

const router = express.Router();

router.get(
    "/:id",
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    AdminController.getSingleAdmin
);
router.patch(
    "/:id",
    RequestValidation(AdminValidation.updateAdminZodSchema),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    AdminController.updateAdmin
);
router.delete(
    "/:id",
    auth(ENUM_USER_ROLE.SUPER_ADMIN),
    AdminController.deleteAdmin
);
router.get(
    "/",
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    AdminController.getAllAdmin
);

export const AdminRoutes = router;
