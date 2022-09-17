const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  userId: {
    type: String,
    trim: true,
    required: true,
  },
  message: {
    type: String,
    trim: true,
    required: true
  },
  replies: [{
    type: String,
    required: true
  }],
  upvotes: [{
    type: String,
    required: true
  }],
  timestamp: {
    type: Number,
    required: true
  },
  isReply: {
    type: Boolean,
    required: true
  }
});

mongoose.model('Comment', CommentSchema);
