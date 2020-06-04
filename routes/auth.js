const express = require('express');
const router = express.Router();
const passport = require('passport');

const {registerValidator,loginValidator} = require('../validators/userValiator');
const {registerValidate,loginValidate} = require('../validators/userValidate');

const {getRegisterController,addRegisterController,getLoginController,postLoginController,getLogoutController} = require('../controllers/authController');

// get register form 
router.get('/register',getRegisterController);

// add register form 
router.post('/register',[registerValidator(),registerValidate],addRegisterController);

// get login form 
router.get('/login',getLoginController);

// post login form 
router.post(
  '/login',
  [loginValidator(),loginValidate],
  passport.authenticate('local',{failureRedirect:'/auth/login',failureFlash:true}),
  postLoginController
);

// get logout 
router.get('/logout',getLogoutController);

// get google route
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile','email'] }) 
);
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/login' }),
  (req, res, next) => {
    console.log(req.user);
    res.redirect('/ideas');
  }
);

module.exports = router;