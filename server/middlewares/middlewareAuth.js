const admin = require('../middlewares/middlewareAuth.js');

exports.authCheck = (req, res, next)=>{
    console.log(req.headers);
    next();
}