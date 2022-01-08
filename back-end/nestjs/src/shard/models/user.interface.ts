export interface Iusers {
    _id?:string,
    name: String;
    email: String;
    password: String | any;
    phone: number;
    confirmPassword: String | any;
    addresses: [{address:string,_id:String}],
    address:String
}