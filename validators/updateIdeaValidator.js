const {validationResult} = require('express-validator');

const updateIdeaValidator = (req,res,next) => {
  const id = req.params.id;
  req.id = id;
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.render('ideas/edit',{
      title: 'Edit Idea',
      idea: {
        id,
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

module.exports = updateIdeaValidator;