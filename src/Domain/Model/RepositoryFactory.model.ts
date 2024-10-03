import { Repository, RepositoryOptional } from "@Domain/Enums";

export interface RepositoryFactoryBase {
	getRepositoryFactory: <T extends Repository>(repository: T) => RepositoryOptional<T>;
}
