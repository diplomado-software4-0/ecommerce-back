export interface UserEntity {
    id_user: bigint,
    name: string,
    lastname: string,
    cell_callsign: string,
    phone_number: bigint,
    email: string,
    password: string,
    is_active: boolean,
    created_at: Date,
    updated_at: Date
}