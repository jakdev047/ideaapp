const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema(
  {
    googleID: {
      type: String
    },
    firstName: {
      type: String,
      trim: true,
      maxlength: [15,'firstName less than 15 characters'],
      required: [true,'firstName is required']
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: [15,'lastName less than 15 characters'],
      required: [true,'lastName is required']
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator(v) {
          return v.match(
            /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
          );
        }
      }
    },
    password: {
      type: String,
      trim: true,
      minlength: 6,
      maxlength: 50,
      maxlength: [50,'password less than 50 characters'],
      validate: {
        validator(v) {
          const passArray = ['password','god123','password123','123456'];
          const isMatch = passArray.some(pass=>v.includes(pass));
          if(isMatch) return false;
        }
      },
      required: [true,'password is required']
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre('save',async function(next){
  if(this.isModified('password')){
    const hashedPassword = await bcrypt.hash(this.password,12);
    this.password = hashedPassword;
    next();
  }
  else{
    next();
  }
});

const User = mongoose.model('User',userSchema);
module.exports = User;