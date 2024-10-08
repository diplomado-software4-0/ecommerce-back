import { UpdateInputData, UpdateUseCase } from "@Application/UseCases/Product";
import { Controller, ResponseHttp } from "@Domain/Model";
import { DbRepositoryFactory } from '../../Repositories/Factories/DbRepository.factory';
import { Repository, StatusCodesHttp } from "@Domain/Enums";
import { OptionsHttp } from "@Infrastructure/Implementations";



export class UpdateController implements Controller {
    private readonly _useCase: UpdateUseCase;

    constructor() {
        this._useCase = new UpdateUseCase(
            DbRepositoryFactory.getInstance().getRepositoryFactory(Repository.Transactional),
            DbRepositoryFactory.getInstance().getRepositoryFactory(Repository.Product)
        )
    }

    public run = async (...args: unknown[]): Promise<unknown> => {
        const [req, res, next] = OptionsHttp.httpArgs<UpdateInputData>(args);
        try {
            const response: ResponseHttp<unknown> = new ResponseHttp({
                ok: true,
                message: "producto actualizado exitosamente"
            })

            response.data = await this._useCase.run({
                data: req.body
            })

            return res.status(StatusCodesHttp.Ok).json(response)
        } catch (error) {
            next(error)
        }
    }
}