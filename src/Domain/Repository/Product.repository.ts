import { ProductEntity } from "@Domain/Entities";


export interface ProductRepository {
    add: (
        entity: ProductEntity,
        options?: Partial<{ transaction: any }>
    ) => Promise<boolean>
}