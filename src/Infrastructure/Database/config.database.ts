import { DatabaseEnv } from "@SharedInfrastructure/Environments";
import { Sequelize } from "sequelize-typescript"
import { DataAccess } from "@Domain/Model";
import { Dialect } from 'sequelize';
import path from "path";
import { Logger } from "@SharedDomain/Models";
import { LogApplication } from "@SharedInfrastructure/Log";

export class DbConfig implements DataAccess<Sequelize> {
    private readonly logger: Logger = new LogApplication(DbConfig);
    private static _instance: DbConfig;
    private readonly _engine: Sequelize;

    private constructor() {
        const env = DatabaseEnv.getInstance();
        this._engine = new Sequelize({
            dialect: env.DB_DIALECT as unknown as Dialect,
            host: env.DB_HOST,
            port: env.DB_PORT,
            username: env.DB_USER,
            password: env.DB_PASS,
            database: env.DB_NAME,
            models: [path.resolve(__dirname, "../Entities")]
        });
    }

    public static getInstance(): DbConfig {
        if (!DbConfig._instance) {
            DbConfig._instance = new DbConfig()
        }

        return DbConfig._instance
    }

    public get engine(): Sequelize {
        return this._engine
    }

    public async connect(): Promise<void> {
        try {
            await this._engine.authenticate();
            this.logger.info("=== CONEXION ESTABLECIDA EXITOSAMENTE A LA BASE DE DATOS ===")
        } catch (error) {
            this.logger.error("=== ERROR AL ESTABLECER CONEXION A LA BASE DE DATOS ===")
            console.log(error)
        }
    }
}