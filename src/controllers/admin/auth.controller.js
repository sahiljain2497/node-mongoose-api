const passport = require('../../config/passport');
const logger = require('../../utils/logger');

exports.loginPage = (req, res) => {
  if (req.user) {
    return res.redirect('/admin/users/list');
  }
  return res.render('admin/login');
};

exports.login = (req, res, next) => {
  passport.authenticate('local', (error, user) => {
    if (error) {
      logger.error('Unable to login.', error);
      return res.status(500).send({ message: 'Unable to login.', error });
    }
    if (!user) {
      return res.status(401).send({ message: 'Email or Password incorrect.' });
    }
    req.logIn(user, (logInerror) => {
      if (logInerror) {
        logger.error('Unable to login.', logInerror);
        return res.status(500).send({ message: 'Unable to login.', error });
      }
      return res.send({ message: 'Success' });
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};
