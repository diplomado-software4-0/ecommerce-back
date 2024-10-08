export interface ProductDTO {
    total_items: number;
    total_page: number;
    products: ProductDataDTO[];
}

export interface ProductDataDTO {
    id_product: string;
    id_product_state: number;
    name: string;
    img_url: string;
    price: number;
    descrition: string;
    stock: number;
    category: number;
}