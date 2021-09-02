const express = require('express');
const router = express.Router();

const { authCheck } = require('../middlewares/auth');
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
} = require('../controllers/user');

// console.log('routes',authCheck);
router.post('/user/cart', authCheck, userCart);
router.get('/user/cart', authCheck, getUserCart);
router.delete('/user/cart', authCheck, emptyCart);
router.post('/user/address', authCheck, saveAddress);

// router.get("/user/cart", (req, res) => {
//   res.json({
//     data: "hey you hit user API endpoint",
//   });
// });

module.exports = router;
