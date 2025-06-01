const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const db = require('./db');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/', routes);
app.listen(3000, () => {
  console.log('Server started on port 3000');
});