import { AuthUserController, RegisterUserController } from "@Infrastructure/Controllers";
import { Router } from "express"


export const userRouter = (parentEndpoint: string) => {
    const internalRouter = Router();

    const register = new RegisterUserController();
    const auth = new AuthUserController();

    internalRouter.post(
        '/register',
        register.run
    )

    internalRouter.post(
        '/auth',
        auth.run
    )

    return {
        publishRouter: (router: Router): void => {
            router.use(parentEndpoint, internalRouter)
        }
    }
}