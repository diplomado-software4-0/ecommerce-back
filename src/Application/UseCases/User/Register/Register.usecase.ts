import { RegisterInputData } from "./RegisterInputData";
import { SecurityBase, UseCase, UseCaseArgs } from "@Domain/Model";
import { UserRepository, UserRoleExecutionRepository } from "@Domain/Repository";
import { TransactionalRepository } from "@Domain/Repository/Transacional.repository";


export class RegisterUseCase implements UseCase<RegisterInputData, boolean> {
    constructor(private readonly _security: SecurityBase,
        private readonly _userRepository: UserRepository,
        private readonly _userRoleExecutionRepository: UserRoleExecutionRepository,
        private readonly _transactionalRepository: TransactionalRepository) { }


    public run = async (args: UseCaseArgs<RegisterInputData>): Promise<boolean> => {

        const { ...data } = args.data

        const hashPassword = this._security.encryptSHA256(data.password)
        await this._transactionalRepository.inTransaction(async (transaction) => {
            const userData = new 
        })

    }
}