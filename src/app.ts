import cors from "cors";
import express, { Application } from "express";
import morgan from "morgan";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import routes from "./app/routes";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Application routes
app.use("/api/v1", routes);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
