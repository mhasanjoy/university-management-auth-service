import cors from "cors";
import express, { Application } from "express";
import morgan from "morgan";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import userRoute from "./app/modules/user/user.route";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(globalErrorHandler);

// Application routes
app.use("/api/v1/user", userRoute);

export default app;
