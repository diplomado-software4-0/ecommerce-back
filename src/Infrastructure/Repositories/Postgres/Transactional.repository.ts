import { DataAccess } from "@Domain/Model";
import { Sequelize } from "sequelize-typescript";




export class TransacionalRepositoryImpl implements TransacionalRepositoryImpl{
    constructor(private readonly _dataAcces: DataAccess<Sequelize>) {}

    public inTransaction= async <T>(fn: (t: unknown) => Promise<T>):Promise<T> => {
        return await this._dataAcces.engine.transaction(async(t) => await fn(t));
    };

    
}