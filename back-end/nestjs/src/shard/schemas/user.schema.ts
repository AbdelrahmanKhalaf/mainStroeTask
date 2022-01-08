import mongoose, { Schema, disconnect, model, Model, Document } from "mongoose";
export const UserSchema: Schema = new Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 30,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        maxlength: 315,
        unique: true,
        required: true,
    },
    phone: {
        type: Number,
        minlength: 8,
        maxlength: 100,
        required: true,
    },

    password: {
        type: String,
        minlength: 8,
        maxlength: 2015,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true
    },
    //The date when the user joins us
    date: {
        type: Date,
        default: Date.now(),
    },
    addresses: [{
        address: {
            type: String,
            required: true
        }
    }],
    address: {
        type: String,
        required: true
    }
});