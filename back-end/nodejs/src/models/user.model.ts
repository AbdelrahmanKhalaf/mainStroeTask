import { ObjectId, ObjectID } from "mongodb";
import mongoose, { Schema, disconnect, model, Model, Document } from "mongoose";
import joi, { boolean, date, number, string } from "joi";
import jwt from "jsonwebtoken";
import config from "../config"
process.env.SUPPRESS_NO_CONFIG_WARNING = "../models/user.model.ts";
const schema: Schema = new Schema({
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
  addresses:[{
    address:{
      type:String,
      required: true
    }
  }] ,
});
export interface Iusers extends Document {
  name: String;
  email: String;
  password:  String | any;
  phone: String;
  gender: number;
  confirmPassword: String | any;
  addresses:String | any,
}
export const User = mongoose.model("user", schema);
//vaildtion whene user register
export async function validateUser(user: any) {
  const schema = await {
    name: joi.string().min(8).max(30).required(),
    email: joi.string().email().min(8).max(100).required(),
    phone: joi.number().min(11).required(),
    password: joi.string().min(8).max(28).required(),
    confirmPassword: joi.string().min(8).max(100).required(),
    addresses:joi.array().required(),
  };
  return joi.validate(user, schema);
}
