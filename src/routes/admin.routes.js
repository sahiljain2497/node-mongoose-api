const router = require('express').Router();

const authController = require('../controllers/admin/auth.controller');
const userController = require('../controllers/admin/user.controller');
const sectionController = require('../controllers/admin/section.controller');
const subsectionController = require('../controllers/admin/subsection.controller');
const manufacturerController = require('../controllers/admin/manufacturer.controller');

router.get('/login', authController.loginPage);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.get('/users', userController.list);
router.get('/sections', sectionController.list);
router.post('/sections', sectionController.store);
router.put('/sections/:sectionId', sectionController.update);
router.delete('/sections/:sectionId', sectionController.delete);

router.get('/subsections', subsectionController.list);
router.post('/subsections', subsectionController.store);
router.put('/subsections/:subsectionId', subsectionController.update);
router.delete('/subsections/:subsectionId', subsectionController.delete);

router.get('/manufacturers', manufacturerController.list);
router.post('/manufacturers', manufacturerController.store);
router.put('/manufacturers/:manufacturerId', manufacturerController.update);
router.delete('/manufacturers/:manufacturerId', manufacturerController.delete);

module.exports = router;
