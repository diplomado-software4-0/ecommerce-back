import { AccessDeniedExeption } from "@Domain/Exceptions";
import { SecurityBase, TokenData } from "@Domain/Model";
import { UserRepository } from "@Domain/Repository";


export class AccessTokenValidationSecurity {
    constructor(
        private readonly _userRepository: UserRepository,
        private readonly _security: SecurityBase
    ) { }

    public run = async (params: { accessToken: string }): Promise<{
        user?: TokenData,
    }> => {

        const { accessToken = null } = params;

        const existAccessToken = !!accessToken;

        if (!existAccessToken) throw new AccessDeniedExeption();

        const isBearerToken = accessToken.toLowerCase().startsWith("bearer");

        if (!isBearerToken) throw new AccessDeniedExeption();

        const token = accessToken.replace(/(\s|bearer|Bearer)/g, "");

        const decodeToken = this._security.decodeJsonWebToken<TokenData>(token)

        const user = await this._userRepository.getById(decodeToken?.user.id_user)

        if (!user) throw new AccessDeniedExeption();

        return {
            user: user
        }

    }
}