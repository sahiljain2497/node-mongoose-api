const mongoose = require('mongoose');

const paintdataSchema = new mongoose.Schema({
  paintColor: {
    type: String,
    required: true,
  },
  paintMake: {
    type: String,
    required: false,
  },
  paintFinish: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  sectionId: { type: mongoose.Schema.Types.ObjectId, required: true },
  subsectionId: { type: mongoose.Schema.Types.ObjectId, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model('Paintdata', paintdataSchema, 'paintdata');
