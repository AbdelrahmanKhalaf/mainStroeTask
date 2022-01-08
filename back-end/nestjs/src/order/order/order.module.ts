import { UserSchema } from './../../shard/schemas/user.schema';
import { OrderSchema } from './../../shard/schemas/order.shema';
import { OrderController } from './order.controller';
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { MongooseModule } from "@nestjs/mongoose"
@Module({
    imports: [MongooseModule.forFeature([{ name: "order", schema: OrderSchema },{name:"user",schema:UserSchema}])],
    providers: [OrderService],
    controllers: [OrderController]

})
export class OrderModule { }
