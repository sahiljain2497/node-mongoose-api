const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: true,
  },
  argusUserId: {
    type: Number,
    required: true,
  },
  argusAccessToken: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', userSchema, 'users');
