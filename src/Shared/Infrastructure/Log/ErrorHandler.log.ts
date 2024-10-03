export class ErrorHandlerLog {
    private _errorList: ErrorConstructor[];

    public constructor(errorList: ErrorConstructor[] = []) {
        this._errorList = errorList;
    }

    public handlerValidator(error: Error): boolean {
        return this._errorList.some((errContructor) => error instanceof errContructor);
    }

    public run(error: Error): string {
        let message: string;
        const loadStackError = Boolean(error.stack);
        if (this.handlerValidator(error)) {
            message = loadStackError ? `${error.name}: ${error.message}` : `${error.message}`;
        } else {
            message = loadStackError ? `${error.stack || ""}` : `${error.message || ""}`;
        }
        return message;
    }
}
