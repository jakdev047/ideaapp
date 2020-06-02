const User = require('../models/user');

module.exports.getRegisterController = (req,res,next) => {
  try {
    res.render('auth/register',{
      title: 'Register',
      path: '/auth/register'
    })
  } 
  catch (err) {
    next(err);
  }
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
}