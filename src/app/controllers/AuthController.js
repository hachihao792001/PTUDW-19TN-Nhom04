const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

class SignInController {
  async signUp(req, res, next) {
    // const formData = req.body;
    // const email = formData.email;
    const { name, phone, email, password, confirmPassword } = req.body;
    let existingUser, _id;

    try {
      existingUser = await User.findOne({ email });
    } catch (error) {
      return next(error);
    }

    if (existingUser) {
      const error = new Error('User exists already', 422);
      return next(error);
    }
    if (password != confirmPassword) {
      const error = new Error('Confirm password does not match');
      return next(error);
    }

    // Get ID
    const latestUser = await User.findOne({}, { upsert: true }).sort({
      _id: 'desc',
    });
    _id = (latestUser?._id || 0) + 1;

    let hashPassword;
    // let password = formData.password;
    try {
      const salt = bcrypt.genSaltSync(10);
      hashPassword = bcrypt.hashSync(password, salt);
    } catch (error) {
      return next(error);
    }
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

    try {
      await createUser.save();
    } catch (error) {
      next(error);
    }

    let token;
    try {
      token = jwt.sign(
        { adminId: createUser._id, email: createUser.email },
        process.env.JWT_KEY,
        { expiresIn: '1h' }
      );
    } catch (error) {
      next(error);
    }

    res.redirect('/');

    // res.status(201).json({
    //   userId: createUser._id,
    //   email: createUser.email,
    //   password: createUser.password,
    //   token: token,
    // });
  }

  async signIn(req, res, next) {
    const { email, password } = req.body;

    let existingUser;
    try {
      existingUser = await User.findOne({ email });
    } catch (err) {
      return next(err);
    }

    if (!existingUser) {
      const error = new Error('User not found');
      return next(error);
    }

    let isValidPassword = false;

    isValidPassword = bcrypt.compareSync(password, existingUser.password);

    if (!isValidPassword) {
      const error = new Error('Password is incorrect');
      return next(error);
    }

    let token;
    try {
      token = jwt.sign(
        { userId: existingUser._id, email: existingUser.email },
        process.env.JWT_KEY,
        { expiresIn: '1h' }
      );
    } catch (err) {
      return next(error);
    }
    res.cookie('token', token);
    res.redirect('/');
  }

  logOut = (req, res) => {
    res.cookie('token', '', { maxAge: 1 });
    res.redirect('/');
  };
}

module.exports = new SignInController();
