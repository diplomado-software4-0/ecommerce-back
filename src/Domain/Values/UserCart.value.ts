import { UserCartEntity } from "@Domain/Entities";
import { v4 as uuidv4 } from "uuid"

type UserCartConstructor = Omit<UserCartEntity, "id_user_cart" | "created_at" | "updated_at">

export class UserCartValue implements UserCartConstructor {
    constructor(data: UserCartConstructor) {
        this._id = uuidv4();
        this.id_user = data.id_user;
        this.id_product = data.id_product;
        this.is_paid = data.is_paid;
        this.state = data.state;
        this.created_at = this.updated_at = new Date()
    }


    private _id: string;

    id_user: number;

    id_product: string;

    is_paid:boolean;

    state: boolean;

    created_at: Date;

    updated_at: Date

    get id_user_cart(): string {
        return this._id;
    }
}