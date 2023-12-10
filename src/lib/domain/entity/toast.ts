export class Toast {
    public readonly id: string = Math.random().toString(36);
    public readonly message: string;
    public readonly error: boolean;

    constructor(message: string, error: boolean) {
        this.message = message;
        this.error = error;
    }

    public static success(message: string): Toast {
        return new Toast(message, false);
    }

    public static error(message: string): Toast {
        return new Toast(message, true);
    }
}
