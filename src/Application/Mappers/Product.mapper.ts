import { ProductDataDTO, UserCartProductsData } from "@Application/DTOs/Product.dto";
import { ProductEntity, UserCartEntity } from "@Domain/Entities";


export class ProductMapper {
    public static toDTO(entity: ProductEntity[]): ProductDataDTO[] {
        return entity.map(data => ({
            id_product: data.id_product,
            id_product_state: data.id_product_state,
            name: data.name,
            img_url: data.img_url,
            price: data.price,
            description: data.description,
            stock: Number(data.stock),
            category: Number(data.category)
        }))
    }
}
export class UserCartProductMapper {
    public static toDTO(userCartEntity: UserCartEntity[], entity: ProductEntity[]): UserCartProductsData[] {
        return entity.map(product => {

            const userCartItem = userCartEntity.find(cartItem => cartItem.id_product === product.id_product);
            return {
                remove_prod: userCartItem ? userCartItem.remove_prod : false,
                id_product: product.id_product,
                id_product_state: product.id_product_state,
                name: product.name,
                img_url: product.img_url,
                price: product.price,
                description: product.description,
                stock: Number(product.stock),
                category: Number(product.category)
            };
        });
    }
}