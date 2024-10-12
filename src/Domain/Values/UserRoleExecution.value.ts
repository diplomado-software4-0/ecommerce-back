import { UserRoleExecutionEntity } from "@Domain/Entities";

type UserRoleExecutionConstructor = Omit<UserRoleExecutionEntity, "id_user_role_execution" | "created_at" | "updated_at">
export class UserRoleExecutionValues implements UserRoleExecutionConstructor {
    constructor(data: UserRoleExecutionConstructor) {
        this.id_user = data.id_user;
        this.id_role = data.id_role;
        this.created_at = this.updated_at = new Date();
    }

    id_user: bigint;
    
    id_role: number;
    
    created_at: Date;
    
    updated_at: Date;
}