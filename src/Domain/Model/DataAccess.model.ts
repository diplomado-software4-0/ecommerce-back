export interface DataAccess<T> {
    get engine(): T;
    connect: () => Promise<void>;
}