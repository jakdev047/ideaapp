const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const {clientID,clientSecret} = require('../db/key');

const localstrategy = passport => {
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

const googlestrategy = passport => {
  passport.use(new GoogleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL: '/auth/google/callback'
    },
    async(accessToken, refreshToken, profile, next) => {
      try {
        const profileToSave = {
          googleId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value
        };
        const user = await User.findOne({googleId:profile.id});
        if(user){
          next(null,user);
        }
        else {
          const userToSave = new User(profileToSave);
          await userToSave.save({validateBeforeSave:false});
          next(null,userToSave);
        }
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
  localstrategy,
  googlestrategy
}