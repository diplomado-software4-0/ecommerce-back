export type TokenData = {
    id_user: bigint | undefined,
    name: string,
    email: string,
    role?: string,
    is_active: boolean
}