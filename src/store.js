const mongoose = require('mongoose');

const connect = () => {
  mongoose
    .connect(process.env.mongodb_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).catch((err) => {
      //todo
    })
}

module.exports = {
  connect
};
