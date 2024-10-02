export interface TransactionalRepository {
    inTransaction: <T>(fn: (t: unknown) => Promise<T>) => Promise<T>;
}