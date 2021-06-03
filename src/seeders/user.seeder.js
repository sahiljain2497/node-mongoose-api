/* eslint-disable no-plusplus */
/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
require('dotenv').config();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const UserModel = require('../models/User');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', () => {
  console.error.bind(console, 'connection error:');
});

db.once('open', async () => {
  console.log('connected to db');
  console.log('started seeding');
  const data = [{
    fullName: 'User',
    email: 'user@test.com',
    password: bcrypt.hashSync('root1234@', 10),
    role: 'USER',
  },
  ];
  for (let i = 0; i < data.length; i++) {
    const user = new UserModel(data[i]);
    await user.save();
  }
  console.log('seeder complete');
  mongoose.connection.close();
  process.exit(1);
});
