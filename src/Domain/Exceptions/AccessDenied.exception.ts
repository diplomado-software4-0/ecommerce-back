export class AccessDeniedExeption extends Error {
    constructor() {
        super("Acceso no autorizado");
        this.name = AccessDeniedExeption.name;
    }
}