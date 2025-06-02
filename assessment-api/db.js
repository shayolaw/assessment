const mongoose = require('mongoose');
require('dotenv').config()
const uri = `${process.env.MONGO_URI}`;

mongoose.connect(uri, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected successfully');
});