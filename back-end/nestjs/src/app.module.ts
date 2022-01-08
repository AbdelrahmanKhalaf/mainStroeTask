import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { OrderModule } from './order/order/order.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user/user.module';
// you can use your name account and password on mongodb like this mongodb+srv://name:password @temwork-vxavl.mongodb.net/main?retryWrites=true&w=majority
// or useing local like mongodb://localhost:27017
@Module({
  imports: [OrderModule, AuthModule , MongooseModule.forRoot('mongodb+srv://@temwork-vxavl.mongodb.net/main?retryWrites=true&w=majority'), UserModule],
  providers: [AppService],
})
export class AppModule { }
