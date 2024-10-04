import { AuthUseCase } from "@Application/UseCases/User";
import { Repository, StatusCodesHttp } from "@Domain/Enums";
import { Controller, ResponseHttp } from "@Domain/Model";
import { OptionsHttp, SecurityImpl } from "@Infrastructure/Implementations";
import { DbRepositoryFactory } from "@Infrastructure/Repositories";


export class AuthUserController implements Controller {
    private readonly _useCase: AuthUseCase;

    constructor() {
        this._useCase = new AuthUseCase(
            SecurityImpl.getInstance(),
            DbRepositoryFactory.getInstance().getRepositoryFactory(Repository.User),
            DbRepositoryFactory.getInstance().getRepositoryFactory(Repository.UserRoleExecution),
            DbRepositoryFactory.getInstance().getRepositoryFactory(Repository.RoleExecution)
        )
    }

    public run = async (...args: unknown[]): Promise<unknown> => {
        const [req, res, next] = OptionsHttp.httpArgs<{ email: string, password: string }>(args);

        try {
            const response: ResponseHttp<unknown> = new ResponseHttp({
                ok: true,
                message: "Auth successful"
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