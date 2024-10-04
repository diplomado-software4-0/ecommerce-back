import { RoleExecutionEntity } from "@Domain/Entities";
import { DataAccess } from "@Domain/Model";
import { RoleExecutionRepository } from "@Domain/Repository";
import { RoleExecution } from "@Infrastructure/Entities/RoleExecution";
import { Sequelize } from "sequelize-typescript";


export class RoleExecutionRepositoryImpl implements RoleExecutionRepository {
    constructor(private readonly _dataAccess: DataAccess<Sequelize>) { }

    public getById = async (id_role_execution: number): Promise<{ data: RoleExecutionEntity; }> => {
        const role_execution = await RoleExecution.findOne({ where: { id_rol_execution: id_role_execution } })
        return { data: role_execution?.dataValues as RoleExecutionEntity }
    };
}