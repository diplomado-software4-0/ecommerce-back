export class AuthException extends Error {
    constructor() {
        super('Ups! email o password incorrecta, Intentalo nuevamente')
        this.name = AuthException.name
    }
}