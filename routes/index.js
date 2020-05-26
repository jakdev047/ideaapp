  
const express = require('express');
const router = express.Router();

// home route
router.get('/',(req,res)=>{
  res.render('index',{
    title: 'Home',
    para: 'This is Idea Share App build by node.js'
  })
});

// about route
router.get('/about',(req,res)=>{
  res.render('about',{
    title: 'About',
    para: 'This is Idea Share App build by node.js'
  })
});

// not found route
router.get('*',(req,res)=> {
  res.render('error',{
    title: '404 !!!',
    para: 'Page has not found'
  })
})

module.exports = router;