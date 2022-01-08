import { Itemes } from './../../shard/models/items.interface';
import { Iusers } from './../../shard/models/user.interface';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Iorder } from '../../shard/models/order.interface';
import fs = require('fs');
import path = require('path');
import { totla } from 'src/shard/helper/addTotalPrice';
@Injectable()
export class OrderService {
    constructor(@InjectModel('order') private readonly Order: Model<Iorder>, @InjectModel('user') private readonly User: Model<Iusers>) { }
    async create(order: Iorder, id: string, res): Promise<any> {
        let rawdata: any = fs.readFileSync(path.join(__dirname, "../../shard/data/prodacts.json"));
        let Prodacts: any = JSON.parse(rawdata);
        const addressSelect: any = await this.User.findOne({ _id: id }, { addresses: { $elemMatch: { _id: order.addressId } } })
        if (!addressSelect) return res.status(400).send({
            error_en: "the address you selected was not found",
        });
        const newOrder: any = new this.Order({
            //items of store the user selectd or chosse
            items: Prodacts.stores[0].items.map((item: Itemes) => {
                return {
                    name: item.name,
                    price: item.price,
                    totalPrice: item.totalPrice,
                    currency: item.currency,
                    unit: item.unit,
                    quantity: item.quantity
                }
            }),
            nameStore: Prodacts.stores[0].name,
            totalAmount: totla(Prodacts.stores[0].items),
            //should be selected address form categroy in front-end 
            address: addressSelect.addresses[0].address,
            //user id 
            userId: id
        })
        newOrder.save()
        return res.status(200).send({ order: newOrder })
    }
    async getOrderUser(id: String, res: any) {
        const order = await this.Order.find({ userId: id }).populate({
            path: "userId",
            module: "user",
            select: "name"
        })
        if (!order[0])
            return res.status(400).send({
                error_en: ` the order is not found with this id user : ${id}`,
                error_ar: "الطلب غير موجد",
            });
        return res.status(200).send({ order: order })
    }
}
