import { Itemes } from "../models/items.interface"
import { JoiPipeModule, JoiSchema, JoiSchemaOptions, CREATE } from 'nestjs-joi';
import * as Joi from 'joi';
import { ApiProperty } from "@nestjs/swagger";
@JoiSchemaOptions({
    allowUnknown: false,
})
export class OrderDto {
    @JoiSchema(Joi.array().required())
    @JoiSchema([CREATE], Joi.array().required())
    items!: Array<Itemes>;
    @ApiProperty({ description: "addressId", type: String })
    @JoiSchema(Joi.string().required())
    @JoiSchema([CREATE], Joi.string().required())
    addressId!: string;
    @JoiSchema(Joi.number().required())
    @JoiSchema([CREATE], Joi.number().required())
    totalAmount!: number;
    @JoiSchema(Joi.string().required())
    @JoiSchema([CREATE], Joi.string().required())
    userId!: string;
    @JoiSchema(Joi.string().required())
    @JoiSchema([CREATE], Joi.string().required())
    nameStore!: string
}