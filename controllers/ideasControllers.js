const _ = require('lodash');

let ideas = [
  {id:1,title: 'Idea One',description: 'This is idea one description',allowComment: true,status: 'public'},
  {id:2,title: 'Idea two',description: 'This is idea two description',allowComment: false,status: 'private'},
  {id:3,title: 'Idea three',description: 'This is idea three description',allowComment: true,status: 'public'},
  {id:4,title: 'Idea four',description: 'This is idea four description',allowComment: false,status: 'private'},
  {id:5,title: 'Idea five',description: 'This is idea five description',allowComment: true,status: 'public'}
]

// all idea
module.exports.getAllIdeaController = (req,res) => {
  res.render('ideas/index',{
    title: 'All Idea',
    ideas
  })
}

// add idea form
module.exports.getNewIdeaForm = (req,res) => {
  res.render('ideas/new',{
    title: 'Add Idea'
  })
}

// add idea
module.exports.addIdeaController = (req,res) => {
  const allowComment = req.body.allowComment ? true : false;
  const idea = {
    ...req.body,
    id: ideas.length + 1,
    allowComment
  }

  // add idea
  ideas.unshift(idea);

  // redirect
  res.redirect('/ideas');
}

// edit idea form
module.exports.getEditIdeaForm = (req,res) => {
  const id = parseInt(req.params.id);
  const idea = ideas.find(idea=> idea.id === id);

  if(idea) {
    res.render('ideas/edit',{
      title: 'Edit Idea',
      idea
    })
  }
  else {
    res.render('error')
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

// single idea
module.exports.getSingleIdeaController = (req,res) => {
  const id = parseInt(req.params.id);
  const idea = ideas.find(idea=> idea.id === id);

  if(idea) {
    res.render('ideas/singleIdea',{
      title: 'Single Idea',
      idea
    });
  }
  else {
    res.status(404).render('error');
  }
}