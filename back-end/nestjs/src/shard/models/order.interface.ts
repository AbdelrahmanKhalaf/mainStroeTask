import { Itemes } from "./items.interface";
export interface Iorder{
    items:Array<Itemes>,
    addressId:string,
    totalAmount:number,
    userId:string,
    nameStore:string
}