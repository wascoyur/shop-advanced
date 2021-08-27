const User = require('../models/user');
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.userCart = async (req, res) => {
  // console.log('req.body', req.body);
  const { cart } = req.body;
  let products = [];

  const user = await User.findOne({ email: req.user.email });

  let cartExistByThisUser = await Cart.findOne({ orderedBy: user._id }).exec();
  if (cartExistByThisUser) {
    cartExistByThisUser.remove()
    console.log('removed cart');
    
  }
  for (let i = 0; i < cart.length.length; i++) {
    let object = {};
    object.product = cart[i]._id
    object.count = cart[i].count
    object.color = cart[i].color
    let { price } = await Product.findById(cart[i]._id).select('price').exec()
    object.price = price
    product.push(object)
  }
  let cartTotal =
    for (let i = 0; i < product.length; i++) {
      cartTotal = cartTotal + products[i].price * products.[i].count
      
    }
  
  let newCart = await new Cart({
    products,
    cartTotal,
    orderBy:user._id

  }).save

  res.json(newCart);
};
