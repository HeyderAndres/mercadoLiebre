const express = require('express');
const multerUser = require('../middleware/multerUser');
const validation = require('../middleware/validation');
const userController = require('../controllers/user');
const router = express.Router();
const guestMiddleware = require('../middleware/guestMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/login',guestMiddleware, userController.login);
router.get('/register',guestMiddleware, userController.register);
router.get('/profile',authMiddleware, userController.profile);
router.get('/logout',authMiddleware, userController.logout);
router.get('/edit/:id',userController.edit);
router.get('/detail/:id',userController.detail);

router.post('/login', userController.loggued);

router.post('/register', multerUser.single('foto'),validation.user,userController.create);

router.put('/editUser/:id',multerUser.single('foto'),validation.user, userController.update);

router.delete('/delete/:id',userController.delete);


module.exports = router;