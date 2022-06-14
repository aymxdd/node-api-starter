export interface Example {
    id: string;
    content: string;
}

export function isExampleItem(arg: any): arg is Example {
    return (
        typeof arg === 'object' &&
        typeof arg.id === 'string' &&
        typeof arg.content === 'string' &&

        arg.id.length > 0 &&
        arg.content.length > 0
    );
}