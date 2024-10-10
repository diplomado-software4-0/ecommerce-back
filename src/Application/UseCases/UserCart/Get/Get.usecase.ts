import { UseCase, UseCaseArgs } from "@Domain/Model";
import { GetFilters } from "./GetFilters";
import { UserCartDTO } from "@Application/DTOs/UserCart.dto";
import { CartRepository, ProductRepository, UserCartRepository } from "@Domain/Repository";
import { UserCartMapper } from "@Application/Mappers/UserCart.mapper";


export class GetUserCartUseCase implements UseCase<GetFilters, UserCartDTO> {
    constructor(private readonly _userCartRepository: UserCartRepository,
        private readonly _cartRepository: CartRepository,
        private readonly _productRepository: ProductRepository) { }


    public run = async (args: UseCaseArgs<GetFilters>): Promise<UserCartDTO> => {
        const { id_user, ...data } = args.data
        let initialPage = 1;
        let initialSize = 10;

        if (data.page != null && data.page > 0) {
            initialPage = data.page - 1;
        }

        if (data.size != null && data.size > 0 && data.size <= 10) {
            initialSize = data.size;
        }

        const cart = await this._cartRepository.getByIdUser(id_user, data.page, data.size);

        //Calcular el total de paginas y de datos
        const countItems = await this._cartRepository.countByIdUser(id_user)
        const countPages = Math.ceil(countItems / initialSize)

        const user_cart = await this._userCartRepository.getByIdsCart(cart.data.map(x => x.id_cart), data.page, data.size)
        const products = await this._productRepository.getByIds(user_cart.map(x => x.id_product))


        const dataMapper = UserCartMapper.toDTO(cart.data, products)

        return {
            total_items: countItems,
            total_page: countPages,
            user_cart: {
                total_items: 
                total_pages:
            }
             dataMapper
        }

    }
}