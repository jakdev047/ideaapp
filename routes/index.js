  
const express = require('express');
const router = express.Router();

// home route
router.get('/',(req,res)=>{
  res.status(200).json({
    message: `Welcome My Idea Share App`
  });
});

// not found route
router.get('*',(req,res)=> {
  res.status(404).json({
    error: '404 Not Found'
  })
})

module.exports = router;