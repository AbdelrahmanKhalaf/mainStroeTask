import mongoose, { Schema } from "mongoose";
export const OrderSchema: Schema = new Schema({
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
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
    },
});