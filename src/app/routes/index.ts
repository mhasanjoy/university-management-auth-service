import express from "express";
import { AcademicFacultyRoutes } from "../modules/academic-faculty/academic-faculty.route";
import { AcademicSemesterRoutes } from "../modules/academic-semester/academic-semester.route";
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
];

moduleRoutes.forEach(route => {
    router.use(route.path, route.route);
});

export default router;
