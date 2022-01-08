import { User } from './../models/user.model';
import { NextFunction, Response, Router, Request } from "express";
import path from "path"
import { validateOrder, Order, Iitemes } from "../models/orders.model"
import router from "./user.router";
import fs from "fs";
import { totla } from '../helpers/addTotalPrice';
/** 
 * @desc   POST create order
 * @route  POST /api/v1/order/createOrder
 * @access public
*/
router.post('/createOrder/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        let rawdata: any = fs.readFileSync(path.join(__dirname, "../data/prodacts.json"));
        let Prodacts: any = JSON.parse(rawdata);
        const { address, } = req.body
        const { error }: any = validateOrder(req.body);
        if (error) return res.status(404).send(error.details[0].message);
        const addressSelect: any = await User.findOne({ _id: id }, { addresses: { $elemMatch: { _id: address } } })
        if (!addressSelect) return res.status(400).send({
            error_en: "the address you selected was not found",
        });
        const newOrder: any = new Order({
            //items of store the user selectd or chosse
            items: Prodacts.stores[0].items.map((item: Iitemes) => {
                return {
                    name: item.name,
                    price: item.price,
                    totalPrice: item.totalPrice,
                    currency: item.currency,
                    unit: item.unit,
                    quantity:item.quantity
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
    } catch (ex) {
        throw ex
    }

})
export default router;
