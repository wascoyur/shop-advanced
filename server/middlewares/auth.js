const admin = require('../firebase');

exports.authCheck = async (req, res, next) => {
  // console.log(req.headers); // token
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
  const { email } = req.data;
  const adminUser = await User.findOne({ email }).exec();
  if (adminUser !== 'admin') {
    res.status(403).json({ err: 'Ресурс администратора. Доступ запрещен.' });
  } else {
    next();
  }
};
