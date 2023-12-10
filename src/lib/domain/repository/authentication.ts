import type {User} from "@/lib/domain/entity/user";

export interface AuthenticationRepository {
    signIn(email: string, password: string): Promise<User|null>;

    signUp(name: string, email: string, password: string): Promise<User|null>;
}
