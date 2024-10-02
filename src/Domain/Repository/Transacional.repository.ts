export interface TransactionalRepository {
    inTransactional: <T>(fn: (t: unknown) => Promise<T>) => Promise<T>;
}