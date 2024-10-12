import { TransactionalRepository } from "@Domain/Repository/Transacional.repository";
import { UserRepository, UserRoleExecutionRepository } from "@Domain/Repository";
import { UserRoleExecutionValues, UserValues } from "@Domain/Values";
import { SecurityBase, UseCase, UseCaseArgs } from "@Domain/Model";
import { RegisterInputData } from "./RegisterInputData";
import { RoleExecutionEnum } from "@Domain/Enums";


export class RegisterUseCase implements UseCase<RegisterInputData, boolean> {
    constructor(private readonly _security: SecurityBase,
        private readonly _userRepository: UserRepository,
        private readonly _userRoleExecutionRepository: UserRoleExecutionRepository,
        private readonly _transactionalRepository: TransactionalRepository) { }


    public run = async (args: UseCaseArgs<RegisterInputData>): Promise<boolean> => {
        const { ...data } = args.data
        const hashPassword = this._security.encryptSHA256(data.password)

        await this._transactionalRepository.inTransaction(async (transaction) => {
            const userData = new UserValues({
                name: data.name,
                lastname: data.lastname,
                cell_callsign: data.cell_callsign,
                phone_number: data.phone_number,
                email: data.email,
                password: hashPassword,
                is_active: true
            })

            const user = await this._userRepository.register(userData, { transaction })

            const userRoleExecutionData = new UserRoleExecutionValues({
                id_user: user.data.id_user,
                id_role: RoleExecutionEnum.CLIENT
            })

            await this._userRoleExecutionRepository.create(userRoleExecutionData, { transaction })
        })

        return true

    }
}