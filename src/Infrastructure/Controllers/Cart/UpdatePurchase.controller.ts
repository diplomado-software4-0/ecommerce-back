import { Controller, ResponseHttp, TokenData } from "@Domain/Model";
import { DbRepositoryFactory } from '../../Repositories/Factories/DbRepository.factory';
import { Repository, StatusCodesHttp } from "@Domain/Enums";
import { OptionsHttp } from "@Infrastructure/Implementations";
import { PurchaseInputData, PurchaseUseCase } from "@Application/UseCases/Cart";

export class UpdatePurchaseController implements Controller {
    private readonly _useCase: PurchaseUseCase;

    constructor() {
        this._useCase = new PurchaseUseCase(
            DbRepositoryFactory.getInstance().getRepositoryFactory(Repository.UserCart),
            DbRepositoryFactory.getInstance().getRepositoryFactory(Repository.Cart),
            DbRepositoryFactory.getInstance().getRepositoryFactory(Repository.Product),
            DbRepositoryFactory.getInstance().getRepositoryFactory(Repository.Transactional)
        )
    }

    public run = async (...args: unknown[]): Promise<unknown> => {
        const [req, res, next] = OptionsHttp.httpArgs<PurchaseInputData>(args);
        const { id_user } = req.user?.data as TokenData
        const { id_cart, products } = req.body

        try {
            const response: ResponseHttp<unknown> = new ResponseHttp({
                ok: true,
                message: "compra realizada exitosamente"
            })

            response.data = await this._useCase.run({
                data: { id_user, id_cart, products }
            })

            return res.status(StatusCodesHttp.Ok).json(response)
        } catch (error) {
            next(error)
        }
    }
}