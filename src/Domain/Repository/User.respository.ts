import { UserEntity } from "@Domain/Entities";


export interface UserRepository {

    create: (
        entity: Omit<UserEntity, "id_user" | "created_at" | "updated_at">,
        options?: Partial<{ transaction: any }>
    ) => Promise<boolean>

    checkCredential: (email: string, pasword: string) => Promise<{ data: UserEntity }>
}