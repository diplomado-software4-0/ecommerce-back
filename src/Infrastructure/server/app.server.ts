import { DataAccess } from "@Domain/Model";
import { SystemEnvironments } from "@SharedDomain/Models";
import { SystemEnv } from "@SharedInfrastructure/Environments";
import express, { Application, Router } from "express";
import cors from "cors"


export class Server {
    private readonly _app: Application;
    private readonly _parentRouter: Router;
    private readonly _systemEnv: SystemEnvironments;


    public constructor(private readonly dataAccess: DataAccess<unknown>[]) {
        this._systemEnv = SystemEnv.getInstance();
        this._app = express();
        this._parentRouter = Router();
    }


    public loadMiddlewares(): void {
        this._app.use(cors());
        this._app.use(express.json());
        this._app.use(express.urlencoded({ extended: true }))
        this._app.set("trust proxy", true)
    }

    public loadRouter(fn: (parentRouter: Router) => void): void {
        fn(this._parentRouter);
        this._app.use(this._parentRouter);
    }

    private async initDB(): Promise<void> {
        await Promise.all(this.dataAccess.map((dt) => dt.connect()));
    }

    public start(): void {
        this.initDB();
        this._app.listen(this._systemEnv.REST_PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${this._systemEnv.REST_PORT}`)
        })
    }
}