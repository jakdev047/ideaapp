const LocalStrategy = require('passport-local');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const localstrategy = async(passport) => {
  passport.use(new LocalStrategy(
    {
      usernameField: 'email'
    },
    async(email,password,next) => {
      try {
        //check user by email
        const user = await User.findOne({email});
        if(!user) {
          return next(null,false,{message: 'Invalid Email or Password'});
        }

        // comapre password/check password
        const isMatch = await bcrypt.compare(password,user.password);
        if(isMatch) {
          return next(null,user,{message: 'Successfully Login'});
        }
        next(null,false,{message: 'Invalid Email or Password'});
      } 
      catch (err) {
        next(err);  
      }
    }
  ));
  passport.serializeUser((user,next)=>{
    next(null,user);
  });
  passport.deserializeUser(async(id,next)=>{
    try {
      const user = await User.findById(id);
      next(null,user)
    } 
    catch (err) {
      next(err);  
    }
  });
};

module.exports = {
  localstrategy
}