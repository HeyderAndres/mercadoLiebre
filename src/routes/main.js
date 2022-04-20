const express = require('express');
const main = require('../controllers/main');
const router = express.Router();

router.get('/', main.list);

module.exports = router;