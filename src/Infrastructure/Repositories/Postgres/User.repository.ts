import { UserEntity } from "@Domain/Entities";
import { DataAccess } from "@Domain/Model";
import { UserRepository } from "@Domain/Repository";
import { User } from "@Infrastructure/Entities/User";
import { Transaction } from "sequelize";
import { Sequelize } from "sequelize-typescript";

export class UserRepositoryImpl implements UserRepository {
    constructor(private readonly _dataAccess: DataAccess<Sequelize>) { }

    public register = async (
        entity: Omit<UserEntity, "id_user" | "created_at" | "updated_at">,
        options: Partial<{ transaction: Transaction; }> = {}
    ): Promise<{ data: UserEntity; }> => {

        const { transaction = null } = options
        const { ...data } = entity
        const row = await User.create({ ...data }, { ...(transaction && { transaction }) })
        return { data: row.dataValues as UserEntity }

    };

    checkCredential = async (
        email: string,
        pasword: string
    ): Promise<{ data: UserEntity; }> => {
        const user = await User.findOne({
            where: {
                email: email,
                password: pasword
            }
        })

        return { data: user?.dataValues as UserEntity }
    };

    public getById = async (id_user?: bigint): Promise<UserEntity> => {
        const user = await User.findOne({ where: { id_user: id_user } })
        return user?.dataValues as UserEntity
    };
}