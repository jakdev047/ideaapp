const User = require('../models/user');

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
    req.flash('success_msg','Registration Successfully');
    res.redirect('/auth/login');
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
  req.flash('success_msg','Login Successfully');
  res.redirect('/ideas');
};

module.exports.getLogoutController = (req,res,next) => {
  req.logout();
  req.flash('success_msg','Logout Successfully');
  res.redirect('/auth/login');
};