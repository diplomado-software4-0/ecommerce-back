import { ProductDataDTO } from "@Application/DTOs/Product.dto";
import { ProductEntity } from "@Domain/Entities";



export class ProductMapper {
    public static toDTO(entity: ProductEntity[]): ProductDataDTO[] {
        return entity.map(data => ({
            id_product: data.id_product,
            name: data.name,
            img_url: data.img_url,
            price: data.price,
            descrition: data.description,
            stock: Number(data.stock),
            category: Number(data.category)
        }))
    }
}