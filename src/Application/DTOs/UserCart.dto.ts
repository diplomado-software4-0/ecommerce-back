import { UserCartProductsData } from "./Product.dto";

export interface UserCartDTO {
    total_items: number,
    total_page: number,
    user_cart: UserCartData[],

}

export interface UserCartData {
    id_cart: string;
    purchase_complete: boolean;
    products: UserCartProductsData[];
}