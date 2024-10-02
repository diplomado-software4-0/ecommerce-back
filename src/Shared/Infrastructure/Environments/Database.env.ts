
import { DatabaseEnvironment } from "@SharedDomain/Models";
import { env } from "process";
import "dotenv/config"


export class DatabaseEnv implements DatabaseEnvironment {
    public static _instance: DatabaseEnv;

    public DB_DIALECT = env.DB_DIALECT;
    public DB_USER = env.DB_USER;
    public DB_PASS = env.DB_PASS;
    public DB_HOST = env.DB_HOST;
    public DB_PORT = env.DB_PORT;
    public DB_NAME = env.DB_NAME;


    private constructor() { }

    public static getInstance(): DatabaseEnv {
        if (!DatabaseEnv._instance) {
            DatabaseEnv._instance = Object.freeze(new DatabaseEnv())
        }

        return DatabaseEnv._instance
    }

}