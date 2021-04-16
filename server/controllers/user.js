const mongoose = require();
const { ObjectId } = mongoose.Schema;

const userScema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      require: true,
      index: true,
    },
    role: {
      type: String,
      default: 'subscriber',
    },
    cart: {
      type: Array,
      default: [],
    },
    adddres: String,
    wishlist: [{ type: ObjectId, ref: 'Product' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User')
