import { AccessTokenValidationSecurity } from "@Application/Security/AccessTokenValidation.security";
import { Repository } from "@Domain/Enums";
import { Middleware } from "@Domain/Model/Middleware.model";
import { OptionsHttp, SecurityImpl } from "@Infrastructure/Implementations";
import { DbRepositoryFactory } from "@Infrastructure/Repositories";


export class AccessGuardianTokenMiddleware implements Middleware {
    private readonly _accessTokenValidationTokenSecurity: AccessTokenValidationSecurity;

    constructor() {
        this._accessTokenValidationTokenSecurity = new AccessTokenValidationSecurity(DbRepositoryFactory.getInstance().getRepositoryFactory(Repository.User),
            SecurityImpl.getInstance()
        );
    }

    public run = async (...args: unknown[]): Promise<unknown> => {
        const [req, , next] = OptionsHttp.httpArgs(args)

        try {
            const accessToken: string = req.headers["authorization"] as string;
            const { user } = await this._accessTokenValidationTokenSecurity.run({ accessToken })

            req.user = { data:user }

            return next();
        } catch (error) {
            return next(error);
        }
    }
}