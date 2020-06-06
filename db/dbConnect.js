const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/ideas-app';

// const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds259089.mlab.com:59089/ideashareapp`;

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