export interface Middleware {
    run: (...args: unknown[]) => Promise<unknown>;
}

export interface MiddlewareFunction<T> {
    run: (evaluate: T) => Promise<unknown> | unknown;
}
