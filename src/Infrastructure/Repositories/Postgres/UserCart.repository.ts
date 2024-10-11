import { UserCartEntity } from "@Domain/Entities";
import { DataAccess } from "@Domain/Model";
import { UserCartRepository } from "@Domain/Repository";
import { UserCart } from "@Infrastructure/Entities/UserCart";
import { Op, Sequelize, Transaction } from "sequelize";



export class UserCartRepositoryImpl implements UserCartRepository {
    constructor(private readonly _dataAccess: DataAccess<Sequelize>) { }

    public add = async (
        entity: Omit<UserCartEntity, "created_at" | "updated_at">,
        options: Partial<{ transaction: Transaction; }> = {}
    ): Promise<boolean> => {
        const { transaction = null } = options
        const { id_user_cart, ...data } = entity
        const row = await UserCart.create({
            id_user_cart: id_user_cart,
            ...data
        },
            {
                ...(transaction && { transaction })
            })
        return !!row

    };

    public update = async (
        entity: Partial<Omit<UserCartEntity, "created_at" | "updated_at">>,
        options: Partial<{ transaction: Transaction; }> = {}
    ): Promise<boolean> => {
        const { transaction = null } = options
        const row = await UserCart.update(entity, {
            where: {
                id_user_cart: entity.id_user_cart
            },

            returning: true,
            ...(transaction && (transaction))
        });

        return !!row;

    };

    public countAll = async (): Promise<number> => {
        const { count } = await UserCart.findAndCountAll();
        return count
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
    ): Promise<{ data: UserCartEntity[]; }> => {

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

        querySql.remove_prod = false

        options = {
            ...options,
            limit: pagination.size,
            offset: ((pagination.page - 1) * pagination.size)
        }

        const { rows } = await UserCart.findAndCountAll({ where: querySql, ...options })
        return { data: rows.map(d => d.dataValues) as UserCartEntity[] }

    };

    public getData = async (id_cart: string): Promise<UserCartEntity[]> => {
        const { rows } = await UserCart.findAndCountAll({ where: { id_cart: id_cart, remove_prod: false } })
        return rows.map(d => d.dataValues) as UserCartEntity[]

    };

    public getByIdsCart = async (id_cart: string[]): Promise<UserCartEntity[]> => {
        const { rows } = await UserCart.findAndCountAll({
            where: {
                id_cart: {
                    [Op.in]: id_cart
                },
                remove_prod: false
            }
        })

        return rows.map(d => d.dataValues) as UserCartEntity[]

    };

}
