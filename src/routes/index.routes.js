const router = require('express').Router();
const jwtUtil = require('../utils/jwt');

const authController = require('../controllers/auth.controller');
const appController = require('../controllers/app.controller');

router.get('/ping', (req, res) => {
  res.send('pong');
});
router.get('/login', authController.login);
router.get('/register', authController.register);

router.get('/sections', appController.listSections);

router.post('/paintdata', [jwtUtil.verifyToken, jwtUtil.isLoggedIn], appController.savePaintData);

module.exports = router;
