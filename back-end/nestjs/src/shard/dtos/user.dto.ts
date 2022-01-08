import { JoiPipeModule, JoiSchema, JoiSchemaOptions, CREATE } from 'nestjs-joi';
import * as Joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';
@JoiSchemaOptions({
    allowUnknown: false,
})
export class userDto {
    @ApiProperty({ description: "name", type: String })
    @JoiSchema(Joi.string().required())
    @JoiSchema([CREATE], Joi.string().required())
    name: String;
    @ApiProperty({ description: "email", type: String })
    @JoiSchema(Joi.string().email().required())
    @JoiSchema([CREATE], Joi.string().email().required())
    email: String;
    @ApiProperty({ description: "password", type: String })
    @JoiSchema(Joi.string().required())
    @JoiSchema([CREATE], Joi.string().required())
    password: String
    @ApiProperty({ description: "phone", type: Number })
    @JoiSchema(Joi.number().required())
    @JoiSchema([CREATE], Joi.string().required())
    phone: number;
    @ApiProperty({ description: "confirmPassword", type: String })
    @JoiSchema(Joi.string().required())
    @JoiSchema([CREATE], Joi.string().required())
    confirmPassword: String
    @ApiProperty({ description: "addressess", type: Array })
    @JoiSchema(Joi.array().required())
    @JoiSchema([CREATE], Joi.array().required())
    addresses: [{ address: string; _id: String; }]
    @ApiProperty({ description: "address", type: String })
    @JoiSchema(Joi.string().required())
    @JoiSchema([CREATE], Joi.string().required())
    address:String
}