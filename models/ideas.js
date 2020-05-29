const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ideaSchema = new Schema(
  {
    title: {
      type: String,
      required: [true,'title is required']
    },
    description: {
      type: String,
      required: [true,'description is required']
    },
    allowComment: {
      type: Boolean
    },
    status: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Idea = mongoose.model('Idea',ideaSchema);
module.exports = Idea;