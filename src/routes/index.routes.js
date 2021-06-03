const router = require('express').Router();
const validator = require('express-joi-validation').createValidator({ passError: true });
const jwtUtil = require('../utils/jwt');

const authController = require('../controllers/auth.controller');

const authRequestSchema = require('../validators/auth.validator');

const baseMiddlewares = [jwtUtil.verifyToken, jwtUtil.isLoggedIn];

router.get('/login', [validator.fields(authRequestSchema.login)], authController.login);
router.get('/register', [validator.fields(authRequestSchema.register)], authController.register);

router.get('/profile', baseMiddlewares, authController.profile);

module.exports = router;
