export class Todo {
    public todo_Id?:number;
    public order_num: number;
    public title:string;
    public active:boolean;
    constructor(todo_id:number, order_num:number, title:string, active:boolean) {
        this.todo_Id = todo_id;
        this.order_num = order_num;
        this.title = title;
        this.active = active;
    }
}