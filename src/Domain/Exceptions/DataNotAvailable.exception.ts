export class DataNotAvailableException extends Error {
    constructor(message: string) {
        super(message)
        this.name = DataNotAvailableException.name
    }
}