import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import { errorLogger, successLogger } from "./shared/logger";

async function bootstrap() {
    try {
        await mongoose.connect(config.database_url as string);
        successLogger.info("Database connected successfully!");

        app.listen(config.port, () => {
            successLogger.info(
                `Application is listening on port ${config.port}`
            );
        });
    } catch (error) {
        errorLogger.error("Failed to connect database!", error);
    }
}

bootstrap();
