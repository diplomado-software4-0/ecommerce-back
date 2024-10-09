import { CartEntity } from "@Domain/Entities";
import { AllowNull, Column, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";

@Table({ tableName: "cart" })
export class Cart extends Model<PartialAnyable<CartEntity>> implements PartialAnyable<CartEntity> {

    @PrimaryKey
    @AllowNull(false)
    @Column(DataType.UUID)
    declare id_cart: string;

    @AllowNull(false)
    @Column(DataType.BIGINT)
    declare id_user: number;

    @AllowNull(false)
    @Column(DataType.BOOLEAN)
    declare purchase_complete: boolean

    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare updated_at: Date;




}