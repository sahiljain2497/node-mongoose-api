/* eslint-disable no-plusplus */
/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
require('dotenv').config();
const mongoose = require('mongoose');
const SectionModel = require('../models/Section');
const SubsectionModel = require('../models/Subsection');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', () => {
  console.error.bind(console, 'connection error:');
});

db.once('open', async () => {
  console.log('connected to db');
  console.log('started seeding');
  const data = [{
    name: 'Ceiling',
    type: 'INTERIOR',
    image: 'https://picsum.photos/200/300',
    subsections: [{
      name: 'hello',
      image: 'https://picsum.photos/200/300',
    }],
  },
  {
    name: 'Wall',
    type: 'INTERIOR',
    image: 'https://picsum.photos/200/300',
    subsections: [
      {
        name: 'hello2',
        image: 'https://picsum.photos/200/300',
      },
      {
        name: 'hello3',
        image: 'https://picsum.photos/200/300',
      },
    ],
  },
  {
    name: 'Living Room',
    type: 'INTERIOR',
    image: 'https://picsum.photos/200/300',
    subsections: [
      {
        name: 'hello33',
        image: 'https://picsum.photos/200/300',
      },
      {
        name: 'hello233',
        image: 'https://picsum.photos/200/300',
      },
    ],
  },
  {
    name: 'Bedroom',
    type: 'INTERIOR',
    image: 'https://picsum.photos/200/300',
    subsections: [],
  },
  {
    name: 'Garage',
    type: 'EXTERIOR',
    image: 'https://picsum.photos/200/300',
    subsections: [],
  },
  {
    name: 'Wall',
    type: 'EXTERIOR',
    image: 'https://picsum.photos/200/300',
    subsections: [],
  }];
  for (let i = 0; i < data.length; i++) {
    const section = new SectionModel({ name: data[i].name, image: data[i].image, type: data[i].type });
    await section.save();
    const { subsections } = data[i];
    for (let j = 0; j < subsections.length; j++) {
      const subsection = new SubsectionModel({ name: subsections[j].name, image: subsections[j].image, sectionId: section._id });
      await subsection.save();
    }
  }
  console.log('seeder complete');
  mongoose.connection.close();
  process.exit(1);
});
