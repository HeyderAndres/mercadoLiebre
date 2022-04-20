const express = require('express');
const user = require('../controllers/user.js');
const router = express.Router();

router.get('/login', user.login);

router.get('/register', user.register);


module.exports = router;