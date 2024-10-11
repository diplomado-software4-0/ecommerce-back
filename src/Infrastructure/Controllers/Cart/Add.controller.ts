
import { AddInputData, AddUseCase } from "@Application/UseCases/Cart";
import { Repository, StatusCodesHttp } from "@Domain/Enums";
import { Controller, ResponseHttp, TokenData } from "@Domain/Model";
import { OptionsHttp } from "@Infrastructure/Implementations";
import { DbRepositoryFactory } from "@Infrastructure/Repositories";

export class AddController implements Controller {
    private readonly _useCase: AddUseCase;

    constructor() {
        this._useCase = new AddUseCase(
            DbRepositoryFactory.getInstance().getRepositoryFactory(Repository.Cart),
            DbRepositoryFactory.getInstance().getRepositoryFactory(Repository.UserCart),
            DbRepositoryFactory.getInstance().getRepositoryFactory(Repository.Product),
            DbRepositoryFactory.getInstance().getRepositoryFactory(Repository.Transactional)
        )
    }

    public run = async (...args: unknown[]): Promise<unknown> => {
        const [req, res, next] = OptionsHttp.httpArgs<AddInputData>(args);

        const { id_user } = req.user?.data as TokenData
        const { products } = req.body

        try {
            const response: ResponseHttp<unknown> = new ResponseHttp({
                ok: true,
                message: "Agregado exitosamente al carrito"
            })

            response.data = await this._useCase.run({
                data: { id_user, products }
            })

            return res.status(StatusCodesHttp.Ok).json(response);
        } catch (error) {
            return next(error)
        }
    }
}