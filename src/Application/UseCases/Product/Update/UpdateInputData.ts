export interface UpdateInputData {
    id_user: bigint | undefined,
    id_product: string;
    id_product_state: number;
    name: string;
    price: number;
    description: string;
    category: number;
    stock: number;
}