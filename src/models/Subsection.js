const mongoose = require('mongoose');

const subsectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  section: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Section' },
});

module.exports = mongoose.model('Subsection', subsectionSchema, 'subsections');
