const _ = require('lodash');

let ideas = [
  {id:1,title: 'Idea One',description: 'This is idea one description',allowComment: true,status: 'public'},
  {id:2,title: 'Idea two',description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',allowComment: false,status: 'private'},
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