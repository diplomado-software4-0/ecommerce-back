import { RoleExecutionEntity } from "@Domain/Entities";
import { AllowNull, AutoIncrement, Column, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";

@Table({ tableName: "role_executions" })
export class RoleExecution extends Model<PartialAnyable<RoleExecutionEntity>> implements PartialAnyable<RoleExecutionEntity> {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.BIGINT)
    declare id_rol_execution: bigint;

    @AllowNull(false)
    @Column(DataType.SMALLINT)
    declare code: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare name: string;

    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare updated_at: Date;
}
