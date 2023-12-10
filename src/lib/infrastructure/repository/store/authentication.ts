import {defineStore} from "pinia"
import type {User} from "@/lib/domain/entity/user"

export const useAuthenticationStore = defineStore('authentication', {
    state: () => ({
        user: sessionStorage.getItem('user')
            ? JSON.parse(sessionStorage.getItem('user') as string) as User
            : null,
    }),
    getters: {
        isAuthenticated(): boolean {
            return !!this.user
        },
        token(): string | null {
            return this.user?.token ?? null
        },
    },
    actions: {
        setUser(user: User | null): void {
            this.user = user

            if (user) {
                sessionStorage.setItem('user', JSON.stringify(user))
            } else {
                sessionStorage.removeItem('user')
            }
        },
    },
})
