export interface ProductEntity {
    id_product: string;
    name: string;
    img_url: string;
    price: number;
    description: string;
    category: number;
    stock: number;
    is_available: boolean;
    created_at: Date;
    updated_at: Date
}