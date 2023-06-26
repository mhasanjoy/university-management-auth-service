import express from "express";
import { AcademicDepartmentRoutes } from "../modules/academic-department/academic-department.route";
import { AcademicFacultyRoutes } from "../modules/academic-faculty/academic-faculty.route";
import { AcademicSemesterRoutes } from "../modules/academic-semester/academic-semester.route";
import { AdminRoutes } from "../modules/admin/admin.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { FacultyRoutes } from "../modules/faculty/faculty.route";
import { ManagementDepartmentRoutes } from "../modules/management-department/management-department.route";
import { StudentRoutes } from "../modules/student/student.route";
import { UserRoutes } from "../modules/user/user.route";

const router = express.Router();

const moduleRoutes = [
    {
        path: "/user",
        route: UserRoutes,
    },
    {
        path: "/academic-semester",
        route: AcademicSemesterRoutes,
    },
    {
        path: "/academic-faculty",
        route: AcademicFacultyRoutes,
    },
    {
        path: "/academic-department",
        route: AcademicDepartmentRoutes,
    },
    {
        path: "/student",
        route: StudentRoutes,
    },
    {
        path: "/faculty",
        route: FacultyRoutes,
    },
    {
        path: "/management-department",
        route: ManagementDepartmentRoutes,
    },
    {
        path: "/admin",
        route: AdminRoutes,
    },
    {
        path: "/auth",
        route: AuthRoutes,
    },
];

moduleRoutes.forEach(route => {
    router.use(route.path, route.route);
});

export default router;
