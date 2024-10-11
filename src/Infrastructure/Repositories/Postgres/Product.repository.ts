import { ProductEntity } from "@Domain/Entities";
import { DataAccess } from "@Domain/Model";
import { ProductRepository } from "@Domain/Repository";
import { Product } from "@Infrastructure/Entities/Product";
import { fn, Op, Transaction } from "sequelize";
import { Sequelize } from "sequelize-typescript";


export class ProductRepositoryImpl implements ProductRepository {
    constructor(private readonly _dataAccess: DataAccess<Sequelize>) { }

    public add = async (
        entity: Omit<ProductEntity, 'created_at' | 'updated_at'>,
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

    public update = async (
        entity: Partial<Omit<ProductEntity, "created_at" | "updated_at">>,
        options: Partial<{ transaction: Transaction }> = {}
    ): Promise<boolean> => {
        const { transaction = null } = options
        const row = await Product.update(entity, {
            where: {
                id_product: entity.id_product
            },

            returning: true,
            ...(transaction && (transaction))
        });

        return !!row;
    };

    public countAll = async (id_product_state: number): Promise<number> => {
        const { count } = await Product.findAndCountAll({ where: { id_product_state: id_product_state } });
        return count;
    };

    public get = async (
        filter: {
            id_product: string;
            id_product_state: number;
            name: string;
            category: number;
            initial_approximate_price: number;
            final_approximate_price: number;
        },
        pagination: {
            use_pagination: boolean;
            page: number;
            size: number;
        }): Promise<{ data: ProductEntity[] }> => {

        const querySql: any = {}
        let options: any = {}

        if (filter.id_product && filter.id_product !== "") {
            querySql.id_product = filter.id_product;
        }

        if (filter.id_product_state && filter.id_product_state > 0) {
            querySql.id_product_state = filter.id_product_state;
        }

        if (filter.name && filter.name !== "") {
            querySql.name = {
                [Op.iLike]: fn('unaccent', `%${filter.name}%`)
            };
        }

        if (filter.category > 0) {
            querySql.category = filter.category
        }

        if (filter.initial_approximate_price > 0 && filter.final_approximate_price > 0) {
            querySql.price = {
                [Op.between]: [filter.initial_approximate_price, filter.final_approximate_price]
            };
        }

        if (pagination.use_pagination !== false) {
            options = {
                ...options,
                limit: pagination.size,
                offset: (pagination.page - 1) * pagination.size
            }
        }

        const { rows } = await Product.findAndCountAll({ where: querySql, ...options })
        return { data: rows.map(d => d.dataValues) as ProductEntity[] }

    };


    public getById = async (id_product: string): Promise<ProductEntity> => {
        const row = await Product.findOne({ where: { id_product: id_product } })
        return row?.dataValues as ProductEntity
    };

    public getByIds = async (id_product: string[]): Promise<ProductEntity[]> => {
        const { rows } = await Product.findAndCountAll({
            where: {
                id_product: {
                    [Op.in]: id_product
                }

            }
        })

        return rows.map(x => x.dataValues as ProductEntity)
    };


}