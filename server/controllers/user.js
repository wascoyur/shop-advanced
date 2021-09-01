const User = require('../models/user');
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.userCart = async (req, res) => {
  const { cart } = req.body;
  let products = [];

  const user = await User.findOne({ email: req.user.email }).exec();
  let cartExistByThisUser = await Cart.findOne({ orderedBy: user._id }).exec();
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

  console.log('new cart saved', newCart);
  res.json({ ok: true });
};
