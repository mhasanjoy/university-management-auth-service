import cors from "cors";
import express, { Application } from "express";
import morgan from "morgan";
import userRoute from "./app/modules/user/user.route";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Application routes
app.use("/api/v1/user", userRoute);

export default app;
