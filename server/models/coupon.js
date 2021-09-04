const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      uppercase: true,
      required: 'Name is requared',
      minlength: [6, 'Too short'],
      maxlength: [13, 'Too long'],
    },
    expiry: { type: Date, required: true },
    discount: { type: Number, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Coupon', couponSchema);
