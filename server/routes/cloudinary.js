const express = require('express');
const router = express.Router();

const { authCheck, adminCheck } = require('../middlewares/auth');

const { upload, remove } = require('../controllers/cloudinary');

router.post('/uploadimage', authCheck, adminCheck, upload);
router.post('/removeimage', authCheck, adminCheck, remove);

module.exports = router;
