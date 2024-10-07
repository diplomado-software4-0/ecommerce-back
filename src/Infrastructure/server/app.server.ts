import { DataAccess } from "@Domain/Model";
import { Logger, SystemEnvironments } from "@SharedDomain/Models";
import { SystemEnv } from "@SharedInfrastructure/Environments";
import express, { Application, Router } from "express";
import cors from "cors"
import { LogApplication } from "@SharedInfrastructure/Log";
import { ExceptionHandlerMiddleware } from "@Infrastructure/Middleware";
import { ExceptionManager } from "@Infrastructure/Implementations";
import helmet from "helmet";
import { FirebaseStorage } from "@Infrastructure/Database";


export class Server {
    private readonly logger: Logger;
    private readonly _app: Application;
    private readonly _parentRouter: Router;
    private readonly _systemEnv: SystemEnvironments;


    public constructor(private readonly dataAccess: DataAccess<unknown>[]) {
        this.logger = new LogApplication(Server)
        this._systemEnv = SystemEnv.getInstance();
        this._app = express();
        this._parentRouter = Router();
    }


    public loadMiddlewares(): void {
        this._app.use(cors());
        this._app.use(helmet())
        this._app.use(express.json());
        this._app.use(express.urlencoded({ extended: true }))
        this._app.set("trust proxy", true)
    }

    public loadRouter(fn: (parentRouter: Router) => void): void {
        fn(this._parentRouter);

        this._app.use(this._parentRouter);

        const exceptionHandler = new ExceptionHandlerMiddleware(new ExceptionManager());
        this._parentRouter.use(exceptionHandler.run);
    }

    private async initDB(): Promise<void> {
        await Promise.all(this.dataAccess.map((dt) => dt.connect()));
    }

    private async storage(): Promise<void> {
        const firebase = FirebaseStorage.getInstance();
        await firebase.connect();
    }

    public start(): void {
        this.initDB();
        this.storage();
        this._app.listen(this._systemEnv.REST_PORT, () => {
            this.logger.info(`Servidor corriendo en http://localhost:${this._systemEnv.REST_PORT}`)
        })
    }
}