import { Iusers } from './../../shard/models/user.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel('user') private readonly User: Model<Iusers>) { }
    async getUser(Id: string, res: any): Promise<any> {
        const user = await this.User.find({ _id: Id }).select('-password -confirmPassword')
        if (!user)
            return res.status(400).send({
                error_en: " the user is not found ",
                error_ar: "المستخدم غير موجد",
            });
        return res.status(200).send({ user: user, addresses: user[0].addresses })
    }
}
