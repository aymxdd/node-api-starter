export interface User {
    name: string;
    email: string;
    password: string;
}

export function isUserItem(arg: any): arg is User {
    return (
        typeof arg === 'object' &&
        typeof arg.name === 'string' &&
        typeof arg.password === 'string' &&
        typeof arg.email === 'string' &&

        arg.name.length > 0 &&
        arg.password.length > 0 &&
        arg.email.length > 0
    );
}