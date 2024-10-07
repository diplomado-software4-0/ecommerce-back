import { Router } from "express";
import { userRouter } from "./User.router";
import { productRouter } from "./Product.router";
import { AccessGuardianTokenMiddleware } from "@Infrastructure/Middleware/AccessGuardianToken.middleware";


export class AppRouter {
    constructor(private readonly _router: Router) { }

    public run(): void {
        const router = Router();
        const guardianMiddlewares: Function[] = [new AccessGuardianTokenMiddleware().run]

        const userPath = '/api/user'
        const producPath = '/api/product'

        userRouter(userPath).publishRouter(router)
        productRouter(producPath, guardianMiddlewares).publishRouter(router)

        this._router.use(router)
    }
}