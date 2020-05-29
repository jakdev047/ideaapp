const Idea = require('../models/ideas');
const _ = require('lodash');

// let ideas = [
//   // {id:1,title: 'Idea One',description: 'This is idea one description',allowComment: true,status: 'public'}
// ]

function generateIdeaDoc(id,title,description) {
  return {id,title,description}
}

// all idea
module.exports.getAllIdeaController = async(req,res) => {
  try {
    const ideas = await Idea.find();
    const contexts = {
      ideaDocuments: ideas.map(idea=>(generateIdeaDoc(idea._id,idea.title,idea.description)))
    }
    res.render('ideas/index',{
      title: 'All Idea',
      path: '/ideas',
      ideas: contexts.ideaDocuments
    });
  } 
  catch (err) {
    console.log('err', err.message);
    res.status(500).render('error',{title: 'Error'});
  }
}

// add idea form
module.exports.getNewIdeaForm = (req,res) => {
  res.render('ideas/new',{
    title: 'Add Idea'
  })
}

// add idea
module.exports.addIdeaController = async(req,res) => {
  try {
    const allowComment = req.body.allowComment ? true : false;
    const idea = new Idea({
      ...req.body,
      allowComment
    });
    await idea.save();
    // redirect
    res.redirect('/ideas');
  } 
  catch (err) {
    console.log('err', err.message);
    res.status(500).render('error',{title: 'Error'});
  }
}

// edit idea form
module.exports.getEditIdeaForm = async(req,res) => {
  const id = req.params.id;
  try {
    const idea = await Idea.findById(id);
    const ideaDocument = generateIdeaDoc(idea._id,idea.title,idea.description);

    if(idea) {
      res.render('ideas/edit',{
        title: ideaDocument.title,
        idea: ideaDocument
      })
    }
    else {
      res.render('error')
    }
  } 
  catch (err) {
    console.log('err', err.message);
    res.status(500).render('error',{title: 'Error'});
  }
}

// edit idea
module.exports.updateIdeaController = (req,res) => {
  const id = parseInt(req.params.id);
  const pickedValue = _.pick(req.body,['title','description','allowComment','status']);
  const idea = ideas.find(idea=> idea.id === id);

  if(idea) {
    // update idea data
    const ideaToUpdate ={id,...pickedValue};
    // update idea add
    ideas = ideas.map(idea=> idea.id === id ? idea=ideaToUpdate : idea);
    // redirect
    res.redirect(`/ideas/${id}`);
  }
  else {
    res.render('error');
  }
}

// delete idea
module.exports.deleteIdeaController = (req,res) => {
  const id = parseInt(req.params.id);
  const idea = ideas.find(idea=> idea.id === id);

  if(idea) {
    // update idea add
    ideas = ideas.filter(idea=> idea.id !== id);
    // redirect
    res.redirect(`/ideas`);
  }
  else {
    res.render('error');
  }
}

// single idea
module.exports.getSingleIdeaController = async(req,res) => {
  const id = req.params.id;
  try {
    const idea = await Idea.findById(id);
    const ideaDocument = generateIdeaDoc(idea._id,idea.title,idea.description);

    if(idea) {
      res.render('ideas/singleIdea',{
        title: ideaDocument.title,
        idea: ideaDocument
      });
    }
    else {
      res.status(404).render('error');
    }
  } 
  catch (err) {
    console.log('err', err.message);
    res.status(500).render('error',{title: 'Error'});
  }
  
}