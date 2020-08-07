// Import config from .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const controller = require('./controller');

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.post('/', controller.fetchRecords);

app.get('/', (req, res) => res.send({
  code: 0
}));

mongoose
  .connect(process.env.mongodb_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(3000, console.log('Server started at porst 3000'));
  })
  .catch(err => console.log(err));