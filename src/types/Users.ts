export interface User {
    id: string;
    email: string;
    password: string;
}

export function isUserItem(arg: any): arg is User {
    return (
        typeof arg === 'object' &&
        typeof arg.id === 'string' &&
        typeof arg.password === 'string' &&
        typeof arg.email === 'string' &&

        arg.id.length > 0 &&
        arg.password.length > 0 &&
        arg.email.length > 0
    );
}