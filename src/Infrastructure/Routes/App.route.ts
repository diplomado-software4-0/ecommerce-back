import { Router } from "express";
import { userRouter } from "./User.router";
import { productRouter } from "./Product.router";
import { cartRouter } from "./Cart.router"
import { AccessGuardianTokenMiddleware } from "@Infrastructure/Middleware/AccessGuardianToken.middleware";


export class AppRouter {
    constructor(private readonly _router: Router) { }

    public run(): void {
        const router = Router();
        const guardianMiddlewares: Function[] = [new AccessGuardianTokenMiddleware().run]

        const userPath = '/api/user'
        const producPath = '/api/product'
        const cartPath = '/api/cart'

        userRouter(userPath).publishRouter(router)
        productRouter(producPath, guardianMiddlewares).publishRouter(router)
        cartRouter(cartPath, guardianMiddlewares).publishRouter(router)

        this._router.use(router)
    }
}