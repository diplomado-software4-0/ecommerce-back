import { UserCartEntity } from "@Domain/Entities";

export interface UserCartRepository {
    add: (
        entity: Omit<UserCartEntity, 'id_cart' | 'created_at' | 'updated_at'>,
        options?: Partial<{ transaction: any }>
    ) => Promise<boolean>

    update: (
        entity: Partial<Omit<UserCartEntity, 'created_at' | 'updated_at'>>,
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
        }) => Promise<{ data: UserCartEntity[] }>

    getData: (id_cart: string, id_product: string) => Promise<UserCartEntity>
}