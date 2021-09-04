"use strict";

var Coupon = require('../models/coupon');

exports.create = function _callee(req, res) {
  var _req$body, name, expiry, discount;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, name = _req$body.name, expiry = _req$body.expiry, discount = _req$body.discount;
          _context.t0 = res;
          _context.next = 5;
          return regeneratorRuntime.awrap(new Coupon({
            name: name,
            expiry: expiry,
            discount: discount
          }).save());

        case 5:
          _context.t1 = _context.sent;

          _context.t0.json.call(_context.t0, _context.t1);

          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t2 = _context["catch"](0);
          console.log('err:', _context.t2);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.list = function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.t0 = res;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Coupon.find({}).sort({
            createdAt: -1
          }).exec());

        case 4:
          _context2.t1 = _context2.sent;

          _context2.t0.json.call(_context2.t0, _context2.t1);

          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t2 = _context2["catch"](0);
          console.log('err:', _context2.t2);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.remove = function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.t0 = res;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Coupon.findByIdAndDelete(req.params.couponId).exec());

        case 4:
          _context3.t1 = _context3.sent;

          _context3.t0.json.call(_context3.t0, _context3.t1);

          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t2 = _context3["catch"](0);
          console.log('err:', _context3.t2);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
};