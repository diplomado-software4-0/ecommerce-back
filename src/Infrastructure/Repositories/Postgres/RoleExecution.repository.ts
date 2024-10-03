import { RoleExecutionEntity } from "@Domain/Entities";
import { DataAccess } from "@Domain/Model";
import { RoleExecutionRepository } from "@Domain/Repository";
import { Sequelize } from "sequelize-typescript";




export class RoleExecutionRepositoryImpl implements RoleExecutionRepository {
    constructor(private readonly _dataAccess: DataAccess<Sequelize>) { }
    getById: (id_role_execution: number) => Promise<{ data: RoleExecutionEntity; }>;
}