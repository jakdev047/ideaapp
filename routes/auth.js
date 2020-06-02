const express = require('express');
const router = express.Router();

const {getRegisterController} = require('../controllers/authController');

// get register form 
router.get('/register',getRegisterController);

module.exports = router;