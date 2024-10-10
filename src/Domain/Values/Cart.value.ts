import { CartEntity } from "@Domain/Entities";
import { v4 as uuidv4 } from "uuid"  

type CartConstructor = Omit<CartEntity, "id_cart" | "created_at" | "updated_at">

export class CartValue implements CartConstructor {
    constructor(data: CartConstructor) {
        this._id = uuidv4();
        this.id_user = data.id_user;
        this.purchase_complete = data.purchase_complete;
        this.created_at = this.updated_at = new Date()
    }


    private _id: string;

    id_user: number;

    purchase_complete: boolean;

    created_at: Date;

    updated_at: Date

    get id_cart(): string {
        return this._id;
    }
}