import dotenv from "dotenv";
import path from "path";

dotenv.config({
    // eslint-disable-next-line no-undef
    path: path.join(process.cwd(), ".env"),
});

export default {
    // eslint-disable-next-line no-undef
    port: process.env.PORT,
    // eslint-disable-next-line no-undef
    database_url: process.env.DATABASE_URL,
    // eslint-disable-next-line no-undef
    default_user_password: process.env.DEFAULT_USER_PASSWORD,
};
