import { RegisterUseCase } from "@Application/UseCases/User/Register/Register.usecase";
import { Repository, StatusCodesHttp } from "@Domain/Enums";
import { SecurityImpl, OptionsHttp } from '@Infrastructure/Implementations';
import { UseCase } from '../../../Domain/Model/UseCase.model';
import { Controller, ResponseHttp } from "@Domain/Model";
import { RegisterInputData } from "@Application/UseCases/User";
import { DbRepositoryFactory } from "@Infrastructure/Repositories";

export class RegisterUserController implements Controller {
    private readonly _useCase: RegisterUseCase;

    constructor() {
        this._useCase = new RegisterUseCase(
            SecurityImpl.getInstance(),
            DbRepositoryFactory.getInstance().getRepositoryFactory(Repository.User),
            DbRepositoryFactory.getInstance().getRepositoryFactory(Repository.UserRoleExecution),
            DbRepositoryFactory.getInstance().getRepositoryFactory(Repository.Transactional)
        )
    }

    public run = async (...args: unknown[]): Promise<unknown> => {
        const [req, res, next] = OptionsHttp.httpArgs<RegisterInputData>(args);
        try {
            const response: ResponseHttp<unknown> = new ResponseHttp({
                ok: true,
                message: "Registro exitoso"
            })

            response.data = await this._useCase.run({
                data: req.body
            })

            return res.status(StatusCodesHttp.Ok).json(response)
        } catch (error) {
            return next(error)
        }
    }
}