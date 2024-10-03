import * as Repositories from "@Domain/Repository"

export enum Repository {
    Transactional,
    User,
    RoleExecution,
    UserRoleExecution
}

export type RepositoryOptional<T extends Repository = Repository.Transactional> =
    T extends Repository.Transactional
    ? Repositories.TransactionalRepository
    : T extends Repository.User
    ? Repositories.UserRepository
    : T extends Repository.RoleExecution
    ? Repositories.RoleExecutionRepository
    : T extends Repository.UserRoleExecution
    ? Repositories.UserRoleExecutionRepository
    : unknown;