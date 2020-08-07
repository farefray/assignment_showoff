// Import config from .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();


app.use(express.json());
app.get('/', res.send({
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