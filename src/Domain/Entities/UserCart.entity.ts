export interface UserCartEntity {
    id_user_cart: string;
    id_cart: string;
    id_product: string;
    remove_prod: boolean;
    created_at: Date;
    updated_at: Date
}