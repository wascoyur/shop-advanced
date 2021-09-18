const express = require('express');
const router = express.Router();

const { authCheck } = require('../middlewares/auth');
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToUserCart,
  createOrder,
  orders,
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require('../controllers/user');

// console.log('routes',authCheck);
router.post('/user/cart', authCheck, userCart);
router.get('/user/cart', authCheck, getUserCart);
router.delete('/user/cart', authCheck, emptyCart);
router.post('/user/address', authCheck, saveAddress);
router.post('/user/cart/coupon', authCheck, applyCouponToUserCart);

router.post('/user/order', authCheck, createOrder);
router.get('/user/orders', authCheck, orders);

router.post('/user/addtowishlist', authCheck, addToWishlist);
router.get('/user/wishlist', authCheck, getWishlist);
router.delete('/user/wishlist/:productId', authCheck, removeFromWishlist);

module.exports = router;
