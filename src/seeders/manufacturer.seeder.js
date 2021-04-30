/* eslint-disable no-plusplus */
/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
require('dotenv').config();
const mongoose = require('mongoose');
const ManufacturerModel = require('../models/Manufacturer');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', () => {
  console.error.bind(console, 'connection error:');
});

db.once('open', async () => {
  console.log('connected to db');
  console.log('started seeding');
  const data = [{
    name: 'ad 1',
    image: 'http://picsum.photos/400/180',
  }, {
    name: 'ad 2',
    image: 'http://picsum.photos/400/180',
  },
  {
    name: 'ad 3',
    image: 'http://picsum.photos/400/180',
  },
  ];
  for (let i = 0; i < data.length; i++) {
    const manufacturer = new ManufacturerModel(data[i]);
    await manufacturer.save();
  }
  console.log('seeder complete');
  mongoose.connection.close();
  process.exit(1);
});
