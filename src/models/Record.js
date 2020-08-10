const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
  key: {
    type: String,
    required: true
  },
  counts: {
    type: [Number],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true
  }
});

module.exports = mongoose.model('Record', RecordSchema);