export interface Logger {
    error: (err: Error | string) => string;
    info: (msg: string) => string;
    http: (msg: string) => string;
    warn: (msg: string) => string;
}
