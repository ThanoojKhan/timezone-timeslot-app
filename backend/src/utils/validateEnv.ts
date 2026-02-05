import { cleanEnv, str, num } from "envalid";

export const ENV = cleanEnv(process.env, {
    MONGODB_URI: str(),

    PORT: num({ default: 8080 }),

    FRONTEND_URL: str({ default: "*" }),

    NODE_ENV: str({
        choices: ["development", "production", "test"],
        default: "development",
    }),
});

export default ENV;