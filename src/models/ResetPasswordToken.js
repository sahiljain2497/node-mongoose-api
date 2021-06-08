const mongoose = require('mongoose');

const resetPasswordTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: false,
  },
  used: {
    type: Boolean,
    required: true,
    default: false,
  },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
}, {
  timestamps: true,
});

module.exports = mongoose.model('ResetPasswordToken', resetPasswordTokenSchema, 'resetpasswordtokens');
