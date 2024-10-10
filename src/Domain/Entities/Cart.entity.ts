export interface CartEntity {
    id_cart: string;
    id_user: number;
    purchase_complete: boolean;
    created_at: Date;
    updated_at: Date
}