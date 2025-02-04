import { UseCase, UseCaseArgs } from "@Domain/Model";
import { AddInputData } from "./AddInputData";
import { CartRepository, ProductRepository, TransactionalRepository, UserCartRepository } from "@Domain/Repository";
import { CartValue, UserCartValue } from "@Domain/Values";
import { DataNotAvailableException } from "@Domain/Exceptions";

export class AddUseCase implements UseCase<AddInputData, boolean> {
    constructor(
        private readonly _cartRepository: CartRepository,
        private readonly _userCartRepository: UserCartRepository,
        private readonly _productRepository: ProductRepository,
        private readonly _transactionalRepository: TransactionalRepository
    ) { }

    public run = async (args: UseCaseArgs<AddInputData>): Promise<boolean> => {
        const { id_user, ...data } = args.data;

        await this._transactionalRepository.inTransaction(async (transaction) => {
            const cart = new CartValue({
                id_user: Number(id_user),
                purchase_complete: false
            });

            await this._cartRepository.add(cart, { transaction });

            for (const id_product of data.products) {
                const product = await this._productRepository.getById(id_product);
                if (product.stock <= 0) throw new DataNotAvailableException(`El producto con id ${id_product} no está disponible en este momento`);

                const userCart = new UserCartValue({
                    id_cart: cart.id_cart,
                    id_product: id_product,
                    remove_prod: false
                });

                await this._userCartRepository.add(userCart, { transaction });
            }
        });

        return true;
    };
}
