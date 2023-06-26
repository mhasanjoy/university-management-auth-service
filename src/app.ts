import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import status from "http-status";
import morgan from "morgan";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import routes from "./app/routes";

const app: Application = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Application routes
app.use("/api/v1", routes);

// Global Error Handler
app.use(globalErrorHandler);

// handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(status.NOT_FOUND).json({
        success: false,
        message: "Not Found",
        errorMessage: [
            {
                path: req.originalUrl,
                message: "API Not Found!",
            },
        ],
    });
    next();
});

export default app;
