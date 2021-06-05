const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyAppleToken = require('verify-apple-id-token').default;
const UserModel = require('../models/User');
const logger = require('../utils/logger');

exports.login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).send({ message: 'Invalid email or password.' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.send({ message: 'Login Successful!', data: { user, token } });
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
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.send({ data: { user, token }, message: 'Registeration Successful' });
  } catch (error) {
    logger.error('error in registering user', error);
    res.status(500).send({ message: 'Error in registering user', error });
  }
};

exports.profile = async (req, res) => {
  try {
    // const user = await UserModel.findOne({ _id: req.user.id });
    res.send({ data: { user: req.user }, message: 'User profile' });
  } catch (error) {
    logger.error('error in registering user', error);
    res.status(500).send({ message: 'Error in registering user', error });
  }
};

exports.thirdPartyAuth = (req, res) => {
  const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET);
  res.send({ data: { user: req.user, token }, message: 'Success!' });
};

exports.verifyAppleLogin = async (req, res) => {
  try {
    const jwtClaims = await verifyAppleToken({
      idToken: req.body.id_token,
      clientId: 'com.gizmohcentral.web',
    });
    logger.info(jwtClaims);
    const userData = { email: jwtClaims.email };
    let user = await UserModel.findOne(userData);
    if (!user) {
      user = await new UserModel(userData).save();
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    return res.json({ token, user });
  } catch (error) {
    logger.error('error in registering user', error);
    res.status(500).send({ message: 'Error in registering user', error });
  }
};
