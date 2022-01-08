import { LoginDto } from './../../shard/dtos/login.dto';
import { Ilogin } from './../../shard/models/login.interface';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ApiBody, ApiCreatedResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('auth/login')
export class LoginController {
    constructor(private readonly auth: AuthService) { }
    /** 
    * @desc   POST Login
    * @route  POST api/v1/auth/login
    * @access public
   */
    @ApiUnauthorizedResponse({ description: "Invalid credetials" })
    @ApiCreatedResponse({ description: "Login" })
    @ApiBody({ type: LoginDto })
    @Post()
    login(@Body() user: LoginDto, @Res() res): Promise<Ilogin> {
        return this.auth.login(user,res)
    }
}
