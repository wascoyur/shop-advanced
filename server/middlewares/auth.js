const admin = require('../firebase');
const User = require('../models/user');

exports.authCheck = async (req, res, next) => {
  // console.log('authCheck', req.headers); // token
  // return;
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    // console.log("FIREBASE USER IN AUTHCHECK", firebaseUser);
    req.user = firebaseUser;
    next();
  } catch (err) {
    res.status(401).json({
      err: 'Невалидный или истекший token',
    });
  }
};

exports.adminCheck = async (req, res, next) => {
  // console.log('request:', req.user);

  const { email } = req.user;
  const adminUser = await User.findOne({ email }).exec();
  if (adminUser.role !== 'admin') {
    res.status(403).json({ err: 'Ресурс администратора. Доступ запрещен.' });
  } else {
    next();
  }
};
