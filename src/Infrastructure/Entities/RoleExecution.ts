import { RoleExecutionEntity } from "@Domain/Entities";
import { AllowNull, AutoIncrement, Column, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";


@Table({ tableName: "role_executions" })
export class RoleExecution extends Model<PartialAnyable<RoleExecutionEntity>> implements PartialAnyable<RoleExecutionEntity> {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.BIGINT)
    declare id_user_role_execution: bigint;

    @AllowNull(false)
    @Column(DataType.BIGINT)
    declare id_user: bigint;

    @AllowNull(false)
    @Column(DataType.BIGINT)
    declare id_role: bigint;

    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare updated_at: Date;
}
