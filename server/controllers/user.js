const User = require('../models/user');
const Product = require('../models/product');
const Cart = require('../models/cart');
const Coupon = require('../models/coupon');
const Order = require('../models/order');
const uniqid = require('uniqid');

exports.userCart = async (req, res) => {
  const { cart } = req.body;
  let products = [];

  const user = await User.findOne({ email: req.user.email }).exec();
  let cartExistByThisUser = await Cart.findOne({ orderdBy: user._id }).exec();
  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
    console.log('removed cart');
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};
    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;
    let { price } = await Product.findById(cart[i]._id).select('price').exec();
    object.price = price;
    products.push(object);
  }

  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
    // console.log('cartTotal', cartTotal);
  }
  // console.log('products,,', products, 'cartTotal', cartTotal);

  let newCart = await new Cart({
    products,
    cartTotal,
    orderdBy: user._id,
  }).save();

  // console.log('new cart saved', newCart);
  res.json({ ok: true });
};

exports.getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();
  let cart = await Cart.findOne({ orderdBy: user._id })
    .populate('products.product', '_id title price totalAfterDiscount')
    .exec();
  const { products, cartTotal, totalAfterDiscount } = cart;

  res.json({ products, cartTotal, totalAfterDiscount });
};

exports.emptyCart = async (req, res) => {
  // console.log('emptyCart');

  const user = await User.findOneAndUpdate({ email: req.user.email }).exec();
  const cart = await Cart.findOneAndRemove({ orderdBy: user._id }).exec();
  res.json(cart);
};

exports.saveAddress = async (req, res) => {
  // console.log('emptyCart');

  const userAddress = await User.findOneAndUpdate(
    { email: req.user.email },
    { address: req.body.address },
  ).exec();
  res.json({ ok: true });
};

exports.applyCouponToUserCart = async (req, res) => {
  const { coupon } = req.body;
  // console.log('coupon', coupon);

  const validCoupon = await Coupon.findOne({ name: coupon }).exec();

  if (validCoupon === null) {
    return res.json({ err: 'Неверный купон' });
  }
  const user = await User.findOne({ email: req.user.email }).exec();

  let { products, cartTotal } = await Cart.findOne({
    orderdBy: user._id,
  })
    .populate('product.product', '_id title price')
    .exec();
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);

  Cart.findOneAndUpdate(
    { orderdBy: user._id },
    { totalAfterDiscount },
    { new: true },
  ).exec();

  res.json(totalAfterDiscount);
};

exports.createOrder = async (req, res) => {
  const { paymentIntent } = req.body.stripeResponse;
  const user = await User.findOne({ email: req.user.email }).exec();
  let { products } = await Cart.findOne({ orderdBy: user._id }).exec();
  let newOrder = await new Order({
    products,
    paymentIntent,
    orderdBy: user._id,
  }).save();

  let bulkOption = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });
  let updated = await Product.bulkWrite(bulkOption, {});
  // console.log('--->QUATITY & SOLD:', updated);

  res.json({ ok: true });
};

exports.createOrderForCash = async (req, res) => {
  const { COD, couponApplied } = req.body;
  const user = await User.findOne({ email: req.user.email }).exec();
  let userCart = await Cart.findOne({ orderdBy: user._id })
    .populate('product', 'color')
    .exec();

  let finalAmount = 0;
  if (couponApplied && userCart.totalAfterDiscount) {
    finalAmount = (userCart.totalAfterDiscount * 100).toFixed(2);
  } else {
    finalAmount = (userCart.cartTotal * 100).toFixed(2);
  }

  let newOrder = await new Order({
    products: userCart.products,
    paymentIntent: {
      id: uniqid(),
      amount: finalAmount,
      currency: 'RUB',
      status: 'Ожидает оплаты',
      created: Math.floor(Date.now() / 1000),
      payment_method_types: ['Наличные'],
    },
    orderdBy: user._id,
    status: 'Cash On Delivery',
  }).save();

  // console.log('Cash oreder --->', newOrder);

  let bulkOption = userCart.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  let updated = await Product.bulkWrite(bulkOption, {});

  res.json({ ok: true });
};

exports.orders = async (req, res) => {
  let user = await User.findOne({ email: req.user.email }).exec();
  let userOrders = await Order.find({ orderdBy: user._id })
    .populate('products.product')
    .exec();
  // console.log('orders:', userOrders);
  res.json(userOrders);
};

exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;

  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $addToSet: { wishlist: productId } },
  ).exec();
  // console.log('addToWishlist-user', user);

  res.json({ added: true });
};
exports.getWishlist = async (req, res) => {
  const list = await User.findOne({ email: req.user.email })
    .select('wishlist')
    .populate('wishlist')
    .exec();

  res.json(list);
};
exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.params;
  // console.log('removeFromWishlist-productId', productId);

  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $pull: { wishlist: productId } },
  ).exec();
  res.json({ ok: true });
};
