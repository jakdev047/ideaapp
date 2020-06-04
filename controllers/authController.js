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

module.exports.postLoginController = (req,res) => {
  res.redirect('/ideas');
};

module.exports.getLogoutController = (req,res,next) => {
  req.logout();
  res.redirect('/auth/login');
};