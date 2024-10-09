
import { UserCartEntity } from "@Domain/Entities";
import { AllowNull, AutoIncrement, Column, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";


@Table({ tableName: "user_cart" })
export class UserCart extends Model<PartialAnyable<UserCartEntity>> implements PartialAnyable<UserCartEntity> {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.UUID)
    declare id_user_cart: string;

    @AllowNull(false)
    @Column(DataType.BIGINT)
    declare id_product: string;

    @AllowNull(false)
    @Column(DataType.BOOLEAN)
    declare remove_prod: boolean

    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare updated_at: Date;
}