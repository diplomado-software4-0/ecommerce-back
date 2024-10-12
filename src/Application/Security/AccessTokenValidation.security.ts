import { AccessDeniedExeption } from "@Domain/Exceptions";
import { SecurityBase, TokenData } from "@Domain/Model";
import { UserRepository } from "@Domain/Repository";

export class AccessTokenValidationSecurity {
    constructor(
        private readonly _userRepository: UserRepository,
        private readonly _security: SecurityBase
    ) { }

    public run = async (params: { accessToken: string }): Promise<{ user?: TokenData }> => {
        const { accessToken = null } = params;

        if (!accessToken) throw new AccessDeniedExeption();

        const isBearerToken = accessToken.toLowerCase().startsWith("bearer");

        if (!isBearerToken) throw new AccessDeniedExeption();

        // Limpiar el token eliminando el prefijo "Bearer" y espacios
        const token = accessToken.replace(/(\s|bearer|Bearer)/g, "");

        // Decodificar el token
        const decodeToken = this._security.decodeJsonWebToken<TokenData>(token);

        // Asegurarse de que decodeToken no sea nulo o undefined
        if (!decodeToken?.user?.id_user) throw new AccessDeniedExeption();

        // Obtener el usuario por ID
        const user = await this._userRepository.getById(decodeToken.user.id_user);

        if (!user) throw new AccessDeniedExeption();

        // Retornar la información del usuario
        return { user };
    }
}
