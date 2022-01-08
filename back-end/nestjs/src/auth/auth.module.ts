import { AuthService } from './auth.service';
import { LoginController } from './login/login.controller';
import { RegisterController } from './register/register.controller';
import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose"
import { UserSchema } from 'src/shard/schemas/user.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: "user", schema: UserSchema }])],
    providers: [AuthService],
    controllers:[RegisterController,LoginController]
})
export class AuthModule {

}
