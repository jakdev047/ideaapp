const mongoose = require('mongoose');

// mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds163014.mlab.com:63014/ideaapp

module.exports.connectDB = async() => {
  try {
    await mongoose.connect('mongodb://localhost:27017/ideas-app',{
      useNewUrlParser:true,
      useUnifiedTopology:true,
      useFindAndModify:false
    })

    console.log(`Database has running...`)
  }
  catch(err) {
    console.log(err);
  }
}