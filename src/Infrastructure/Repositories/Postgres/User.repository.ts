import { UserEntity } from "@Domain/Entities";
import { DataAccess } from "@Domain/Model";
import { UserRepository } from "@Domain/Repository";
import { Sequelize } from "sequelize-typescript";




export class UserRepositoryImpl implements UserRepository {
    constructor(private readonly _dataAccess: DataAccess<Sequelize>) { }
    register: (entity: Omit<UserEntity, "id_user" | "created_at" | "updated_at">, options?: Partial<{ transaction: any; }>) => Promise<{ data: UserEntity; }>;
    checkCredential: (email: string, pasword: string) => Promise<{ data: UserEntity; }>;
}