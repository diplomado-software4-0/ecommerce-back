import { ProductEntity } from "@Domain/Entities";
import { AllowNull, AutoIncrement, Column, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";


@Table({tableName: "products"})
export class Product extends Model<PartialAnyable<ProductEntity>> implements PartialAnyable<ProductEntity>{
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.UUID)
    declare id_product: string; 
    
    @AllowNull(false)
    @Column(DataType.STRING)
    declare name:string;
    
    @AllowNull(false)
    @Column(DataType.STRING)
    declare img_url: string;
    
    @AllowNull(false)
    @Column(DataType.DECIMAL)
    declare price:number
    
    @AllowNull(false)
    @Column(DataType.STRING)
    declare description: string;
    
    @AllowNull(false)
    @Column(DataType.BIGINT)
    declare category: number
    
    @AllowNull(false)
    @Column(DataType.BIGINT)
    declare stock: number; 
    
    @AllowNull(false)
    @Column(DataType.STRING)
    declare is_available: boolean;

    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare updated_at: Date;
}