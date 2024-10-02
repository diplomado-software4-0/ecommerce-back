import { SystemEnvironments } from "@SharedDomain/Models";
import { env } from "process"
import "dotenv/config"


export class SystemEnv implements SystemEnvironments {
    private static _instance: SystemEnv;

    public REST_PORT = env.REST_PORT;
    public NODE_ENV = env.NODE_ENV

    private constructor() { }

    public static getInstance(): SystemEnv {
        if (!SystemEnv._instance) {
            SystemEnv._instance = Object.freeze(new SystemEnv())
        }

        return SystemEnv._instance;
    }
}

