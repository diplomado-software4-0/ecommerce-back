import { SecurityEnvironment } from "@SharedDomain/Models";
import { env } from "process";
import "dotenv/config"

export class SecurityEnv implements SecurityEnvironment {
    public static _instance: SecurityEnv

    public SECRET_KEY = env.SECRET_KEY;
    public SECRET_KEY_TOKEN = env.SECRET_KEY_TOKEN;


    private constructor() { }

    public static getInstance(): SecurityEnv {
        if (!SecurityEnv._instance) {
            SecurityEnv._instance = Object.freeze(new SecurityEnv())
        }

        return SecurityEnv._instance;
    }
}