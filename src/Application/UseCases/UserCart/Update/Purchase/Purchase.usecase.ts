import { UseCase, UseCaseArgs } from "@Domain/Model";
import { PurchaseInputData } from "./PurchaseInputData";
import { CartRepository, TransactionalRepository, UserCartRepository } from "@Domain/Repository";



export class PuschaseUseCase implements UseCase<PurchaseInputData, boolean> {
    constructor(
        private readonly _userCartRepository: UserCartRepository,
        private readonly _cartRepository: CartRepository,
        private readonly _transactionalRepository: TransactionalRepository) { }

    public run = async (args: UseCaseArgs<PurchaseInputData>): Promise<boolean> => {
        const { id_user, id_cart, products } = args.data;

        await this._transactionalRepository.inTransaction(async (transaction) => {

            const getCart = await this._cartRepository.getByIdUser(id_user)

            //Agregar la validacion de que el id_cart ingresado si pertenezca al usuario 


            for (const id_product in products) {
                const getUserCart = await this._userCartRepository.getData(id_cart, id_product)
                await this._userCartRepository.update({ id_user_cart: getUserCart.id_user_cart, remove_prod: false }, { transaction })
            }


        })
        return true;
    }
}