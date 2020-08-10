/**
 * Database layer, fetches data from mongoose and handling connection to database
 */

const mongoose = require('mongoose');
const recordModel = require('./models/Record');

/**
 * @description Fetches data from database based on validated parameters passed
 * @param {Date} startDate
 * @param {Date} endDate
 * @param {number} minCount optional
 * @param {number} maxCount optional
 */
const fetchData = (startDate, endDate, minCount, maxCount) => {
  const aggregateRules = [];

  // mandatory date query
  aggregateRules.push({
    "$match": {
      "createdAt": {
        '$gte': startDate,
        '$lt': endDate
      }
    }
  }, {
    "$addFields": {
      "count": {
        "$reduce": {
          "input": "$counts",
          "initialValue": 0,
          "in": { "$add": ["$$value", "$$this"] }
        }
      }
    }
  });

  // optional count params
  if (minCount !== undefined && maxCount !== undefined) {
    aggregateRules.push({
      "$match": {
        "count": {
          '$gte': minCount,
          '$lt': maxCount
        }
      }
    });
  }

  return recordModel.aggregate(aggregateRules);
}

const connect = () => mongoose
  .connect(process.env.mongodb_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

module.exports = {
  connect,
  fetchData
};
