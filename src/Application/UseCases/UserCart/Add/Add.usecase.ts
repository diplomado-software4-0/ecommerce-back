import { UseCase, UseCaseArgs } from "@Domain/Model";
import { AddInputData } from "./AddInputData";
import { ProductRepository, TransactionalRepository, UserCartRepository } from "@Domain/Repository";
import { UserCartValue } from "@Domain/Values";

export class AddUseCase implements UseCase<AddInputData, boolean> {
    constructor(
        private readonly _userCartRepository: UserCartRepository,
        private readonly _transactionalRepository: TransactionalRepository
    ) {}

    public run = async (args: UseCaseArgs<AddInputData>): Promise<boolean> => {
        const { id_user, products } = args.data;

        //Cambiar la logica para el guardado de uno a uno de los id_product

        await this._transactionalRepository.inTransaction(async (transaction) => {
            for (const product of products) {
                const userCartData = new UserCartValue({
                    id_user: id_user,
                    id_product: product,
                    is_paid: false,
                    state: true,
                });

                await this._userCartRepository.add(userCartData, { transaction });
            }
        });

        return true;
    };
}
