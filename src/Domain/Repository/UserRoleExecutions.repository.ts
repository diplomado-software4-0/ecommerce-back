import { UserRoleExecutionEntity } from "@Domain/Entities/UserRoleExecutions.entity";


export interface UserRoleExecutionRepository {

    create: (
        entity: Omit<UserRoleExecutionEntity, "id_user_role_execution" | "created_at" | "created_at">,
        options?: Partial<{ transaction: any }>
    ) => Promise<boolean>
}