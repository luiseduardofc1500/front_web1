export class User {
    public readonly id: string;
    public readonly name: string;
    public readonly email: string;
    public readonly token: string;

    constructor(id: string, email: string, name: string, token: string) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.token = token;
    }
}
