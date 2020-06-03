const {validationResult} = require('express-validator');

const registerValidate = (req,res,next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.render('auth/register',{
      title: 'Register',
      path:'/auth/register',
      userInput: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
      },
      errMsg: errors.array()[0].msg
    });
  }
  else {
    next();
  }
};

const loginValidate = (req,res,next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.render('auth/login',{
      title: 'Login',
      path:'/auth/login',
      userInput: {
        email: req.body.email
      },
      errMsg: errors.array()[0].msg
    });
  }
  else {
    next();
  }
}

module.exports = {
  registerValidate,
  loginValidate
};