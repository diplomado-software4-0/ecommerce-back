export interface FilterInputData {
    id_product: string;
    name: string;
    category: number;
    initial_approximate_price: number;
    final_approximate_price: number;
    use_pagination: boolean;
    page: number;
    size: number;
}