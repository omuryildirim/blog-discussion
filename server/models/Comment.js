const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  userid: {
    type: String,
    trim: true,
    required: true,
  },
  message: {
    type: String,
    trim: true,
    required: true
  },
  upvotes: [{
    type: String,
    required: true
  }],
  timestamp: {
    type: Number,
    required: true
  }
});

mongoose.model('Comment', CommentSchema);
