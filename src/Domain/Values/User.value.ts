import { UserEntity } from "@Domain/Entities";

type UserConstructor = Omit<UserEntity, "id_user" | "created_at" | "updated_at">

export class UserValues implements UserConstructor {
    constructor(data: UserConstructor) {
        this.name = data.name;
        this.lastname = data.lastname;
        this.cell_callsign = data.cell_callsign;
        this.phone_number = data.phone_number;
        this.email = data.email;
        this.password = data.password;
        this.is_active = data.is_active;
        this.created_at = this.updated_at = new Date();
    }

    name: string;

    lastname: string;

    cell_callsign: string;

    phone_number: bigint;

    email: string;

    password: string;

    is_active: boolean;

    created_at: Date;

    updated_at: Date;

}