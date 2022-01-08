import { userDto } from './../../shard/dtos/user.dto';
import { Iusers } from './../../shard/models/user.interface';
import { AuthService } from '../auth.service';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('auth/register')
export class RegisterController {
    constructor(private readonly auth: AuthService) { }
    /** 
     * @desc   POST Register
     * @route  POST api/v1/auth/register
     * @access public
    */
    @ApiCreatedResponse({ description: "Register && Notes : addresses are array of object like this [{'address':'cairo'},{'address':'giza'}] and _id will created automatic" })
    @ApiBody({type:userDto})
    @Post()
    create(@Body() user: userDto, @Res() res): Promise<Iusers> {
        return this.auth.create(user,res)
    }
}
