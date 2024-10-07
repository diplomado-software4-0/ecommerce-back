
export class NotFoundDataExeption extends Error {
    constructor(message: string) {
        super(message);
        this.name = NotFoundDataExeption.name;
    }
}