const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
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
    sold: { typr: Number, default: 0 },
    images: {
      type: Array,
    },
    shipping: {
      type: String,
      enum: ['Да', 'Нет'],
    },
    color: {
      type: String,
      enum: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
    },
    brand: {
      type: String,
      enum: ['Samsung', 'Lenovo', 'Asus', 'Apple', 'Microsoft'],
    },
    // raitings: [
    //   {
    //     star: Number,
    //     postedBy: { type: ObjectId, ref: 'User' },
    //   },
    // ],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Product', productSchema);
