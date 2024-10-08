import { UserCartEntity } from "@Domain/Entities/UserCart.entity";
import { AllowNull, AutoIncrement, Column, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";


@Table({tableName: "products"})
export class UserCart extends Model<PartialAnyable<UserCartEntity>> implements PartialAnyable<UserCartEntity>{
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.UUID)
    declare id_user_cart: string; 
    
    @AllowNull(false)
    @Column(DataType.NUMBER)
    declare id_user:number;
    
    @AllowNull(false)
    @Column(DataType.UUID)
    declare img_url: string;
    
    @AllowNull(false)
    @Column(DataType.BOOLEAN)
    declare is_paid:boolean
    
    @AllowNull(false)
    @Column(DataType.BOOLEAN)
    declare state: boolean;

    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare updated_at: Date;
}