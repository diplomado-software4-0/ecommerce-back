import { UserRoleExecutionEntity } from "@Domain/Entities";
import { DataAccess } from "@Domain/Model";
import { UserRoleExecutionRepository } from "@Domain/Repository";
import { Sequelize } from "sequelize-typescript";


export class UserRoleExecutionRepositoryImpl implements UserRoleExecutionRepository {
    constructor(private readonly _dataAccess: DataAccess<Sequelize>) { }
    create: (entity: Omit<UserRoleExecutionEntity, "id_user_role_execution" | "created_at" | "updated_at">, options?: Partial<{ transaction: any; }>) => Promise<boolean>;
    getUserRole: (id_user: bigint) => Promise<{ data: UserRoleExecutionEntity; }>;
}