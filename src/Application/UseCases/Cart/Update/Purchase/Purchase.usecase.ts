import { UseCase, UseCaseArgs } from "@Domain/Model";
import { PurchaseInputData } from "./PurchaseInputData";
import { CartRepository, ProductRepository, TransactionalRepository, UserCartRepository } from "@Domain/Repository";
import { NotFoundDataExeption } from "@Domain/Exceptions";
import { UserCart } from '../../../../../Infrastructure/Entities/UserCart';

export class PuschaseUseCase implements UseCase<PurchaseInputData, boolean> {
    constructor(
        private readonly _userCartRepository: UserCartRepository,
        private readonly _cartRepository: CartRepository,
        private readonly _productRepository: ProductRepository,
        private readonly _transactionalRepository: TransactionalRepository) { }

    public run = async (args: UseCaseArgs<PurchaseInputData>): Promise<boolean> => {
        const { id_user, id_cart, products } = args.data;

        await this._transactionalRepository.inTransaction(async (transaction) => {

            const cart = await this._cartRepository.getByIdUser(id_user)

            //Agregar la validacion de que el id_cart ingresado si pertenezca al usuario

            const checkRequest = cart.data.find(item => item.id_cart === id_cart);

            if (!checkRequest) throw new NotFoundDataExeption(`Ups, al parecer el id_cart ${id_cart} no pertence a tu usuario`)
            //Se actualiza el stock de los productos de la base de datos

            for (let id in products) {
                const product = await this._productRepository.getById(id)
                await this._productRepository.update({ id_product: id, stock: Number(product.stock) - 1 })
            }

            const userCart = await this._userCartRepository.getData(id_cart)

            // Se buscan los productos que se removieron del carrito de compras
            const productsToRemove = userCart.filter(item => !products.includes(item.id_product));

            for (const product in productsToRemove) {

                await this._userCartRepository.update({ id_product: product, remove_prod: true }, { transaction })
            }
        })

        return true;
    }
}