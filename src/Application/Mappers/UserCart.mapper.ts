import { CartEntity, ProductEntity } from "@Domain/Entities";
import { UserCartEntity } from '../../Domain/Entities/UserCart.entity';
import { UserCartData } from "@Application/DTOs/UserCart.dto";
import { UserCartProductMapper } from "./Product.mapper";

export class UserCartMapper {
    public static toDTO(cartEntities: CartEntity[], userCartEntity: UserCartEntity[], productEntities: ProductEntity[]): UserCartData[] {
        return cartEntities.map(cartEntity => {

            return {
                id_cart: cartEntity.id_cart,
                purchase_complete: cartEntity.purchase_complete,
                products: UserCartProductMapper.toDTO(userCartEntity, productEntities)
            };
        });
    }
}
