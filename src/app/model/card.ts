export class Card {
    public card_Id?:string;  // auto increment in the DB
    public name:string;
    public date_Created?: Date;  // date is created automatically in the DB
    public active: boolean;
    public owner_Id?: string;
    public board_Id: string;
    public items?:any;
    public description?:string;
    public sort_Order?:number; // order is on auto increment in the DB
}