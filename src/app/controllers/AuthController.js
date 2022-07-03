const bcrypt = require('bcrypt');
const User = require('../models/User');
const Cart = require('../models/Cart');
const jwt = require('jsonwebtoken');

class SignInController {
  async signUp(req, res, next) {
    try {
      // const formData = req.body;
      // const email = formData.email;
      const { name, phone, email, password, confirmPassword } = req.body;
      let existingUser, _id;

      existingUser = await User.findOne({ email });

      if (existingUser) {
        const error = new Error('User exists already', 422);
        res.render('error', { message: 'Tài khoản đã tồn tại' });
      }
      if (password != confirmPassword) {
        const error = new Error('Confirm password does not match');
        res.render('error', { message: 'Xác nhận mật khẩu không đúng' });
      }

      // Get ID
      const latestUser = await User.findOne({}, { upsert: true }).sort({
        _id: 'desc',
      });
      _id = (latestUser?._id || 0) + 1;

      let hashPassword;
      // let password = formData.password;

      const salt = bcrypt.genSaltSync(10);
      hashPassword = bcrypt.hashSync(password, salt);

      // formData.password = hashPassword;
      const createUser = new User({
        email,
        name,
        phone,
        password: hashPassword,
        image:
          'https://p16-sign.tiktokcdn-us.com/tos-useast5-avt-0068-tx/514b72b37695a35b1c0feab9e3ba63fd~c5_720x720.jpeg?x-expires=1656367200&x-signature=T%2BlCbPyCwj12piFwJJWFdG5yH3s%3D',
        _id,
        balance: 0,
        address: 'TP HCM',
        accessDays: new Date().toDateString(),
      });

      await createUser.save();
      console.log('create User successfully');

      const createCart = new Cart({
        _id,
        userId: _id,
        products: [],
      });

      try {
        await createCart.save();
      } catch (error) {
        console.log(error);
        return next(error);
      }

      res.redirect('/');

      // res.status(201).json({
      //   userId: createUser._id,
      //   email: createUser.email,
      //   password: createUser.password,
      //   token: token,
      // });
    } catch {
      res.render('error', { message: 'Lỗi không xác định' });
    }
  }
  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;

      let existingUser;
      existingUser = await User.findOne({ email });

      if (!existingUser) {
        const error = new Error('User not found');
        res.render('error', { message: 'Không tìm thấy tài khoản' });
      }

      let isValidPassword = false;

      isValidPassword = bcrypt.compareSync(password, existingUser.password);

      if (!isValidPassword) {
        const error = new Error('Password is incorrect');
        res.render('error', { message: 'Sai mật khẩu' });
      }

      let token;

      token = jwt.sign(
        { userId: existingUser._id, email: existingUser.email },
        process.env.JWT_KEY,
        { expiresIn: '1h' }
      );
      res.cookie('token', token);
      res.redirect('/');
    } catch {
      res.render('error', { message: 'Lỗi không xác định' });
    }
  }
  logOut = (req, res) => {
    res.cookie('token', '', { maxAge: 1 });
    res.redirect('/');
  };
}
module.exports = new SignInController();
