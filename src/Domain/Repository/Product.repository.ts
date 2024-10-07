import { ProductEntity } from "@Domain/Entities";


export interface ProductRepository {
    add: (
        entity: ProductEntity,
        options?: Partial<{ transaction: any }>
    ) => Promise<boolean>

    update: (
        entity: Partial<Omit<ProductEntity, 'created_at' | 'updated_at'>>,
        options?: Partial<{ transaction: any }>
    ) => Promise<boolean>;

    countAll: () => Promise<number>

    get: (
        filter: {
            id_product: string;
            name: string;
            category: number;
            initial_approximate_price: number;
            final_approximate_price: number;
        },

        pagination: {
            use_pagination: boolean;
            page: number;
            size: number;
        }) => Promise<{ data: ProductEntity[] }>

    getById: (id_product: string) => Promise<ProductEntity>
}