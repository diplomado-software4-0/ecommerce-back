export interface FilterInputData {
    name: string;
    category: bigint;
    initial_price: Date;
    initial_approximate_price: Date;
    final_approximate_price: Date;
    page: number;
    size: number;
}