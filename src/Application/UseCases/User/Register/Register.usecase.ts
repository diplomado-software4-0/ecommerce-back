
import { RegisterInputData } from "./RegisterInputData";
import { UserDTO } from "@Application/DTOs/User.dto";
import { UseCase, UseCaseArgs } from "@Domain/Model";
import { UserRepository, UserRoleExecutionRepository } from "@Domain/Repository";
import { TransactionalRepository } from "@Domain/Repository/Transacional.repository";


export class RegisterUseCase implements UseCase<RegisterInputData, UserDTO> {
    constructor(private readonly _userRepository: UserRepository,
        private readonly _userRoleExecutionRepository: UserRoleExecutionRepository,
        private readonly _transactionalRepository: TransactionalRepository) { }


    public run = async (args: UseCaseArgs<RegisterInputData>): Promise<UserDTO> => {

        const { ...data } = args.data

    }
}