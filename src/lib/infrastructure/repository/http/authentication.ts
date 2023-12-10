import type {AuthenticationRepository as Contract} from "@/lib/domain/repository/authentication";
import {User} from "@/lib/domain/entity/user";
import {Repository} from "@/lib/infrastructure/repository/http/repository";

export class AuthenticationRepository extends Repository implements Contract {
    async signIn(email: string, password: string): Promise<User | null> {
        const requestUrl = `${this.baseApiUrl}/sign-in`;
        const response = await fetch(requestUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });

        if (response.status === 200) {
            return this.castToAuthenticatedUser(await response.json());
        }

        return null;
    }

    async signUp(name: string, email: string, password: string): Promise<User | null> {
        const requestUrl = `${this.baseApiUrl}/sign-up`;
        const response = await fetch(requestUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });

        if (response.status === 200) {
            return this.castToAuthenticatedUser(await response.json());
        }

        return null;
    }

    private castToAuthenticatedUser(data: unknown): User {
        const {user, token} = data as {user: any, token: string};

        return new User(user.id, user.email, user.name, token);
    }
}
