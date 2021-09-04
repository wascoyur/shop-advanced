"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCoupon = exports.removeCoupon = exports.getCoupon = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getCoupon = function getCoupon() {
  return regeneratorRuntime.async(function getCoupon$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(process.env.REACT_APP_API, "/coupons")));

        case 2:
          return _context.abrupt("return", _context.sent);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getCoupon = getCoupon;

var removeCoupon = function removeCoupon(couponId, authtoken) {
  return regeneratorRuntime.async(function removeCoupon$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_axios["default"]["delete"]("".concat(process.env.REACT_APP_API, "/coupon/").concat(couponId), {
            headers: {
              authtoken: authtoken
            }
          }));

        case 2:
          return _context2.abrupt("return", _context2.sent);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.removeCoupon = removeCoupon;

var createCoupon = function createCoupon(coupon, authtoken) {
  return regeneratorRuntime.async(function createCoupon$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(process.env.REACT_APP_API, "/coupon/"), coupon, {
            headers: {
              authtoken: authtoken
            }
          }));

        case 2:
          return _context3.abrupt("return", _context3.sent);

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.createCoupon = createCoupon;