import { UserRoleExecutionEntity } from "@Domain/Entities";

export interface UserRoleExecutionRepository {

    create: (
        entity: Omit<UserRoleExecutionEntity, "id_user_role_execution" | "created_at" | "updated_at">,
        options?: Partial<{ transaction: any }>
    ) => Promise<boolean>
    
    getByIdUser:(id_user:bigint | undefined) => Promise<UserRoleExecutionEntity>
}