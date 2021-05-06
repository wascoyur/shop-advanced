const mongoose = require('mongoose');

const categoryScema = new mongoose.Schema(
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
  },
  { timestamps: true },
);

module.exports = mongoose.model('Category', categoryScema);
