"use strict";

var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.ObjectId;
var couponSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    uppercase: true,
    required: 'Name is requared',
    minlength: [6, 'Too short'],
    maxlength: [13, 'Too long']
  },
  expiry: {
    type: Date,
    required: true
  },
  discount: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('Coupon', couponSchema);