import { Ilogin } from './../shard/models/login.interface';
import { Iusers } from './../shard/models/user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpCode, Injectable } from '@nestjs/common';
import { SelectAddress } from 'src/shard/helper/selectAddress';
// import becrypt from "bcrypt"
@Injectable()
export class AuthService {
    constructor(@InjectModel('user') private readonly User: Model<Iusers>) { }
    //register
    async create(user: Iusers, res: any): Promise<any> {
        let validatUser = await this.User.findOne({ email: user.email });
        if (validatUser)
            return res.status(400).send({
                error_en: "that user already  registered",
                error_ar: "هذا المستخدم مسجل بالفعل",
            });
        let nameUser = await this.User.findOne({ name: user.name });
        if (nameUser)
            return res.status(400).send({
                error_en: "that name already exist",
                error_ar: "هذا الاسم موجود بالفعل",
            });
        const vildeLowercase: any = /(?=.*?[a-z])/;
        const vildeCaptalercase: any = /(?=.*?[A-Z])/;
        if (!vildeCaptalercase.test(user.password))
            return res.status(400).send({
                error_en: "Password must contain at least 1 uppercase alphabetic character",
                error_ar: " كلمة السر يجب أن يحتوي على حرف أبجدي واحد كبير على الأقل ",
            });
        if (!vildeLowercase.test(user.password))
            return res.status(400).send({
                error_en: "Password must contain at least one lowercase alphabet",
                error_ar: " كلمةالسر يجب أن يحتوي على حرف أبجدي صغير واحد على الأقل",
            });
        if (user.password !== user.confirmPassword)
            return res.status(400).send({
                error_en: "Password does not match",
                error_ar: " كلمة السر غير متطابقة",
            });

        const users = new this.User({
            email: user.email,
            password: user.password,
            phone: user.phone,
            name: user.name,
            confirmPassword: user.confirmPassword,
            addresses: user.addresses.map((addresses: any) => {
                return {
                    address: addresses.address
                }
            }),
            address: SelectAddress(user.addresses, user.address)
        });
        users.save()
        return {
            user: users,
            success: true
        };
    }
    //login
    async login(user: Ilogin, res: any): Promise<any> {
        let validtUser: any = await this.User.findOne({ email: user.email }).select('-password -confirmPassword');
        if (!validtUser)
            return res.status(400).send({
                error_en: "invalid email / or password",
                error_ar: "البريد الإلكتروني أو كلمة السر خاطئة",
            })
        let validPassword = await this.User.findOne({ password: user.password });
        if (!validPassword)
            return res.status(400).send({
                error_en: "invalid email / or password",
                error_ar: "البريد الإلكتروني أو كلمة السر خاطئة",
            });
        return res.status(200).send(
            validtUser,
        )

    }
}
