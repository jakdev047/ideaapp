const express = require('express');
const router = express.Router();

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
router.post('/login',[loginValidator(),loginValidate],postLoginController);

// get logout 
router.get('/logout',getLogoutController);

module.exports = router;