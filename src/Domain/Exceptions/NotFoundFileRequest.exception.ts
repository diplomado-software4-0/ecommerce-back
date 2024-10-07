
export class NotFoundFileRequestExeption extends Error {
    constructor() {
        super("No se ha encotrado file en la request");
        this.name = NotFoundFileRequestExeption.name;
    }
}