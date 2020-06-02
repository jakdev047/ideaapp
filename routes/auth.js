const express = require('express');
const router = express.Router();

const registerValidator = require('../validators/userValiator');
const registerValidate = require('../validators/userValidate');

const {getRegisterController,addRegisterController} = require('../controllers/authController');

// get register form 
router.get('/register',getRegisterController);

// add register form 
router.post('/register',[registerValidator(),registerValidate],addRegisterController);

module.exports = router;