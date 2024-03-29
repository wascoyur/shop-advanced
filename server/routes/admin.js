const express = require('express');
const router = express.Router();
const { adminCheck, authCheck } = require('../middlewares/auth');
const { orders, orderStatus } = require('../controllers/admin');

router.get('/admin/orders', authCheck, adminCheck, orders);
router.put('/admin/order-status', authCheck, adminCheck, orderStatus);

module.exports = router;
