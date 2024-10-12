export interface AddInputData {
    id_user: bigint | undefined;
    name: string;
    img: Buffer;
    price: number;
    description: string;
    category: number;
    stock: number;
}