
import { FiltersData, GetUserCartUseCase } from "@Application/UseCases/Cart";
import { Repository, StatusCodesHttp } from "@Domain/Enums";
import { Controller, ResponseHttp, TokenData } from "@Domain/Model";
import { OptionsHttp } from "@Infrastructure/Implementations";
import { DbRepositoryFactory } from "@Infrastructure/Repositories";

export class GetController implements Controller {
    private readonly _useCase: GetUserCartUseCase;

    constructor() {
        this._useCase = new GetUserCartUseCase(
            DbRepositoryFactory.getInstance().getRepositoryFactory(Repository.UserCart),
            DbRepositoryFactory.getInstance().getRepositoryFactory(Repository.Cart),
            DbRepositoryFactory.getInstance().getRepositoryFactory(Repository.Product)
        )
    }

    public run = async (...args: unknown[]): Promise<unknown> => {
        const [req, res, next] = OptionsHttp.httpArgs<FiltersData>(args);

        const { id_user } = req.user?.data as TokenData
        const { page, size } = req.query as FiltersData

        try {
            const response: ResponseHttp<unknown> = new ResponseHttp({
                ok: true,
                message: 'data obtenida exitosamente'
            })

            response.data = await this._useCase.run({
                data: { id_user, page, size }
            })

            return res.status(StatusCodesHttp.Ok).json(response)
        } catch (error) {
            next(error)
        }
    }
}