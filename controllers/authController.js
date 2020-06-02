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