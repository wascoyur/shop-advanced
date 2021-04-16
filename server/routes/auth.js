const express = require('express');
const router = express.Router()
const {CreateOrUpdateUser} = require('../controllers/auth')

router.get('/crateupdate', CreateOrUpdateUser);

module.exports = router;
 