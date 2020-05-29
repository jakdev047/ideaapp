const mongoose = require('mongoose');

module.exports.connectDB = async() => {
  try {
    await mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds163014.mlab.com:63014/ideaapp`,{
      useNewUrlParser:true,
      useUnifiedTopology:true
    })

    console.log(`Database has running...`)
  }
  catch(err) {
    console.log(err);
  }
}