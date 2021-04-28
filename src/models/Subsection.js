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
  sectionId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model('Subsection', subsectionSchema, 'subsections');
