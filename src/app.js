// Import config from .env file
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const controller = require('./controller');

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Usually I would use a router layer, but since we only need one endpoint, we serve it right from controller
app.post('/', controller.fetchRecords);

app.get('/', (req, res) => res.send('Running...'));

// A standard error handler TODO
app.use(function handleErrors(err, req, res, next) {
  if (err instanceof Error) {
      return res.status(400).json({ error: err })
  }
  next(err)
})

module.exports = app;