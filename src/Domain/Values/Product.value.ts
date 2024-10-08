import { ProductEntity } from "@Domain/Entities";
import { v4 as uuidv4 } from "uuid"

type ProductConstructor = Omit<ProductEntity, "id_product" | "created_at" | "updated_at">

export class ProductValue implements ProductConstructor {
    constructor(data: ProductConstructor) {
        this._id = uuidv4();
        this.name = data.name;
        this.img_url = data.img_url;
        this.price = data.price;
        this.description = data.description;
        this.category = data.category;
        this.stock = data.stock;
        this.id_product_state = data.id_product_state;
        this.created_at = this.updated_at = new Date()
    }


    private _id: string;

    name: string;

    img_url: string;

    price: number;

    description: string;

    category: number;

    stock: number;

    id_product_state: number;

    created_at: Date;

    updated_at: Date

    get id_product(): string {
        return this._id;
    }
}