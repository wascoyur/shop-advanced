"use strict";

var express = require('express');

var router = express.Router(); // middlewares

var _require = require('../middlewares/auth'),
    authCheck = _require.authCheck,
    adminCheck = _require.adminCheck; // controller


var _require2 = require('../controllers/auth'),
    createOrUpdateUser = _require2.createOrUpdateUser,
    currentUser = _require2.currentUser;

router.post('/create-or-update-user', authCheck, createOrUpdateUser);
router.post('/current-user', authCheck, currentUser);
router.post('/current-admin', authCheck, adminCheck, currentUser);
module.exports = router;