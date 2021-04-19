const express = require('express');
const router = express.Router();
const { CreateOrUpdateUser } = require('../controllers/auth');
const { authCheck } = require('../middlewares/middlewareAuth');

// middleware
router.post('/createupdate', authCheck, CreateOrUpdateUser);

module.exports = router;
