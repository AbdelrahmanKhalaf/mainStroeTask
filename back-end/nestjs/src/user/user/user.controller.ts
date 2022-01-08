import { Iusers } from './../../shard/models/user.interface';
import { UserService } from './user.service';
import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('user/profile')
export class UserController {
    constructor(private readonly user: UserService) { }
    /** 
     * @desc   GET user get his profile and fache his addresses by his id
     * @route  GET api/v1/user/profile/:id
     * @access private
    */
    @ApiCreatedResponse({ description: "user get his profile and fache his addresses by his id" })
    @Get(":id")
    find(@Param("id") id: string , @Res() res): Promise<Iusers> {
        return this.user.getUser(id,res)
    }
}
