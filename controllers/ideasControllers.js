const mongoose = require('mongoose');
const Idea = require('../models/ideas');
const _ = require('lodash');
const {validationResult} = require('express-validator');

function generateIdeaDoc(id,title,description,status,allowComment,tags) {
  return {id,title,description,status,allowComment,tags}
}

// all idea
module.exports.getAllIdeaController = async(req,res,next) => {
  try {
    const ideas = await Idea.find();
    const contexts = {
      ideaDocuments: ideas.map(idea=>(generateIdeaDoc(idea._id,idea.title,idea.description,idea.status,idea.allowComment)))
    }
    res.render('ideas/index',{
      title: 'All Idea',
      path: '/ideas',
      ideas: contexts.ideaDocuments
    });
  } 
  catch (err) {
    next(err);
  }
}

// add idea form
module.exports.getNewIdeaForm = (req,res) => {
  res.render('ideas/new',{
    title: 'Add Idea',
    path: '/ideas/new'
  })
}

// add idea
module.exports.addIdeaController = async(req,res,next) => {
  try {
    const allowComment = req.body.allowComment ? true : false;
    req.body.tags = req.body.tags.split(',');
    const idea = new Idea({
      ...req.body,
      allowComment
    });
    await idea.save();
    // redirect
    res.redirect('/ideas');
  } 
  catch (err) {
    next(err);
  }
}

// edit idea form
module.exports.getEditIdeaForm = async(req,res,next) => {
  const id = req.params.id;
  try {
    const idea = await Idea.findById(id);
    const ideaDocument = generateIdeaDoc(idea._id,idea.title,idea.description,idea.status,idea.allowComment,idea.tags);
    if(idea) {
      res.render('ideas/edit',{
        title: ideaDocument.title,
        idea: ideaDocument
      })
    }
    else {
      res.status(404).render('notfound')
    }
  } 
  catch (err) {
    next(err);
  }
}

// edit idea
module.exports.updateIdeaController = async(req,res,next) => {
  const id = req.params.id;
  const allowComment = req.body.allowComment ? true : false;
  req.body.allowComment = allowComment;
  req.body.tags = req.body.tags.split(',');
  const pickedValue = _.pick(req.body,['title','description','allowComment','status','tags']);

  try {
    const idea = await Idea.findByIdAndUpdate(id,pickedValue);
    if(idea) {
      // redirect
      res.redirect(`/ideas/${id}`);
    }
    else {
      res.status(404).render('notfound');
    }
  } 
  catch (err) {
    next(err);
  }
}

// delete idea
module.exports.deleteIdeaController = async(req,res,next) => {
  const id = req.params.id;
  
  try {
    const idea = await Idea.findByIdAndDelete(id);
    if(idea) {
      // redirect
      res.redirect(`/ideas`);
    }
    else {
      res.status(404).render('error');
    }
  } 
  catch (err) {
    next(err);
  }
}

// single idea
module.exports.getSingleIdeaController = async(req,res,next) => {
  const id = req.params.id;
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.render('notfound',{
      title: '404 Error'
    });
  }
  try {
    const idea = await Idea.findById(id);
    if(idea) {
      const ideaDocument = generateIdeaDoc(idea._id,idea.title,idea.description);
      res.render('ideas/singleIdea',{
        title: ideaDocument.title,
        idea: ideaDocument
      });
    }
    else {
      res.status(404).render('notfound');
    }
  } 
  catch (err) {
    next(err);
  }
  
}