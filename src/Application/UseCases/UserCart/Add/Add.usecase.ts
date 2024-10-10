import { UseCase, UseCaseArgs } from "@Domain/Model";
import { AddInputData } from "./AddInputData";
import { CartRepository, ProductRepository, TransactionalRepository, UserCartRepository } from "@Domain/Repository";
import { CartValue, UserCartValue } from "@Domain/Values";

export class AddUseCase implements UseCase<AddInputData, boolean> {
    constructor(
        private readonly _userCartRepository: UserCartRepository,
        private readonly _cartRepository: CartRepository,
        private readonly _transactionalRepository: TransactionalRepository
    ) { }

    public run = async (args: UseCaseArgs<AddInputData>): Promise<boolean> => {
        const { id_user, ...data } = args.data;

        await this._transactionalRepository.inTransaction(async (transaction) => {

            const cart = new CartValue({
                id_user: id_user,
                purchase_complete: false

            })

            await this._cartRepository.add(cart, { transaction });

            data.products.map(async (id_product) => {
                const userCart = new UserCartValue({
                    id_cart: cart.id_cart,
                    id_product: id_product,
                    remove_prod: false,
                })

                await this._userCartRepository.add(userCart, { transaction })
                return userCart;

            })


            // Mover la logica al actualizar el estado del los productos cuando se va a reliza el pago de los articulos seleccionados.
            // Validar para ve si por lo menos uno de los productos agregados al carrito se va a comprar comparanado el boolean remove_prod para tal fin 
            // const validate_user_purchase = userCartData.some(x => x.remove_prod)
            // if (validate_user_purchase) {

            //     await this._cartRepository.update({ purchase_complete: true }, { transaction })
            // }
        });

        return true;
    };
}
