const {check} = require('express-validator');

const ideaValidator = () => {
  return [
    check('title').trim().notEmpty().withMessage('Title is required').isLength({min:5,max:50}).withMessage('Title is required & must be 5 to 50 character'),
    check('description').trim().notEmpty().withMessage('Description is required').isLength({min:10}).withMessage('Description is required & must be 10 character'),
    check('status').notEmpty().isIn(['public','private'])
  ]
}

module.exports = ideaValidator;