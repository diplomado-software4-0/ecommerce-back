import { RoleExecutionEntity } from "@Domain/Entities";

export interface RoleExecutionRepository {

    getById: (id_role_execution: number) => Promise<{ data: RoleExecutionEntity }>
}