const admin = require('../firebase/index');

exports.authCheck = async(req, res, next)=>{
    console.log(req.headers);
    // try {
    //   const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken);
    //   console.log('user autocheck', firebaseUser);
    //   req.user = firebaseUser
    //   next()
    // } catch (error) {
    //     res.status(401).json('неверный токен или истек')
    // }
    next();
}