export class InvalidFromatExeption extends Error {
    constructor(message: string) {
        super(message)
        this.name = InvalidFromatExeption.name;
    }
}