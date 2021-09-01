const express = require('express');
const router = express.Router();

const { authCheck } = require('../middlewares/auth');
const { userCart, getUserCart } = require('../controllers/user');

// console.log('routes',authCheck);
router.post('/user/cart', authCheck, userCart);
router.get('/user/cart', authCheck, getUserCart);

// router.get("/user/cart", (req, res) => {
//   res.json({
//     data: "hey you hit user API endpoint",
//   });
// });

module.exports = router;
