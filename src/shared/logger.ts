import path from "path";
import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${date.toDateString()} ${hours}:${minutes}:${seconds} [${label}] ${level}: ${message}`;
});

const successLogger = createLogger({
    level: "info",
    format: combine(
        label({ label: "University Management Auth Service" }),
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            filename: path.join(
                process.cwd(),
                "logs",
                "winston",
                "success",
                "UM-%DATE%-success.log"
            ),
            datePattern: "YYYY-DD-MM-HH",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d",
        }),
    ],
});

const errorLogger = createLogger({
    level: "error",
    format: combine(
        label({ label: "University Management Auth Service" }),
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            filename: path.join(
                process.cwd(),
                "logs",
                "winston",
                "error",
                "UM-%DATE%-error.log"
            ),
            datePattern: "YYYY-DD-MM-HH",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d",
        }),
    ],
});

export { successLogger, errorLogger };
