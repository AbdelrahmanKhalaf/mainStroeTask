import { ObjectId, ObjectID } from "mongodb";
import mongoose, { Schema, disconnect, model, Model, Document } from "mongoose";
import joi, { boolean, date, number, string } from "joi";
const schema: Schema = new Schema({
    items: [{
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        unit: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        totalPrice: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            required: true
        }
    }],
    nameStore: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    userId: {
        type: ObjectID,
        ref: "users",
        required: true
    }
});
export interface Iitemes {
    name:string,
    price:number,
    totalPrice:number,
    currency:string,
    unit:string,
    quantity:number
}
export interface Iprodacts{
    items:Array<Iitemes>,
    address:string,
    totalAmount:number,
    userId:string,
    nameStore:string
}
export async function validateOrder(order: any) {
    const schema = await {
        address: joi.string().required(),
    };
    return joi.validate(order, schema);
}
export const Order = mongoose.model("orders", schema);