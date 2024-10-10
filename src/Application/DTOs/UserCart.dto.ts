import { ProductDataDTO } from "./Product.dto";

export interface UserCartDTO {
    total_items: number,
    total_page: number,
    user_cart: {
        total_items: number,
        total_page: number,
        data: UserCartData[],
    }

}

export interface UserCartData {
    id_cart: string;
    purchase_complete: boolean;
    products: ProductDataDTO[];
}