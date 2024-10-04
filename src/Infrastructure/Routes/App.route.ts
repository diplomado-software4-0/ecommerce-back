import { Router } from "express";
import { userRouter } from "./User.router";


export class AppRouter {
    constructor(private readonly _router: Router) { }

    public run(): void {
        const router = Router();

        const userPath = '/api/user'

        userRouter(userPath).publishRouter(router)

        this._router.use(router)
    }
}