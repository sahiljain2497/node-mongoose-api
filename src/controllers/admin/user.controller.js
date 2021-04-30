const logger = require('../../utils/logger');
const UserModel = require('../../models/User');

exports.list = async (req, res) => {
  const users = await UserModel.find();
  res.render('admin/users/list', { users });
};
