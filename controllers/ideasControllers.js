const ideas = [
  {id:1,title: 'Idea One',description: 'This is idea one description',allowComment: true,status: 'public'},
  {id:2,title: 'Idea two',description: 'This is idea two description',allowComment: false,status: 'private'},
  {id:3,title: 'Idea three',description: 'This is idea three description',allowComment: true,status: 'public'},
  {id:4,title: 'Idea four',description: 'This is idea four description',allowComment: false,status: 'private'},
  {id:5,title: 'Idea five',description: 'This is idea five description',allowComment: true,status: 'public'}
]

module.exports.getAllIdeaController = (req,res) => {
  res.render('ideas/index',{
    title: 'All Idea',
    ideas
  })
}