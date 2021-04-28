const router = require('express').Router();
const auhtController = require('../controllers/auth.controller');
const appController = require('../controllers/app.controller');

router.get('/login', auhtController.login);
router.get('/register', auhtController.register);

router.get('/sections', appController.listSections);

module.exports = router;
