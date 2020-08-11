/** Entry point file */
// Import config from .env file
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controller');
const { apiResponseMiddleware } = require('./middlewares/responseHandler');

const app = express();

// Configure bodyparser to handle post requests
app.use(bodyParser.json());

// Usually I would use a router layer, but since we only need one endpoint, we serve it right here
app.post('/', controller.fetchRecords);

app.get('/', (req, res) => res.status(200).send('OK'));

// Response handling. Should be the last middleware. Probably not the best solution and should be improved
app.use(apiResponseMiddleware);

module.exports = app;