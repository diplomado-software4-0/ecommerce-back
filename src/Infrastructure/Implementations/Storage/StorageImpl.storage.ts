import { StorageBase } from "@Domain/Model";
import { FirebaseStorage } from "@Infrastructure/Database";
import { FirebaseEnvironment } from "@SharedDomain/Models";
import { FirebaseEnv } from "@SharedInfrastructure/Environments";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage"

const firebase = FirebaseStorage.getInstance()
export class StorageImpl implements StorageBase {
    private static _instance: StorageImpl;
    private _firebaseStorageEnv: FirebaseEnvironment;

    private constructor() {
        this._firebaseStorageEnv = FirebaseEnv.getInstance();
    }

    public static getInstance(): StorageImpl {
        if (!StorageImpl._instance) {
            StorageImpl._instance = new StorageImpl();
        }

        return StorageImpl._instance;
    }

    public upload = async (file_name: string, file_buffer: Buffer): Promise<string> => {
        const folder_path = this._firebaseStorageEnv.FIREBASE_STORAGE_FOLDER;
        const storage = getStorage(firebase.app);
        const storageRef = ref(storage, `${folder_path}${file_name}`)
        await uploadBytes(storageRef, file_buffer)
        const fileUrl = await getDownloadURL(storageRef)
        return fileUrl;
    };
}