import { Repository, RepositoryOptional } from "@Domain/Enums";
import { DataAccess, RepositoryFactoryBase } from "@Domain/Model";
import { DbConfig } from "@Infrastructure/Database";
import * as repo from "@Infrastructure/Repositories/Postgres"
import { Sequelize } from "sequelize-typescript";


export class DbRepositoryFactory implements RepositoryFactoryBase {
    private static _instance: DbRepositoryFactory;
    private readonly _dataAccess: DataAccess<Sequelize>;

    private constructor() {
        this._dataAccess = DbConfig.getInstance();
    }

    public static getInstance(): DbRepositoryFactory {
        if (!DbRepositoryFactory._instance) {
            DbRepositoryFactory._instance = new DbRepositoryFactory();
        }
        return DbRepositoryFactory._instance;
    }

    public getRepositoryFactory<T extends Repository>(repository: T): RepositoryOptional<T> {
        if (repository === Repository.Transactional) {
            return <RepositoryOptional<T>>new repo.TransacionalRepositoryImpl(this._dataAccess)
        }
        if (repository === Repository.User) {
            return <RepositoryOptional<T>>new repo.UserRepositoryImpl(this._dataAccess)
        }
        if (repository === Repository.RoleExecution) {
            return <RepositoryOptional<T>>new repo.RoleExecutionRepositoryImpl(this._dataAccess)
        }
        if (repository === Repository.UserRoleExecution) {
            return <RepositoryOptional<T>>new repo.UserRoleExecutionRepositoryImpl(this._dataAccess)
        }
        if (repository === Repository.Product) {
            return <RepositoryOptional<T>>new repo.ProductRepositoryImpl(this._dataAccess)
        }
        if (repository === Repository.Cart) {
            return <RepositoryOptional<T>>new repo.CartRepositoryImpl(this._dataAccess)
        }
        if (repository === Repository.UserCart) {
            return <RepositoryOptional<T>>new repo.UserCartRepositoryImpl(this._dataAccess)
        }

        return <RepositoryOptional<T>>null;
    }
}