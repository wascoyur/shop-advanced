const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      text: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      maxlength: 32,
      required: true,
      trim: true,
    },
    category: {
      type: ObjectId,
      ref: 'Category',
    },
    subs: [
      {
        type: ObjectId,
        ref: 'Sub',
      },
    ],
    quantity: Number,
    sold: { type: Number, default: 0 },
    images: {
      type: Array,
    },
    shipping: {
      type: String,
    },
    color: {
      type: String,
    },
    brand: {
      type: String,
    },
    raitings: [
      {
        star: Number,
        postedBy: { type: ObjectId, ref: 'User' },
      },
    ],
    size: {
      country: {
        type: String,
        enum: ['eu', 'ru', 'us', 'cn'],
      },
      value: String,
    },
    adminproperties: {},
  },
  { timestamps: true },
);

module.exports = mongoose.model('Product', productSchema);
