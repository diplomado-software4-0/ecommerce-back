export interface SystemEnvironments {
    REST_PORT: number;
    NODE_ENV: string;
}

export interface DatabaseEnvironment {
    DB_DIALECT: any;
    DB_USER: string;
    DB_PASS: string;
    DB_HOST: string;
    DB_PORT: number;
    DB_NAME: string;
}

export interface SecurityEnvironment {
    SECRET_KEY: string;
    SECRET_KEY_TOKEN: string;

}
