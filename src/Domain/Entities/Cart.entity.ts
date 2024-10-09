export interface CartEntity {
    id_cart: string;
    id_user: number;
    id_user_cart: string;
    purchase_complete: boolean;
    created_at: Date;
    updated_at: Date
}