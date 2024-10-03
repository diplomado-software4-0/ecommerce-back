import { UserEntity } from "@Domain/Entities";
import { AllowNull, AutoIncrement, Column, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";

@Table({ tableName: "users" })
export class User extends Model<PartialAnyable<UserEntity>> implements PartialAnyable<UserEntity> {

    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.BIGINT)
    declare id_user: bigint;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare name: string;

    @AllowNull(true)
    @Column(DataType.STRING)
    declare lastname: bigint;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare cell_callsign: string;

    @AllowNull(false)
    @Column(DataType.BIGINT)
    declare phone_number: bigint;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare email: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare password: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare is_active: string;

    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare updated_at: Date;

}