const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const subScema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: 'Имя обязательно',
      minlength: [3, 'Слишком короткое'],
      maxlength: [32, 'Слишком длинное'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    parent: {
      type: ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Sub', subScema);
