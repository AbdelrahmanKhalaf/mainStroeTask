import { NextFunction, Response, Router, Request } from "express";
import {
  Iusers,
  User,
  validateUser,
} from "../models/user.model";
import becrypt from "bcryptjs"
const router: Router = Router();
/** 
 * @desc   POST Register
 * @route  POST /api/v1/user/singup
 * @access public
*/
router.post(
  "/singup",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        _id,
        email,
        password,
        phone,
        name,
        addresses,
        confirmPassword,
      }: Iusers = await req.body;
      const { error }: any = validateUser(req.body);
      if (error) return res.status(404).send(error.details[0].message);
      let user = await User.findOne({ email: email });
      if (user)
        return res.status(400).send({
          error_en: "that user already  registered",
          error_ar: "هذا المستخدم مسجل بالفعل",
        });
      let nameUser = await User.findOne({ name: name });
      if (nameUser)
        return res.status(400).send({
          error_en: "that name already exist",
          error_ar: "هذا الاسم موجود بالفعل",
        });
      const vildeLowercase: any = /(?=.*?[a-z])/;
      const vildeCaptalercase: any = /(?=.*?[A-Z])/;
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
      // let loc = await geocoder.geocode(address);
      const salt = await becrypt.genSalt(10);
      const hashPassword = await becrypt.hash(password, salt);
      const hashConfriPassword = await becrypt.hash(confirmPassword, salt);
      const users: any = new User({
        email: email,
        password: hashPassword,
        phone: phone,
        name: name,
        confirmPassword: hashConfriPassword,
        addresses: addresses.map((addresses:any)=>{
          return {
            address:addresses.address
          }
        })
      });
      // const token = jwt.sign({ email: email }, config.JTWSecret, {
      // });
      return users.save((err: any) => {
        if (err) {
          res.status(400).send({
            error_en: "please enter vaild data",
            error_ar: "الرجاء إدخال بيانات صحيحة",
            error: err,
          });
        } else {
          res.status(200).send({
            user: users,
            success: true
          });
        }
      });

    } catch (err) {
      next(err)
    }
  }
);
/** 
 * @desc   GET user get his profile and fache his address by id user
 * @route  GET /api/v1/user/:id
 * @access private
*/
router.get("/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: any = await User.find({ _id: req.params.id }).select('-password -confirmPassword')
      if (!user)
        return res.status(400).send({
          error_en: " the user is not found ",
          error_ar: "المستخدم غير موجد",
        });
      res.send({ user: user , addresses:user[0].addresses});
    } catch (err) {
      return next(err)
    }

  }
);
export default router;
