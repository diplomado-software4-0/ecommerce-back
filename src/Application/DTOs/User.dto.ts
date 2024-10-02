export interface UserDTO{
    ok: boolean,
    message: string,
    data:{
        usernname: string;
        token: string
    }
}