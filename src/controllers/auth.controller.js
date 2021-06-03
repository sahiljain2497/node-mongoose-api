const bcrypt = require('bcrypt');
const jwtUtil = require('../utils/jwt');
const UserModel = require('../models/User');
const logger = require('../utils/logger');

exports.login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).send({ message: 'Invalid email or password.' });
    }
    res.send({ message: 'Login Successful!', data: { user, token: jwtUtil.createToken(user.id) } });
  } catch (error) {
    logger.error('error in user authentication', error);
    res.status(500).send({ message: 'Error in user authentication', error });
  }
};

exports.register = async (req, res) => {
  try {
    const user = new UserModel(req.body);
    user.role = 'USER';
    user.password = bcrypt.hashSync(req.body.password, 10);
    await user.save();
    res.send({ data: { user }, message: 'Registeration Successful' });
  } catch (error) {
    logger.error('error in registering user', error);
    res.status(500).send({ message: 'Error in registering user', error });
  }
};

exports.profile = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.userId });
    res.send({ data: { user }, message: 'Registeration Successful' });
  } catch (error) {
    logger.error('error in registering user', error);
    res.status(500).send({ message: 'Error in registering user', error });
  }
};
