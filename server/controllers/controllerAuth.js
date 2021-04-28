const User = require('../models/user');
const cors = require('cors');

exports.CreateOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    { name, picture },
    { new: true }
  );

  if (user) {
    console.log('user UPD:', user);
    res.json(user);
  } else {
    const newUser = await newUser({
      email,
      name,
      picture,
    }).save();
    
    console.log('user CREATED:', newUser);
    return res.json(newUser);
  }
  
};
