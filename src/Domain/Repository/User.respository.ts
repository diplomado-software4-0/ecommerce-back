import { UserEntity } from "@Domain/Entities";


export interface UserRepository {

    register: (
        entity: Omit<UserEntity, "id_user" | "created_at" | "updated_at">,
        options?: Partial<{ transaction: any }>
    ) => Promise<{ data: UserEntity }>

    checkCredential: (email: string, pasword: string) => Promise<{ data: UserEntity }>

    getById: (id_user?: bigint) => Promise<UserEntity>

}