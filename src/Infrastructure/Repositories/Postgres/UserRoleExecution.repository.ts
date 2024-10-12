import { UserRoleExecutionEntity } from "@Domain/Entities";
import { DataAccess } from "@Domain/Model";
import { UserRoleExecutionRepository } from "@Domain/Repository";
import { UserRoleExecution } from "@Infrastructure/Entities/UserRoleExecution";
import { Transaction } from "sequelize";
import { Sequelize } from "sequelize-typescript";


export class UserRoleExecutionRepositoryImpl implements UserRoleExecutionRepository {
    constructor(private readonly _dataAccess: DataAccess<Sequelize>) { }

    public create = async (
        entity: Omit<UserRoleExecutionEntity, "id_user_role_execution" | "created_at" | "updated_at">,
        options: Partial<{ transaction: Transaction }> = {}
    ): Promise<boolean> => {
        const { transaction = null } = options
        const { ...data } = entity
        const row = await UserRoleExecution.create({ ...data }, { ...(transaction && { transaction }) })
        return !!row
    };

    getByIdUser = async (id_user: bigint | undefined): Promise<UserRoleExecutionEntity> => {
        const row = await UserRoleExecution.findOne({ where: { id_user: id_user } })
        return row?.dataValues as UserRoleExecutionEntity
    };


}