import { ProductEntity } from "@Domain/Entities";
import { DataAccess } from "@Domain/Model";
import { ProductRepository } from "@Domain/Repository";
import { Product } from "@Infrastructure/Entities/Product";
import { Transaction } from "sequelize";
import { Sequelize } from "sequelize-typescript";


export class ProductRepositoryImpl implements ProductRepository {
    constructor(private readonly _dataAccess: DataAccess<Sequelize>) { }

    public add = async (
        entity: ProductEntity,
        options: Partial<{ transaction: Transaction; }> = {}
    ): Promise<boolean> => {
        const { transaction = null } = options
        const { id_product, ...data } = entity
        const row = await Product.create({
            id_product: id_product,
            ...data
        },
            {
                ...(transaction && { transaction })
            })
        return !!row
    };
}