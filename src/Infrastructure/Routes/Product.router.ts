import { AddController, GetController } from "@Infrastructure/Controllers";
import { upload } from "@Infrastructure/Database";
import { Router } from "express"


export const productRouter = (parentEndpoint: string, middlewares: Function[]) => {
    const internalRouter = Router();

    const add = new AddController();
    const get = new GetController();

    internalRouter.post(
        '/add',
        // [middlewares] as any[],
        upload.single('img'),
        add.run
    )

    internalRouter.get(
        '/get',
        get.run
    )

    internalRouter.post(
        '/update'
    )

    return {
        publishRouter: (router: Router): void => {
            router.use(parentEndpoint, internalRouter)
        }
    }
}