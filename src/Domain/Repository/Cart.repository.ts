import { CartEntity } from "@Domain/Entities";

export interface CartRepository {
    add: (
        entity: Omit<CartEntity, 'id_cart' | 'created_at' | 'updated_at'>,
        options?: Partial<{ transaction: any }>
    ) => Promise<boolean>

    update: (
        entity: Partial<Omit<CartEntity, 'created_at' | 'updated_at'>>,
        options?: Partial<{ transaction: any }>
    ) => Promise<boolean>;

    countAll: () => Promise<number>

    get: (
        id_user_cart: string,
        id_user: number,
        state: number,
        pagination: {
            use_pagination: boolean;
            page: number;
            size: number;
        }) => Promise<{ data: CartEntity[] }>

    countByIdUser: (id_user: number) => Promise<number>

    getByIdUser: (id_user: number, page: number, size: number) => Promise<{ data: CartEntity[] }>
}