const express = require('express');

const router = express.Router();
const { authcheck } = require('../middlewares/auth');
const { userCart } = require('../controllers/user');

router.post('/user/cart', authcheck, userCart);

// router.get('/user', (req, res) => {
//   res.json({
//     data: 'hey you hit user API endpoint',
//   });
// });

module.exports = router;
