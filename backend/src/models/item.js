const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  voteType: {
    type: String,
    enum: ['upvote', 'downvote'],
    required: true
  }
}, { _id: false });

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  upvotes: {
    type: Number,
    default: 0
  },
  downvotes: {
    type: Number,
    default: 0
  },
  categories: {
    type: [String], // Array of strings to store multiple categories
    required: true
  },
  emoji: {
    type: String, // Unicode or short code for an emoji
    default: ''
  },
  color: {
    type: String, // Hexadecimal color code
    default: '#FFFFFF'
  },
  votes: [voteSchema] // Array to track votes by users
});

module.exports = mongoose.model('Item', itemSchema);
