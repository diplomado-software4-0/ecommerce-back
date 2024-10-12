import { AccessTokenValidationSecurity } from "@Application/Security/AccessTokenValidation.security";
import { Repository } from "@Domain/Enums";
import { Middleware, SecurityBase } from "@Domain/Model";
import { SecurityImpl } from "@Infrastructure/Implementations";
import { OptionsHttp } from "@Infrastructure/Implementations/Utils";
import { DbRepositoryFactory } from "@Infrastructure/Repositories";

export class AddTokenInformationToRequestMiddleware implements Middleware {
    private readonly _security: SecurityBase;
    private readonly _extractTokenData: AccessTokenValidationSecurity;

    constructor() {
        this._security = SecurityImpl.getInstance();
        this._extractTokenData = new AccessTokenValidationSecurity(
            DbRepositoryFactory.getInstance().getRepositoryFactory(Repository.User),
            SecurityImpl.getInstance()
        );
    }

    public run = async (...args: unknown[]): Promise<unknown> => {
        const [req, , next] = OptionsHttp.httpArgs(args);
        try {
            // Obtener el token de los headers
            const accessToken: string = (req.headers["authorization"] as string) ?? "";

            // Inicializar req.user si no está definido
            req.user = req.user || {};

            // Ejecutar la validación del token y asignar la información del usuario
            const tokenData = await this._extractTokenData.run({ accessToken });

            // Asegurarse de que se asigna correctamente si se obtiene la información del usuario
            if (tokenData.user) {
                req.user.data = tokenData.user;
            }

            return next();
        } catch (error) {
            return next(error);
        }
    };
}
