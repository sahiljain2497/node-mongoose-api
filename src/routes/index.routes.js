const router = require('express').Router();
const validator = require('express-joi-validation').createValidator({ passError: true });
const passport = require('../config/passport');

// controllers
const authController = require('../controllers/auth.controller');
// validators
const authRequestSchema = require('../validators/auth.validator');

router.post('/auth/login', [validator.fields(authRequestSchema.login)], authController.login);
router.post('/auth/register', [validator.fields(authRequestSchema.register)], authController.register);
router.post('/auth/facebook/token', passport.authenticate('facebook-token'), authController.thirdPartyAuth, (error, req, res, next) => {
  if (error) {
    res.status(400).json({ success: false, message: 'Auth failed', error });
  }
});
router.post('/auth/google/token', passport.authenticate('google-token', { failWithError: true }), authController.thirdPartyAuth, (error, req, res, next) => {
  if (error) {
    res.status(400).json({ success: false, message: 'Auth failed', error });
  }
});

router.get('/profile', passport.authenticate('jwt', { session: false }), authController.profile);

module.exports = router;
