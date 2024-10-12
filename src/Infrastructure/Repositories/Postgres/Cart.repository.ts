import { CartEntity } from "@Domain/Entities";
import { DataAccess } from "@Domain/Model";
import { CartRepository } from "@Domain/Repository";
import { Cart } from "@Infrastructure/Entities/Cart";
import { Sequelize, Transaction, where } from "sequelize";



export class CartRepositoryImpl implements CartRepository {
    constructor(private readonly _dataAccess: DataAccess<Sequelize>) { }

    public add = async (
        entity: Omit<CartEntity, "created_at" | "updated_at">,
        options: Partial<{ transaction: Transaction }> = {}
    ): Promise<boolean> => {
        const { transaction = null } = options
        const { id_cart, ...data } = entity
        const row = await Cart.create({
            id_cart: id_cart,
            ...data
        },
            {
                ...(transaction && { transaction })
            })
        return !!row

    };

    public update = async (
        entity: Partial<Omit<CartEntity, "created_at" | "updated_at">>,
        options: Partial<{ transaction: Transaction }> = {}
    ): Promise<boolean> => {
        const { transaction = null } = options
        const row = await Cart.update(entity, {
            where: {
                id_cart: entity.id_cart
            },

            returning: true,
            ...(transaction && (transaction))
        });

        return !!row;

    };

    public countAll = async (): Promise<number> => {
        const { count } = await Cart.findAndCountAll({
            where: {
                purchase_complete: true
            }
        })

        return count;
    };

    public get = async (
        id_user_cart: string,
        id_user: number,
        state: number,
        pagination: {
            use_pagination: boolean;
            page: number;
            size: number;
        }
    ): Promise<{ data: CartEntity[]; }> => {

        const querySql: any = {}
        let options: any = {}

        if (id_user_cart && id_user_cart !== "") {
            querySql.id_user_cart = id_user_cart
        }

        if (id_user && id_user > 0) {
            querySql.id_user = id_user
        }

        if (state && state > 0) {
            querySql.state = state
        }

        options = {
            ...options,
            limit: pagination.size,
            offset: ((pagination.page - 1) * pagination.size)
        }

        const { rows } = await Cart.findAndCountAll({ where: querySql, ...options })
        return { data: rows.map(d => d.dataValues) as CartEntity[] }

    };

    public getByIdUser = async (id_user: number): Promise<{ data: CartEntity[]; }> => {
        const { rows } = await Cart.findAndCountAll({
            where: {
                id_user: id_user
            }
        })

        return { data: rows.map(d => d.dataValues) as CartEntity[] }
    };

    public countByUser = async (id_user: number): Promise<number> => {
        const { count } = await Cart.findAndCountAll({
            where: {
                id_user: id_user
            }
        })

        return count;
    };

    public getByUser = async (id_user: number, page: number, size: number): Promise<{ data: CartEntity[]; }> => {
        const { rows } = await Cart.findAndCountAll({
            where: {
                id_user: id_user
            },
            limit: size,
            offset: (page - 1) * size
        })

        return { data: rows.map(x => x.dataValues) as CartEntity[] }
    };

}