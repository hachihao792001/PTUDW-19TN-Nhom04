const { mongooseToObject } = require('../../utils/mongoose');
const User = require('../models/User');

class ProfileController {
  //[GET] /profile
  async index(req, res, next) {
    const { userId } = req.params;

    let user = await User.findById(userId);

    user = mongooseToObject(user);

    res.render('profile', {
      user,
    });
  }
}

module.exports = new ProfileController();
