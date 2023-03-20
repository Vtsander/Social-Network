const mongoose = require('mongoose');
const reactionSchema = require('./reaction');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: [true, 'A thought is required'],
    minlength: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  username: {
    type: String,
    required: [true, 'A username is required'],
  },
  reactions: [reactionSchema],
}, {
  toJSON: {
    getters: true,
  },
  id: false,
});

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
