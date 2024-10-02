export { }

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            REST_PORT: number;
            NODE_ENV: "development" | "production";
            DB_DIALECT: any;
            DB_USER: string;
            DB_PASS: string;
            DB_HOST: string;
            DB_PORT: number;
            DB_NAME: string;
            SECRET_KEY: string;
            SECRET_KEY_TOKEN: string;
        }
    }
}