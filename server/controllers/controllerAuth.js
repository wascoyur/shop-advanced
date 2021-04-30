// const User = require('../models/user');

exports.CreateOrUpdateUser = async (req, res) => {
  // const { name, picture, email } = req.user;

  // const user = await User.findOneAndUpdate(
  //   { email },
  //   { name, picture },
  //   { new: true }
  // );

  // if (user) {
  //   console.log('user UPD:', user);
  //   res.json(user);
  // } else {
  //   const newUser = await new User({
  //     email,
  //     name,
  //     picture,
  //   }).save();
    
  //   console.log('user CREATED:', newUser);
  //   return res.json(newUser);
  // }
  res.json('controllerAuth: CreateOrUpdateUser');
};
