import { UserEntity } from "@Domain/Entities";

type UserConstructor = Omit<UserEntity, "id_user" | "created_at" | "updated_at">

export class UserValues implements UserConstructor {

}