// Import the functions you need from the SDKs you need
import { Logger } from "@SharedDomain/Models";
import { FirebaseEnv } from "@SharedInfrastructure/Environments";
import { LogApplication } from "@SharedInfrastructure/Log";
import { FirebaseApp, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export class FirebaseStorage {
  private readonly logger: Logger = new LogApplication(FirebaseStorage);
  private static _instance: FirebaseStorage;
  private readonly _app: FirebaseApp;


  private constructor() {
    const env = FirebaseEnv.getInstance();
    this._app = initializeApp({
      apiKey: env.FIREBASE_API_KEY,
      authDomain: env.FIREBASE_AUTH_DOMAIN,
      projectId: env.FIREBASE_PROJECT_ID,
      storageBucket: env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
      appId: env.FIREBASE_APP_ID
    })
  }

  public static getInstance(): FirebaseStorage {
    if (!FirebaseStorage._instance) {
      FirebaseStorage._instance = new FirebaseStorage();
    }
    return FirebaseStorage._instance
  }

  public get app(): FirebaseApp {
    return this._app
  }

  public async connect(): Promise<void> {
    try {
      if (this._app) {
        this.logger.info("firebase connection successful")
      }
    } catch (error) {
      this.logger.error("fail firebase connection")
      console.log(error)

    }
  }
};


// Initialize Firebase
// const app = initializeApp(firebaseConfig);