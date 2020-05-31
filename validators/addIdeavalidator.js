const {validationResult} = require('express-validator');

const addIdeavalidator = (req,res,next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.render('ideas/new',{
      title: 'Add Idea',
      idea: {
        title: req.body.title,
        description: req.body.description
      },
      errMsg: errors.array()[0].msg
    });
  }
  else {
    next();
  }
}

module.exports = addIdeavalidator;