const mongoose = require('mongoose');
const Subsection = require('./Subsection');

const sectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    default: 'INTERIOR',
  },
  image: {
    type: String,
    required: false,
  },
});

sectionSchema.set('toObject', { virtuals: true });
sectionSchema.set('toJSON', { virtuals: true });

sectionSchema.virtual('subsections', {
  ref: Subsection,
  localField: '_id',
  foreignField: 'sectionId',
  justOne: false, // set true for one-to-one relationship
});

module.exports = mongoose.model('Section', sectionSchema, 'sections');
