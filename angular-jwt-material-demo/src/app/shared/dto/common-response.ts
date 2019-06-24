export class CommonResponse<T> {
    public code: string;
    public msg: string;
    public result: T;

    constructor() { }
}