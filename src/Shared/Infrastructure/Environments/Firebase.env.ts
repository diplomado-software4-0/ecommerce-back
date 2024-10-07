import { FirebaseEnvironment } from "@SharedDomain/Models";
import { env } from "process";

export class FirebaseEnv implements FirebaseEnvironment {
    public static _instace: FirebaseEnv;

    public FIREBASE_API_KEY = env.FIREBASE_API_KEY;
    public FIREBASE_AUTH_DOMAIN = env.FIREBASE_AUTH_DOMAIN;
    public FIREBASE_PROJECT_ID = env.FIREBASE_PROJECT_ID;
    public FIREBASE_STORAGE_BUCKET = env.FIREBASE_STORAGE_BUCKET;
    public FIREBASE_MESSAGING_SENDER_ID = env.FIREBASE_MESSAGING_SENDER_ID;
    public FIREBASE_APP_ID = env.FIREBASE_APP_ID;
    public FIREBASE_STORAGE_FOLDER = env.FIREBASE_STORAGE_FOLDER

    private constructor() { }

    public static getInstance(): FirebaseEnv {
        if (!FirebaseEnv._instace) {
            FirebaseEnv._instace = Object.freeze(new FirebaseEnv())
        }

        return FirebaseEnv._instace
    }

}