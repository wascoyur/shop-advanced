const express = require('express');
const router = express.Router();

const { CreateOrUpdateUser } = require('../controllers/auth');
//middleware
const { authCheck } = require('../middlewares/middlewareAuth');

router.post('/crateupdate', authCheck, CreateOrUpdateUser);

module.exports = router;
