export interface ProductEntity {
    id_product: string;
    name: string;
    img_url: string;
    price: number;
    description: string;
    category: number;
    stock: number;
    id_product_state: number;
    created_at: Date;
    updated_at: Date
}