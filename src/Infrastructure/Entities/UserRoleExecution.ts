import { UserRoleExecutionEntity } from "@Domain/Entities";
import { AllowNull, AutoIncrement, Column, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";

@Table({ tableName: "users_role_executions" })
export class UserRoleExecution extends Model<PartialAnyable<UserRoleExecutionEntity>> implements PartialAnyable<UserRoleExecutionEntity> {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.BIGINT)
    declare id_user_role_execution: bigint;

    @AllowNull(false)
    @Column(DataType.BIGINT)
    declare id_user: bigint;

    @AllowNull(false)
    @Column(DataType.SMALLINT)
    declare id_role: number;

    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare updated_at: Date;
}