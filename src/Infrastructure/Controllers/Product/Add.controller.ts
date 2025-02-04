
import { AddInputData, AddUseCase } from "@Application/UseCases/Product";
import { Repository, StatusCodesHttp } from "@Domain/Enums";
import { Controller, ResponseHttp, TokenData } from "@Domain/Model";
import { OptionsHttp } from "@Infrastructure/Implementations";
import { DbRepositoryFactory } from "@Infrastructure/Repositories";
import { StorageImpl } from '../../Implementations/Storage/StorageImpl.storage';

export class AddController implements Controller {
    private readonly _useCase: AddUseCase;

    constructor() {
        this._useCase = new AddUseCase(
            DbRepositoryFactory.getInstance().getRepositoryFactory(Repository.Transactional),
            StorageImpl.getInstance(),
            DbRepositoryFactory.getInstance().getRepositoryFactory(Repository.UserRoleExecution),
            DbRepositoryFactory.getInstance().getRepositoryFactory(Repository.Product),
        )
    }

    public run = async (...args: unknown[]): Promise<unknown> => {
        const [req, res, next] = OptionsHttp.httpArgs<AddInputData>(args);
        const { id_user } = req.user?.data as TokenData;
        const { ...data } = req.body as any

        try {
            const response: ResponseHttp<unknown> = new ResponseHttp({
                ok: true,
                message: "producto agregado exitosamente"
            })

            response.data = await this._useCase.run({
                data: { id_user, ...data },
                file: req.file
            })

            return res.status(StatusCodesHttp.Ok).json(response);
        } catch (error) {
            return next(error)
        }
    }
}