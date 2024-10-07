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

export interface FirebaseEnvironment {
    FIREBASE_API_KEY: string;
    FIREBASE_AUTH_DOMAIN: string;
    FIREBASE_PROJECT_ID: string;
    FIREBASE_STORAGE_BUCKET: string;
    FIREBASE_MESSAGING_SENDER_ID: string;
    FIREBASE_APP_ID: string;
    FIREBASE_STORAGE_FOLDER:string;
}
export interface SecurityEnvironment {
    SECRET_KEY: string;
    SECRET_KEY_TOKEN: string;

}
