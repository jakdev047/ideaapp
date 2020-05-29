const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ideaSchema = new Schema(
  {
    title: {
      type: String,
      minlength:[5, 'title must be 5 characters long'],
      maxlength:[30, 'title less than 30 characters'],
      trim: true,
      required: [true,'title is required'],
      set(v) {
        return v.toLowerCase();
      },
      get(v) {
        return v.toUpperCase();
      }
    },
    description: {
      type: String,
      minlength:[10, 'title must be 10 characters long'],
      trim: true,
      required: [true,'description is required']
    },
    allowComment: {
      type: Boolean
    },
    status: {
      type: String,
      enum: {
        values: ['public','private'],
        message: 'please provide public or private in status field'
      }
    }
  },
  {
    timestamps: true
  }
);

const Idea = mongoose.model('Idea',ideaSchema);
module.exports = Idea;