export class Page<T>{
    public totalCount: number;
    public list: Array<T>;
    public pageNum: number;
    public pageSize: number;

    constructor() { }
}