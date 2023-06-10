import cors from "cors";
import express, { Application } from "express";
import morgan from "morgan";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { AcademicSemesterRoutes } from "./app/modules/academic-semester/academic-semester.route";
import { UserRoutes } from "./app/modules/user/user.route";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Application routes
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/academic-semester", AcademicSemesterRoutes);

app.use(globalErrorHandler);

export default app;
