const mongoose = require('mongoose');

// mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds163014.mlab.com:63014/ideaapp

const url = 'mongodb://localhost:27017/ideas-app';

const connectDB = async function(){
  try {
    await mongoose.connect(url,{
      useNewUrlParser:true,
      useUnifiedTopology:true,
      useFindAndModify:false,
      useCreateIndex:true
    })

    console.log(`Database has running...`)
  }
  catch(err) {
    console.log(err);
  }
};

module.exports = {
  url,
  connectDB
}