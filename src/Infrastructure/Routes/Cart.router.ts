
import { AddToCartController, GetCarController, UpdatePurchaseController } from "@Infrastructure/Controllers";
import { AddTokenInformationToRequestMiddleware } from "@Infrastructure/Middleware/AddTokenInformationToRequestMiddleware.middleware";
import { Router } from "express"

export const cartRouter = (parentEndpoint: string, middleware: Function[]) => {
    const internalRouter = Router();

    const addTokenToMiddleware = new AddTokenInformationToRequestMiddleware();

    const add = new AddToCartController();
    const get = new GetCarController();
    const update = new UpdatePurchaseController();

    internalRouter.post(
        '/add',
        [
            middleware,
            addTokenToMiddleware.run,
        ] as any[],
        add.run
    )

    internalRouter.get(
        '/get',
        [
            middleware,
            addTokenToMiddleware.run,
        ] as any[],
        get.run
    )

    internalRouter.post(
        '/purchase',
        [
            middleware,
            addTokenToMiddleware.run,
        ] as any[],
        update.run
    )

    return {
        publishRouter: (router: Router): void => {
            router.use(parentEndpoint, internalRouter)
        }
    }
}