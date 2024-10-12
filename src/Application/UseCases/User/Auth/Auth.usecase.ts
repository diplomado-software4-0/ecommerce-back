import { UserDTO } from "@Application/DTOs/User.dto";
import { AuthException } from "@Domain/Exceptions";
import { SecurityBase, TokenData, UseCase, UseCaseArgs } from "@Domain/Model";
import { RoleExecutionRepository, UserRepository, UserRoleExecutionRepository } from "@Domain/Repository";


export class AuthUseCase implements UseCase<{ email: string, password: string }, UserDTO> {
    constructor(private readonly _security: SecurityBase,
        private readonly _userRepository: UserRepository,
        private readonly _userRoleExecution: UserRoleExecutionRepository,
        private readonly _roleExecution: RoleExecutionRepository) { }

    public run = async (args: UseCaseArgs<{ email: string, password: string }>): Promise<UserDTO> => {

        const { email, password } = args.data
        const hashPassword = this._security.encryptSHA256(password)

        const user = await this._userRepository.checkCredential(email, hashPassword)
        if (user === null) throw new AuthException();

        const userRole = await this._userRoleExecution.getByIdUser(user.data.id_user)
        const roleExecution = await this._roleExecution.getById(Number(userRole.id_role))

        let user_authenticate_name;
        if (user.data.lastname !== null) {
            user_authenticate_name = `${user.data.name} ${user.data.lastname}`
        }
        user_authenticate_name = `${user.data.name}`

        const token = this._security.createTokenWithExpirence<TokenData>({
            data: {
                id_user: user.data.id_user,
                name: user_authenticate_name,
                email: user.data.email,
                role: roleExecution.data.name,
                is_active: user.data.is_active
            },
            expiresIn: '1h'
        })

        return {
            usernname: user_authenticate_name,
            token: token

        }

    }
}