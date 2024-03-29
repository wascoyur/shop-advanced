const Coupon = require('../models/coupon');

exports.create = async (req, res) => {
  // console.log('create coupon:', req.body);

  try {
    const { name, expiry, discount } = req.body;
    res.json(await new Coupon({ name, expiry, discount }).save());
  } catch (error) {
    console.log('err:', error);
  }
};
exports.list = async (req, res) => {
  try {
    res.json(await Coupon.find({}).sort({ createdAt: -1 }).exec());
  } catch (error) {
    console.log('err:', error);
  }
};
exports.remove = async (req, res) => {
  try {
    res.json(await Coupon.findByIdAndDelete(req.params.couponId).exec());
  } catch (error) {
    console.log('err:', error);
  }
};
