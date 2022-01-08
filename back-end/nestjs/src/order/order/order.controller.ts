import { Iorder } from 'src/shard/models/order.interface';
import { OrderService } from './order.service';
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { OrderDto } from 'src/shard/dtos/order.dto';
import { ApiBody, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';

@Controller('order')
export class OrderController {
    constructor(private readonly order: OrderService) { }
    /** 
     * @desc   POST Order by id user 
     * @route  POST api/v1/order/:id
     * @access private
    */
    @ApiCreatedResponse({ description: "Create order : you must add input addressId to selecte address of address user and must path user id in router " })
    @ApiBody({ type: OrderDto })
    @Post(":id")
    create(@Body() order: OrderDto, @Param("id") id: string, @Res() res): Promise<Iorder> {
        return this.order.create(order, id, res)
    }
    /** 
   * @desc   GET Order by id user 
   * @route  GET api/v1/order/:id
   * @access private
  */
    @ApiCreatedResponse({ description: "Get list of list of order by id user " })
    @Get(':id')
    findByIDUser(@Param("id") id: string, @Res() res): Promise<Iorder> {
        return this.order.getOrderUser(id, res)
    }
}
