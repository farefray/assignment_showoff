const mongoose = require('mongoose');

const connect = () => {
  mongoose
    .connect(process.env.mongodb_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
}

module.exports = {
  connect: connect
};
