const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ideaSchema = new Schema(
  {
    title: {
      type: String,
      minlength:[5, 'title must be 5 characters long'],
      maxlength:[50, 'title less than 50 characters'],
      trim: true,
      required: [true,'title is required']
    },
    description: {
      type: String,
      minlength:[10, 'title must be 10 characters long'],
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
    },
    tags: [
      {
        type: String,
        trim: true,
        required: [true,'Idea must be on tags']
      }
    ]
  },
  {
    timestamps: true
  }
);

const Idea = mongoose.model('Idea',ideaSchema);
module.exports = Idea;