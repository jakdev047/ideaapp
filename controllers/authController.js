const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports.getRegisterController = (req,res,next) => {
  res.render('auth/register',{
    title: 'Register',
    path: '/auth/register'
  });
};

module.exports.addRegisterController = async(req,res,next) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.redirect('/ideas');
  } 
  catch (err) {
    next(err);
  }
};

module.exports.getLoginController = (req,res) => {
  res.render('auth/login',{
    title: 'Login',
    path: '/auth/login'
  });
};

module.exports.postLoginController = async(req,res,next) => {
  try {
    // check email
    const user = await User.findOne({email:req.body.email});
    // if email exis
    if(user) {
      // compare password
      const isMatch = await bcrypt.compare(req.body.password,user.password);
      if(isMatch) {
        // password match
        console.log('Login Success');
      }
      else {
        console.log('Invalid email or password');
      }
    }
    else {
      console.log('Invalid email or password');
    }
  } 
  catch (err) {
    next(err);
  }
};