import { JoiPipeModule, JoiSchema, JoiSchemaOptions, CREATE } from 'nestjs-joi';
import * as Joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';
@JoiSchemaOptions({
    allowUnknown: false,
})
export class LoginDto {
    @ApiProperty({ description: "email", type: String })
    @JoiSchema(Joi.string().required())
    @JoiSchema([CREATE], Joi.string().required())
    email: String;
    @ApiProperty({ description: "password", type: String })
    @JoiSchema(Joi.string().required())
    @JoiSchema([CREATE], Joi.string().required())
    password: String
}