import { AddController, GetController, UpdateController } from "@Infrastructure/Controllers";
import { upload } from "@Infrastructure/Database";
import { AddTokenInformationToRequestMiddleware } from "@Infrastructure/Middleware/AddTokenInformationToRequestMiddleware.middleware";
import { Router } from "express"


export const productRouter = (parentEndpoint: string, middlewares: Function[]) => {
    const internalRouter = Router();

    const addTokenToMiddleware = new AddTokenInformationToRequestMiddleware();

    const add = new AddController();
    const get = new GetController();
    const update = new UpdateController();

    internalRouter.post(
        '/add',
        [
            middlewares,
            addTokenToMiddleware.run,
        ] as any[],
        upload.single('img'),
        add.run
    )

    internalRouter.get(
        '/get',
        [
            middlewares,
            addTokenToMiddleware.run,
        ] as any[],
        get.run
    )

    internalRouter.post(
        '/update',
        [
            middlewares,
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