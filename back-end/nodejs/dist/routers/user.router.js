"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const router = (0, express_1.Router)();
router.post("/singup", async (req, res, next) => {
    try {
        const { _id, email, password, phone, name, addresses, confirmPassword, } = await req.body;
        const { error } = (0, user_model_1.validateUser)(req.body);
        if (error)
            return res.status(404).send(error.details[0].message);
        let user = await user_model_1.User.findOne({ email: email });
        if (user)
            return res.status(400).send({
                error_en: "that user already  registered",
                error_ar: "هذا المستخدم مسجل بالفعل",
            });
        let nameUser = await user_model_1.User.findOne({ name: name });
        if (nameUser)
            return res.status(400).send({
                error_en: "that name already exist",
                error_ar: "هذا الاسم موجود بالفعل",
            });
        const vildeLowercase = /(?=.*?[a-z])/;
        const vildeCaptalercase = /(?=.*?[A-Z])/;
        if (!vildeCaptalercase.test(password))
            return res.status(400).send({
                error_en: "Password must contain at least 1 uppercase alphabetic character",
                error_ar: " كلمة السر يجب أن يحتوي على حرف أبجدي واحد كبير على الأقل ",
            });
        if (!vildeLowercase.test(password))
            return res.status(400).send({
                error_en: "Password must contain at least one lowercase alphabet",
                error_ar: " كلمةالسر يجب أن يحتوي على حرف أبجدي صغير واحد على الأقل",
            });
        if (password !== confirmPassword)
            return res.status(400).send({
                error_en: "Password does not match",
                error_ar: " كلمة السر غير متطابقة",
            });
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashPassword = await bcryptjs_1.default.hash(password, salt);
        const hashConfriPassword = await bcryptjs_1.default.hash(confirmPassword, salt);
        const users = new user_model_1.User({
            email: email,
            password: hashPassword,
            phone: phone,
            name: name,
            confirmPassword: hashConfriPassword,
            addresses: addresses.map((addresses) => {
                return {
                    address: addresses.address
                };
            })
        });
        return users.save((err) => {
            if (err) {
                res.status(400).send({
                    error_en: "please enter vaild data",
                    error_ar: "الرجاء إدخال بيانات صحيحة",
                    error: err,
                });
            }
            else {
                res.status(200).send({
                    user: users,
                    success: true
                });
            }
        });
    }
    catch (err) {
        next(err);
    }
});
router.get("/:id", async (req, res, next) => {
    try {
        const user = await user_model_1.User.find({ _id: req.params.id }).select('-password -confirmPassword');
        if (!user)
            return res.status(400).send({
                error_en: " the user is not found ",
                error_ar: "المستخدم غير موجد",
            });
        res.send({ user: user, addresses: user[0].addresses });
    }
    catch (err) {
        return next(err);
    }
});
exports.default = router;
//# sourceMappingURL=user.router.js.map