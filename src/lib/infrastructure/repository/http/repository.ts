import {useAuthenticationStore} from "@/lib/infrastructure/repository/store/authentication";

export abstract class Repository {
    protected readonly baseApiUrl: string;

    public constructor(baseApiUrl: string) {
        this.baseApiUrl = baseApiUrl;
    }

    protected getAuthenticationHeader(): Record<string, string|null> {
        const authenticationStore = useAuthenticationStore();

        return {
            'Authorization': authenticationStore.token,
        }
    }
}
