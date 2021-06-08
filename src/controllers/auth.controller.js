const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyAppleToken = require('verify-apple-id-token').default;
const UserModel = require('../models/User');
const ResetPasswordTokenModel = require('../models/ResetPasswordToken');
const logger = require('../utils/logger');
const { sendPasswordReset } = require('../emails/emailProvider');

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

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: 'Email does not exist.' });
    }
    const resetObj = await ResetPasswordTokenModel.create({
      token: crypto.randomBytes(40).toString('hex'),
      used: 0,
      userId: user.id,
    });
    sendPasswordReset(resetObj.token, user.email);
    res.send({ message: 'Password reset request sent!' });
  } catch (error) {
    logger.error('error in forgotpassword', error);
    res.status(500).send({ message: 'error in forgotpassword', error });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const resetObj = await ResetPasswordTokenModel.findOne({ token: req.body.token, used: 0 });
    if (resetObj) {
      return res.status(400).send({ message: 'Reset token is invalid' });
    }
    const user = await UserModel.findById(resetObj.user);
    user.password = bcrypt.hashSync(req.body.password, 10);
    await user.save();
    resetObj.used = 1;
    await resetObj.save();
    res.send({ message: 'Password reset Successful!' });
  } catch (error) {
    logger.error('error in reset passwords', error);
    res.status(500).send({ message: 'error in reset password', error });
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
