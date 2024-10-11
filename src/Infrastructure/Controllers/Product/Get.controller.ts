import { FilterInputData, GetUseCase } from "@Application/UseCases/Product";
import { Repository, StatusCodesHttp } from "@Domain/Enums";
import { Controller, ResponseHttp } from "@Domain/Model";
import { OptionsHttp } from "@Infrastructure/Implementations";
import { DbRepositoryFactory } from "@Infrastructure/Repositories";

export class GetController implements Controller {
    private readonly _useCase: GetUseCase;

    constructor() {
        this._useCase = new GetUseCase(DbRepositoryFactory.getInstance().getRepositoryFactory(Repository.Product))
    }

    public run = async (...args: unknown[]): Promise<unknown> => {
        const [req, res, next] = OptionsHttp.httpArgs<FilterInputData>(args);

        try {
            const response: ResponseHttp<unknown> = new ResponseHttp({
                ok: true,
                message: 'productos obtenidos exitosamente'
            })

            response.data = await this._useCase.run({
                data: req.query as FilterInputData
            })

            return res.status(StatusCodesHttp.Ok).json(response)
        } catch (error) {
            next(error)
        }
    }
}