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
    description: string;
    stock: number;
    category: number;
}

export interface UserCartProductsData{
    remove_prod: boolean;
    id_product: string;
    id_product_state: number;
    name: string;
    img_url: string;
    price: number;
    description: string;
    stock: number;
    category: number;
}