const express = require('express');
const router = express.Router();

const { CreateOrUpdateUser } = require('../controllers/controllerAuth');

//middleware
const { authCheck } = require('../middlewares/middlewareAuth');

router.post('/crateupdate', authCheck, CreateOrUpdateUser);

// router.get('/crateupdate', (res, req) => {
//     res.json('router.get');
// });

module.exports = router;
