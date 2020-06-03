const express = require('express');
const router = express.Router();

const registerValidator = require('../validators/userValiator');
const registerValidate = require('../validators/userValidate');

const {getRegisterController,addRegisterController,getLoginController} = require('../controllers/authController');

// get register form 
router.get('/register',getRegisterController);

// add register form 
router.post('/register',[registerValidator(),registerValidate],addRegisterController);

// get login form 
router.get('/login',getLoginController);

module.exports = router;