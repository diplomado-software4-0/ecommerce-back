import { Time } from "@SharedInfrastructure/Tools/Time.tools";
import { Logger, TimeBase } from "@SharedDomain/Models";
import { ErrorHandlerLog } from "./ErrorHandler.log";
import { EventLevel } from "./EventLevel.log";
import { DateFormat } from "@Domain/Enums";

export class LogApplication implements Logger {
    private readonly _classObject: Function;
    private readonly _errorHandler: ErrorHandlerLog;
    private readonly _time: TimeBase;

    constructor(classObject: Function) {
        this._classObject = classObject;
        this._errorHandler = new ErrorHandlerLog(process.errorContainerInstance);
        this._time = Time.getInstance();
    }

    error(err: Error | string): string {
        const msg = err instanceof Error ? this._errorHandler.run(err) : err;
        return this.buildEvent(EventLevel.ERROR, msg);
    }

    info(msg: string): string {
        return this.buildEvent(EventLevel.INFO, msg);
    }

    http(msg: string): string {
        return this.buildEvent(EventLevel.HTTP, msg);
    }

    warn(msg: string): string {
        return this.buildEvent(EventLevel.WARN, msg);
    }

    private buildEvent(level: EventLevel, message: string): string {
        const time: string = this._time.now(DateFormat.DateTime);
        const log = `${time}  ${level} --- [${this._classObject.name}] : ${message}`;
        console.log(log);
        return log;
    }
}
