const {check} = require('express-validator');
const User = require('../models/user');

const registerValidator = () => {
  return [
    check('firstName').notEmpty().withMessage('firstName is required').isLength({max:15}).withMessage('firstName less than 15 characters').trim(),
    check('lastName').notEmpty().withMessage('lastName is required').isLength({max:15}).withMessage('lastName less than 15 characters').trim(),
    check('email').notEmpty().withMessage('email is required').isEmail().withMessage('email must be valid').trim().normalizeEmail(),
    check('email').custom(async email => {
      const user = await User.findOne({email});
      if(user) {
        throw new Error('Email Already Registered')
      }
      else {
        return true
      }
    }),
    check('password').notEmpty().withMessage('password is required').isLength({min:6}).withMessage('firstName less than 6 characters').not().isIn(['password','god123','password123','123456']).withMessage('password must not contain common password'),
    check('confirmPassword').notEmpty().withMessage('confirmPassword is required').custom((confirmPassword,{req}) => {
      if(confirmPassword === req.body.password) {
        return true
      }
      else {
        throw new Error('Confirm Password don\'t match')
      }
    })
  ];
};

module.exports = registerValidator;