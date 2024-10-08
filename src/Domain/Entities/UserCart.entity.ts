export interface UserCartEntity {
    id_user_cart: string;
    id_user: number;
    id_product: string;
    is_paid: boolean;
    state: boolean;
    created_at: Date;
    updated_at: Date
}